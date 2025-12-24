export interface CarEntity {
  id?: number;
  odometer: number;
  name: string;
  photo: string;
}

export interface CarReceivingObject {
  id: number;
  odometer: number;
  name: string;
  photoUrl: string;
}
