import type React from "react";
import styles from "./NextMaintenance.module.css";
import AddIcon from "@mui/icons-material/Add";
import AddMaintenancePointModal from "../AddMaintenancePointModal/AddMaintenancePointModal";
import { useNextMaintenance } from "./useNextMaintenance";
import MaintenancePoint from "../MainteancePoint/MaintenancePoint";
import type { NextMaintenanceObject } from "../../../interfaces/Maintenance/MaintenanceJobInterface";
import { getUserRole } from "../../../shared/helpers/jwtDecoder";
import { ROLES } from "../../../constants/roles";

interface NextMaintenanceProps {
  nextMaintenances: NextMaintenanceObject[];
  allScheduledJobNames: string[];
}

const NextMaintenance: React.FC<NextMaintenanceProps> = ({
  nextMaintenances,
  allScheduledJobNames,
}) => {
  const { setters, state } = useNextMaintenance();
  const isService = getUserRole() === ROLES.SERVICE;

  return (
    <>
      <div className={styles.mainWrapper}>
        <div className={styles.headerWrapper}>
          <h1 className={styles.header}>Наступна заміна деталей</h1>
          {isService && (
            <button
              className={styles.addButton}
              onClick={() => setters.setIsModalShown((prev) => !prev)}
            >
              <AddIcon sx={{ fontSize: 25 }} />
            </button>
          )}
        </div>
        <div className={styles.scrollContainer}>
          {nextMaintenances.map((e) => (
            <MaintenancePoint
              key={e.jobId + e.jobName}
              interval={e.frequency}
              maintenanceName={e.jobName}
              nextMaintenance={e.kmRemaining}
            />
          ))}
        </div>
      </div>
      {isService && (
        <AddMaintenancePointModal
          visible={state.isModalShown}
          setIsVisible={setters.setIsModalShown}
          scheduledJobNames={allScheduledJobNames}
        />
      )}
    </>
  );
};

export default NextMaintenance;
