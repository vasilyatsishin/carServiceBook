import { useParams } from "react-router";
import {
  getNextMaintenanceJobs,
  getPerformedMaintenances,
} from "../../services/maintenanceService";
import { useApiQuery } from "../../shared/hooks/useApiQuery";
import { getCarById } from "../../services/carService";

export const useMaintenance = () => {
  const { carId } = useParams();

  const {
    data: carObject,
    isLoading: isCarLoading,
    isError: isCarError,
  } = useApiQuery(["car", carId], () => getCarById(Number(carId)), {
    enabled: !!carId,
  });

  const {
    data: performedMaintenances = [],
    isLoading: isPerformedMaintenancesLoading,
    isError: isPerformedMaintenancesError,
  } = useApiQuery(
    ["performedMaintenances", carId],
    () => getPerformedMaintenances(carId!),
    {
      enabled: !!carId,
    }
  );

  const {
    data: maintenanceList = [],
    isLoading: isMaintLoading,
    isError: isMaintError,
    refetch,
  } = useApiQuery(
    ["maintenanceList", carId],
    () => getNextMaintenanceJobs(carId!),
    {
      enabled: !!carId,
    }
  );

  return {
    state: {
      carObject,
      maintenanceList,
      performedMaintenances,
      isLoading:
        isCarLoading || isMaintLoading || isPerformedMaintenancesLoading,
      isError: isCarError || isMaintError || isPerformedMaintenancesError,
    },
    functions: {
      refetch,
    },
  };
};
