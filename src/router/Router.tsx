import type React from "react";
import { Route, Routes } from "react-router-dom";
import ExistCars from "../pages/ExistCars/ExistCars";
import AddCar from "../pages/AddCar/AddCar";
import { pathConstants } from "../constants/pathConstants";
import Maintenance from "../pages/Maintenance/Maintenance";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login/Login";
import NavLayout from "../shared/layouts/NavLayout";
import Register from "../pages/Register/Register";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route element={<Login />} path={pathConstants.LOGIN} />
      <Route element={<Register />} path={pathConstants.REGISTER} />
      <Route element={<NavLayout />}>
        <Route element={<ProtectedRoute />}>
          <Route element={<ExistCars />} path="*" />
          <Route element={<ExistCars />} path={pathConstants.EXIST_CARS} />
          <Route element={<AddCar />} path={pathConstants.ADD_CAR} />
          <Route
            element={<AddCar isEdit />}
            path={`${pathConstants.EDIT_CAR}/:carId`}
          />
          <Route
            element={<Maintenance />}
            path={`${pathConstants.MAINTENANCE}/:carId`}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
