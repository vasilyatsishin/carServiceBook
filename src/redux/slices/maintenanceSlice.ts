import { createSlice } from "@reduxjs/toolkit";
import type { maintenanceState } from "../../interfaces/redux/maintenanceState";
import type { NextMaintenanceObject } from "../../interfaces/Maintenance/MaintenanceJobInterface";

const initialState: maintenanceState = {
  nextMaintenances: [],
};

const maintenanceSlice = createSlice({
  name: "maintenance",
  initialState,
  reducers: {
    setNewNextMaintenance: (
      state,
      action: { payload: NextMaintenanceObject }
    ) => {
      state.nextMaintenances.push(action.payload);
    },
    setNextMaintenances: (
      state,
      action: { payload: NextMaintenanceObject[] }
    ) => {
      state.nextMaintenances = action.payload;
    },
    clearNextMaintenances: (state) => {
      state.nextMaintenances = initialState.nextMaintenances;
    },
  },
});

export const {
  setNewNextMaintenance,
  setNextMaintenances,
  clearNextMaintenances,
} = maintenanceSlice.actions;
export default maintenanceSlice.reducer;
