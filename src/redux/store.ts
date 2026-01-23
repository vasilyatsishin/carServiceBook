import carsState from "./../redux/slices/carsSlice";
import maintenanceState from "./../redux/slices/maintenanceSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    carsState: carsState,
    maintenanceState: maintenanceState,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
