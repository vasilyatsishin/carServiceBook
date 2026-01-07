import type { CarReceivingObject } from "../Cars/CarInterface";

export interface carsState {
  cars: CarReceivingObject[];
  chosenCarId: number | null;
}
