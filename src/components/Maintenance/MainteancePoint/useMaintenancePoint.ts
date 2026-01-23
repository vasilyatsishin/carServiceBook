export const useMaintenancePoint = () => {
  const lastChangeRangeToPercents = (range: number, interval: number) => {
    const traveledSinceLastService = interval - range;
    const progressPercents = (traveledSinceLastService / interval) * 100;
    return Math.min(100, Math.max(0, progressPercents));
  };
  return { lastChangeRangeToPercents };
};
