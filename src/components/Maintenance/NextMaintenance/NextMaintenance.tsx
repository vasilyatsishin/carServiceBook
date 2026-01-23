import type React from "react";
import styles from "./NextMaintenance.module.css";
import AddIcon from "@mui/icons-material/Add";
import AddMaintenancePointModal from "../AddMaintenancePointModal/AddMaintenancePointModal";
import { useNextMaintenance } from "./useNextMaintenance";
import MaintenancePoint from "../MainteancePoint/MaintenancePoint";
import type { NextMaintenanceObject } from "../../../interfaces/Maintenance/MaintenanceJobInterface";

interface NextMaintenanceProps {
  nextMaintenances: NextMaintenanceObject[];
}

const NextMaintenance: React.FC<NextMaintenanceProps> = ({
  nextMaintenances,
}) => {
  const { setters, state } = useNextMaintenance();
  return (
    <>
      <div className={styles.mainWrapper}>
        <div className={styles.headerWrapper}>
          <h1 className={styles.header}>Наступна заміна деталей</h1>
          <button
            className={styles.addButton}
            onClick={() => setters.setIsModalShown((prev) => !prev)}
          >
            <AddIcon sx={{ fontSize: 25 }} />
          </button>
        </div>
        {nextMaintenances.map((e) => (
          <>
            <MaintenancePoint
              key={e.jobId + e.jobName}
              interval={e.frequency}
              maintenanceName={e.jobName}
              nextMaintenance={e.kmRemaining}
            />
          </>
        ))}
      </div>
      <AddMaintenancePointModal
        visible={state.isModalShown}
        setIsVisible={setters.setIsModalShown}
      />
    </>
  );
};

export default NextMaintenance;
