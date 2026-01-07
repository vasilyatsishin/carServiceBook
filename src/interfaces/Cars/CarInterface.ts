export interface CarEntity {
  id?: number;
  odometer: string;
  name: string;
  photo?: File;
}

export interface CarReceivingObject {
  id: number;
  odometer: number;
  name: string;
  photoUrl: string;
}
