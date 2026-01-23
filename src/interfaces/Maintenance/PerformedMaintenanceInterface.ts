export interface BaseMaintenanceHistoryObject {
  odometer: number;
  date: string;
  place: string;
  price: number;
  comment: string;
}

export interface MaintenanceHistorySendObject
  extends BaseMaintenanceHistoryObject {
  carId: number;
  performedMaintenance: number[];
}

export interface MaintenanceHistoryReceivingObject
  extends BaseMaintenanceHistoryObject {
  id: number;
}
