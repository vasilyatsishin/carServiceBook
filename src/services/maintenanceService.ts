import api from "../api/apiConfig";
import { API_CONSTANTS } from "../constants/apiConstants";
import type {
  MaintenanceJobSendObject,
  NextMaintenanceObject,
} from "../interfaces/Maintenance/MaintenanceJobInterface";
import type {
  MaintenanceHistoryReceivingObject,
  MaintenanceHistorySendObject,
} from "../interfaces/Maintenance/PerformedMaintenanceInterface";

// GET
export const getNextMaintenanceJobs = async (
  carId: string
): Promise<NextMaintenanceObject[]> => {
  const res = await api.get<NextMaintenanceObject[]>(
    `${API_CONSTANTS.MAINTENANCE_JOBS.NEXT_MAINTENANCE_LIST}?carId=${carId}`
  );
  console.log(res);

  return res.data;
};

// GET
export const getPerformedMaintenances = async (
  carId: string
): Promise<MaintenanceHistoryReceivingObject[]> => {
  const res = await api.get<MaintenanceHistoryReceivingObject[]>(
    `${API_CONSTANTS.PERFORMED_MAINTENANCE.GET}?carId=${carId}`
  );

  return res.data;
};

// POST
export const addMaintenanceHistory = async (
  maintenance: MaintenanceHistorySendObject
): Promise<string> => {
  const res = await api.post<string>(
    API_CONSTANTS.PERFORMED_MAINTENANCE.CREATE,
    maintenance
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
