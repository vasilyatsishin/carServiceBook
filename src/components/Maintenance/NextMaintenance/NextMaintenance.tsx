import type React from "react";
import styles from "./NextMaintenance.module.css";
import AddIcon from "@mui/icons-material/Add";
import AddMaintenancePointModal from "../AddMaintenancePointModal/AddMaintenancePointModal";
import { useNextMaintenance } from "./useNextMaintenance";
import MaintenancePoint from "../MainteancePoint/MaintenancePoint";

const NextMaintenance: React.FC = () => {
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
        {state.existMaintenanceTypeJobs.map((e) => (
          <>
            <MaintenancePoint
              interval={e.frequency}
              maintenanceName={e.name}
              nextMaintenance={e.frequency - 1555}
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
