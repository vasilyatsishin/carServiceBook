import type React from "react";
import styles from "./PerformedMaintenance.module.css";
import AddIcon from "@mui/icons-material/Add";
import { usePerformedMaintenance } from "./usePerformedMaintenance";
import AddMaintenanceHistoryModal from "../AddMaintenanceHistoryModal/AddMaintenanceHistoryModal";
import type { NextMaintenanceObject } from "../../../interfaces/Maintenance/MaintenanceJobInterface";
import type { MaintenanceHistoryReceivingObject } from "../../../interfaces/Maintenance/PerformedMaintenanceInterface";
import { formatOdometer } from "../../../shared/helpers/formatters/carFormatter";

interface PerformedMaintenanceProps {
  maintenanceList: NextMaintenanceObject[];
  performedMaintenances: MaintenanceHistoryReceivingObject[];
}

const PerformedMaintenance: React.FC<PerformedMaintenanceProps> = ({
  maintenanceList,
  performedMaintenances,
}) => {
  const { setters, state } = usePerformedMaintenance();
  return (
    <>
      <div className={styles.mainWrapper}>
        <div className={styles.headerWrapper}>
          <h1 className={styles.header}>Історія обслуговування</h1>
          <button
            className={styles.addButton}
            onClick={() => setters.setIsModalShown((prev) => !prev)}
          >
            <AddIcon sx={{ fontSize: 25 }} />
          </button>
        </div>
        {performedMaintenances
          .slice()
          .sort((a, b) => b.odometer - a.odometer)
          .map((e) => (
            <>
              <div className={styles.rowWrapper}>
                <h2>{e.place}</h2>
                <h3>{e.date}</h3>
              </div>
              <div className={styles.rowWrapper}>
                <p>Пробіг: {formatOdometer(e.odometer.toString())} км.</p>
                <p>Ціна: {e.price} грн.</p>
              </div>
              <hr />
            </>
          ))}
      </div>
      <AddMaintenanceHistoryModal
        maintenanceList={maintenanceList}
        visible={state.isModalShown}
        setIsVisible={setters.setIsModalShown}
      />
    </>
  );
};

export default PerformedMaintenance;
