export const useMaintenancePoint = () => {
  const lastChangeRangeToPercents = (range: number, interval: number) => {
    const progressPercents = (range / interval) * 100;
    const stoppedProgress = Math.min(100, Math.max(0, progressPercents));
    return stoppedProgress;
  };
  return { lastChangeRangeToPercents };
};
