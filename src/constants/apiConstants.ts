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
    GET_ALL_CARS: "/cars/all-cars",
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
    DETAILS: (id: number) => `/performed-maintenance/${id}/details`,
    PAY: (id: number) => `/performed-maintenance/${id}/pay`,
  },
  SERVICES_CATALOG: {
    GET: "/services-catalog",
    CREATE: "/services-catalog",
    UPDATE: (id: number) => `/services-catalog/${id}`,
    DELETE: (id: number) => `/services-catalog/${id}`,
  },
};
