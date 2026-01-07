import type React from "react";
import styles from "./Maintenance.module.css";
import NextMaintenance from "../../components/Maintenance/NextMaintenance/NextMaintenance";
import { useParams } from "react-router";

const Maintenance: React.FC = () => {
  const { carId } = useParams();
  return (
    <>
      <div className={styles.mainWrapper}>
        <div className={styles.paddingWrapper}>
          <div className={styles.horizontalWrapper}></div>
          <div className={styles.horizontalWrapper}>
            <NextMaintenance />
          </div>
        </div>
      </div>
    </>
  );
};

export default Maintenance;
