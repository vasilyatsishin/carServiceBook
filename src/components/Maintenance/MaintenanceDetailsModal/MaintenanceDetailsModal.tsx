import type React from "react";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./MaintenanceDetailsModal.module.css";
import { getMaintenanceDetails } from "../../../services/maintenanceService";
import type { MaintenanceDetailsResponse } from "../../../interfaces/Maintenance/PerformedMaintenanceInterface";

interface MaintenanceDetailsModalProps {
  maintenanceId: number;
  place: string;
  date: string;
  onClose: () => void;
}

const MaintenanceDetailsModal: React.FC<MaintenanceDetailsModalProps> = ({
  maintenanceId,
  place,
  date,
  onClose,
}) => {
  const [details, setDetails] = useState<MaintenanceDetailsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMaintenanceDetails(maintenanceId)
      .then(setDetails)
      .finally(() => setLoading(false));
  }, [maintenanceId]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{place}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <CloseIcon sx={{ fontSize: 22 }} />
          </button>
        </div>
        <p className={styles.meta}>{date}</p>

        {loading ? (
          <p className={styles.spinner}>Завантаження...</p>
        ) : (
          <>
            <div className={styles.worksList}>
              {details && details.works.length > 0 ? (
                details.works.map((work, i) => (
                  <div key={i} className={styles.workRow}>
                    <span className={styles.workName}>{work.name}</span>
                    <span className={styles.workPrice}>{work.price.toFixed(2)} грн.</span>
                  </div>
                ))
              ) : (
                <p className={styles.empty}>Перелік робіт не вказано</p>
              )}
            </div>
            {details && details.works.length > 0 && (
              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Разом</span>
                <span className={styles.totalPrice}>{details.totalPrice.toFixed(2)} грн.</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MaintenanceDetailsModal;
