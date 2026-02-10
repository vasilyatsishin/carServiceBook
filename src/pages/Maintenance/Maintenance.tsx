import type React from "react";
import styles from "./Maintenance.module.css";
import NextMaintenance from "../../components/Maintenance/NextMaintenance/NextMaintenance";
import { useMaintenance } from "./useMaintenance";
import PerformedMaintenance from "../../components/Maintenance/PerformedMaintenance/PerformedMaintenance";
import CarInfo from "../../components/Maintenance/CarInfo/CarInfo";

const Maintenance: React.FC = () => {
  const { state } = useMaintenance();

  if (state.isLoading) {
    return <div>Завантаження...</div>;
  }

  return (
    <>
      <div className={styles.mainWrapper}>
        <div className={styles.wrapperForMaintenanceBlocks}>
          <CarInfo
            carName={state.carObject.name}
            handleOdometerChange={() => {
              console.log(1);
            }}
            odometer={state.carObject.odometer}
          />
          <div className={styles.paddingWrapper}>
            <div className={styles.horizontalWrapper}>
              <PerformedMaintenance
                maintenanceList={state.maintenanceList}
                performedMaintenances={state.performedMaintenances}
              />
              {!state.performedMaintenances.length && (
                <div className={styles.emptyContainer}>
                  <h1 className={styles.emptyText}>
                    Додайте запис про перший тех.огляд
                  </h1>
                </div>
              )}
            </div>
            <div className={styles.horizontalWrapper}>
              <NextMaintenance
                nextMaintenances={state.maintenanceList.filter(
                  (job) => job.isRegular
                )}
              />
              {!state.maintenanceList.length && (
                <div className={styles.emptyContainer}>
                  <h1 className={styles.emptyText}>
                    Додайте майбутні регламентні роботи
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Maintenance;
