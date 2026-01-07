export interface MaintenanceJobSendObject {
  carId: number;
  applyToAllCars: boolean;
  interval: number;
  name: string;
}

export interface MaintenanceJobEntity {
  id: number;
  frequency: number;
  name: string;
  car: number;
}
