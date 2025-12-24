import type React from "react";
import { Route, Routes } from "react-router-dom";
import ExistCars from "../pages/ExistCars/ExistCars";
import AddCar from "../pages/AddCar/AddCar";
import { pathConstants } from "../constants/pathConstants";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route element={<ExistCars />} path="*" />
      <Route element={<ExistCars />} path={pathConstants.EXIST_CARS} />
      <Route element={<AddCar />} path={pathConstants.ADD_CAR} />
    </Routes>
  );
};

export default Router;
