export interface MaintenanceJobSendObject {
  carId: number;
  applyToAllCars: boolean;
  interval: number;
  name: string;
  regular: boolean;
}

export interface MaintenanceJobEntity {
  id: number;
  frequency: number;
  name: string;
  car: number;
  isRegular: boolean;
}

export interface NextMaintenanceObject {
  currentCarOdometer: number;
  frequency: number;
  jobId: number;
  jobName: string;
  kmRemaining: number;
  isRegular: boolean;
  lastPerformedOdometer: number;
}
