import { createSlice } from "@reduxjs/toolkit";
import type { carsState } from "../../interfaces/redux/carsState";
import type { CarReceivingObject } from "../../interfaces/Cars/CarInterface";

const initialState: carsState = {
  cars: [],
  chosenCarId: null,
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setNewCar: (state, action: { payload: CarReceivingObject }) => {
      state.cars.push(action.payload);
    },
    setCars: (state, action: { payload: CarReceivingObject[] }) => {
      state.cars = action.payload;
    },
    clearCars: (state) => {
      state.cars = initialState.cars;
    },
    setChosenCar: (state, action: { payload: number | null }) => {
      state.chosenCarId = action.payload || null;
    },
  },
});

export const { setCars, setChosenCar, setNewCar, clearCars } =
  carsSlice.actions;
export default carsSlice.reducer;
