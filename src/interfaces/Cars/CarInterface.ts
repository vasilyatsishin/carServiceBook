export interface CarEntity {
  id?: number;
  odometer: string;
  name: string;
  photo?: File;
  ownerId?: number;
}

export interface UserClientDTO {
  id: number;
  name: string;
  email: string;
}

export interface CarReceivingObject {
  id: number;
  odometer: number;
  name: string;
  photoUrl: string;
  ownerName?: string;
  ownerId?: number;
}
