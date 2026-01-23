import type React from "react";
import styles from "./MaintenancePoint.module.css";
import { formatOdometer } from "../../../shared/helpers/formatters/carFormatter";
import { useMaintenancePoint } from "./useMaintenancePoint";

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
  const { lastChangeRangeToPercents } = useMaintenancePoint();

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.generalInfo}>
        <h2 className={styles.name}>{maintenanceName}</h2>
        <h4 className={styles.interval}>
          Кожні {formatOdometer(interval.toString())} км.
        </h4>
      </div>
      <div className={styles.progressBarWrapper}>
        <div
          className={styles.progressBar}
          style={{
            ["--target-width" as any]: `${lastChangeRangeToPercents(
              nextMaintenance,
              interval
            )}%`,
          }}
        ></div>
      </div>
      <div className={styles.description}>
        <h5 className={styles.nextMaintenance}>
          {nextMaintenance >= 0
            ? `Заміна через ${formatOdometer(String(nextMaintenance))} км.`
            : `Заміна ${formatOdometer(String(nextMaintenance * -1))} км тому`}
        </h5>
      </div>
    </div>
  );
};

export default MaintenancePoint;
