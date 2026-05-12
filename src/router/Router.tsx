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
import Operator from "../pages/Operator/Operator";
import ServiceDashboard from "../pages/ServiceDashboard/ServiceDashboard";
import { ROLES } from "../constants/roles";
import { Navigate } from "react-router-dom";
import { getUserRole } from "../shared/helpers/jwtDecoder";

const RoleRedirect: React.FC = () => {
  const role = getUserRole();
  if (role === ROLES.OPERATOR) return <Navigate to={pathConstants.OPERATOR} replace />;
  if (role === ROLES.SERVICE) return <Navigate to={pathConstants.SERVICE} replace />;
  return <Navigate to={pathConstants.EXIST_CARS} replace />;
};

const Router: React.FC = () => {
  return (
    <Routes>
      <Route element={<Login />} path={pathConstants.LOGIN} />
      <Route element={<Register />} path={pathConstants.REGISTER} />

      <Route element={<NavLayout />}>
        {/* Загальний захист — будь-яка авторизована роль */}
        <Route element={<ProtectedRoute />}>
          <Route path={pathConstants.INITIAL_ROUTE} element={<RoleRedirect />} />
          <Route path="*" element={<RoleRedirect />} />
        </Route>

        {/* OWNER routes */}
        <Route element={<ProtectedRoute allowedRoles={[ROLES.OWNER]} />}>
          <Route element={<ExistCars />} path={pathConstants.EXIST_CARS} />
          <Route element={<AddCar />} path={pathConstants.ADD_CAR} />
          <Route element={<AddCar isEdit />} path={`${pathConstants.EDIT_CAR}/:carId`} />
          <Route element={<Maintenance />} path={`${pathConstants.MAINTENANCE}/:carId`} />
        </Route>

        {/* OPERATOR routes */}
        <Route element={<ProtectedRoute allowedRoles={[ROLES.OPERATOR]} />}>
          <Route element={<Operator />} path={pathConstants.OPERATOR} />
        </Route>

        {/* SERVICE routes */}
        <Route element={<ProtectedRoute allowedRoles={[ROLES.SERVICE]} />}>
          <Route element={<ServiceDashboard />} path={pathConstants.SERVICE} />
          <Route
            element={<Maintenance />}
            path={`${pathConstants.SERVICE_MAINTENANCE}/:carId`}
          />
          <Route element={<AddCar />} path={pathConstants.SERVICE_ADD_CAR} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
