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
  performedCatalogIds: number[];
}

export interface MaintenanceHistoryReceivingObject
  extends BaseMaintenanceHistoryObject {
  id: number;
  isPaid: boolean;
}

export interface MaintenanceDetailsItem {
  name: string;
  price: number;
}

export interface MaintenanceDetailsResponse {
  works: MaintenanceDetailsItem[];
  totalPrice: number;
}
