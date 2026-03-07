export const API_CONSTANTS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOG_OUT: "/auth/logout",
    LOG_IN: "/auth/login",
  },
  CARS: {
    CARS: "/cars/",
    CAR_CREATE: "/cars/create",
    GET_EXIST_CARS: "/cars/exist-cars",
    UPDATE_ODOMETER: "/cars/update/odometer",
    DELETE_CAR: "/cars/delete",
    UPDATE_CAR: "/cars/update",
  },
  MAINTENANCE_JOBS: {
    MAINTENANCE_CREATE: "/maintenance-jobs/create",
    NEXT_MAINTENANCE_LIST: "/maintenance-jobs/next-maintenance",
  },
  PERFORMED_MAINTENANCE: {
    CREATE: "/performed-maintenance/create",
    GET: "/performed-maintenance",
  },
};
