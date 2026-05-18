import type React from "react";
import { useState } from "react";
import styles from "./PerformedMaintenance.module.css";
import AddIcon from "@mui/icons-material/Add";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { usePerformedMaintenance } from "./usePerformedMaintenance";
import AddMaintenanceHistoryModal from "../AddMaintenanceHistoryModal/AddMaintenanceHistoryModal";
import PaymentModal from "../../PaymentModal/PaymentModal";
import MaintenanceDetailsModal from "../MaintenanceDetailsModal/MaintenanceDetailsModal";
import type { MaintenanceHistoryReceivingObject } from "../../../interfaces/Maintenance/PerformedMaintenanceInterface";
import { formatOdometer } from "../../../shared/helpers/formatters/carFormatter";
import { getUserRole } from "../../../shared/helpers/jwtDecoder";
import { ROLES } from "../../../constants/roles";
import { useQueryClient } from "@tanstack/react-query";

interface PerformedMaintenanceProps {
  carId: number;
  performedMaintenances: MaintenanceHistoryReceivingObject[];
}

const PerformedMaintenance: React.FC<PerformedMaintenanceProps> = ({
  carId,
  performedMaintenances,
}) => {
  const { setters, state } = usePerformedMaintenance();
  const [payTarget, setPayTarget] = useState<MaintenanceHistoryReceivingObject | null>(null);
  const [detailsTarget, setDetailsTarget] = useState<MaintenanceHistoryReceivingObject | null>(null);
  const queryClient = useQueryClient();
  const role = getUserRole();
  const isOwner = role === ROLES.OWNER;
  const isService = role === ROLES.SERVICE;

  const showAddButton = isService;

  return (
    <>
      <div className={styles.mainWrapper}>
        <div className={styles.headerWrapper}>
          <h1 className={styles.header}>Історія обслуговування</h1>
          {showAddButton && (
            <button
              className={styles.addButton}
              onClick={() => setters.setIsModalShown((prev) => !prev)}
            >
              <AddIcon sx={{ fontSize: 25 }} />
            </button>
          )}
        </div>
        <div className={styles.scrollContainer}>
          {performedMaintenances
            .slice()
            .sort((a, b) => b.odometer - a.odometer)
            .map((e) => (
              <div
                key={e.id}
                className={styles.historyItem}
                onClick={() => setDetailsTarget(e)}
              >
                <div className={styles.rowWrapper}>
                  <h2 className={styles.performingPlace}>{e.place}</h2>
                  <h3 className={styles.datePerformed}>{e.date}</h3>
                </div>
                <div className={styles.rowWrapper}>
                  <p>Пробіг: {formatOdometer(e.odometer.toString())} км.</p>
                  <p>Ціна: {e.price} грн.</p>
                </div>
                <div className={styles.rowWrapper}>
                  {e.isPaid ? (
                    <span className={styles.paidBadge}>
                      <CheckCircleIcon sx={{ fontSize: 16 }} />
                      Оплачено
                    </span>
                  ) : (
                    <span className={styles.unpaidBadge}>Не оплачено</span>
                  )}
                  {isOwner && !e.isPaid && (
                    <button
                      className={styles.payButton}
                      onClick={(ev) => { ev.stopPropagation(); setPayTarget(e); }}
                    >
                      <PaymentIcon sx={{ fontSize: 16 }} />
                      Оплатити
                    </button>
                  )}
                </div>
                <hr />
              </div>
            ))}
        </div>
      </div>

      {showAddButton && (
        <AddMaintenanceHistoryModal
          visible={state.isModalShown}
          setIsVisible={setters.setIsModalShown}
        />
      )}

      {payTarget && (
        <PaymentModal
          maintenanceId={payTarget.id}
          carId={carId}
          price={payTarget.price}
          onClose={() => setPayTarget(null)}
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ["performedMaintenances", String(carId)] });
          }}
        />
      )}

      {detailsTarget && (
        <MaintenanceDetailsModal
          maintenanceId={detailsTarget.id}
          place={detailsTarget.place}
          date={detailsTarget.date}
          onClose={() => setDetailsTarget(null)}
        />
      )}
    </>
  );
};

export default PerformedMaintenance;
