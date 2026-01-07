import type React from "react";
import styles from "./MaintenancePoint.module.css";

interface MaintenancePointProps {
  maintenanceName: string;
  nextMaintenance: number;
  interval: number;
}

const MaintenancePoint: React.FC<MaintenancePointProps> = ({
  nextMaintenance,
  maintenanceName,
  interval,
}) => {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.generalInfo}>
        {nextMaintenance}
        {maintenanceName}
      </div>
      <div className={styles.progressBar}>{interval}</div>
    </div>
  );
};

export default MaintenancePoint;
