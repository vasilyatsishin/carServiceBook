import api from "../api/apiConfig";
import { API_CONSTANTS } from "../constants/apiConstants";
import type {
  MaintenanceJobEntity,
  MaintenanceJobSendObject,
} from "../interfaces/Maintenance/MaintenanceJobInterface";

// GET
export const getMaintenanceTypeJobs = async (
  carId: string
): Promise<MaintenanceJobEntity[]> => {
  const res = await api.get<MaintenanceJobEntity[]>(
    `${API_CONSTANTS.MAINTENANCE_JOBS.GET_MAINTENANCE_JOBS}?carId=${carId}`
  );
  return res.data;
};

// POST
export const addMaintenanceTypeJob = async (
  job: MaintenanceJobSendObject
): Promise<string> => {
  const res = await api.post<string>(
    API_CONSTANTS.MAINTENANCE_JOBS.MAINTENANCE_CREATE,
    job
  );
  return res.data;
};
