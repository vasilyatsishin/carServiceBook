import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getMaintenanceTypeJobs } from "../../../services/maintenanceService";
import type { MaintenanceJobEntity } from "../../../interfaces/Maintenance/MaintenanceJobInterface";

export const useNextMaintenance = () => {
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const [existMaintenanceTypeJobs, setExistMaintenanceTypeJobs] = useState<
    MaintenanceJobEntity[]
  >([]);

  const { carId } = useParams<{ carId: string }>();

  const getMaintenanceJobs = async () => {
    try {
      const res = await getMaintenanceTypeJobs(carId || "");
      setExistMaintenanceTypeJobs(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMaintenanceJobs();
  }, []);

  return {
    state: {
      isModalShown,
      existMaintenanceTypeJobs,
    },
    setters: {
      setIsModalShown,
    },
  };
};
