import { Navigate, Outlet } from "react-router-dom";
import { pathConstants } from "../constants/pathConstants";
import { useEffect, useState } from "react";
import { useToast } from "../shared/providers/ToastProvider";
import { logout } from "../services/authService";
import { getUserRole } from "../shared/helpers/jwtDecoder";
import { ROLES } from "../constants/roles";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const toast = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("access")),
  );

  const checkAuth = async () => {
    const token = localStorage.getItem("access");
    const isManual = localStorage.getItem("manual_logout");

    if (!token) {
      setIsAuthenticated(false);

      if (!isManual) {
        toast("Сесія користувача закінчилась", "error");
      } else {
        toast("Успішний вихід");
      }

      localStorage.removeItem("manual_logout");
      await logout();
    }
  };

  useEffect(() => {
    window.addEventListener("storage", checkAuth);
    const interval = setInterval(checkAuth, 1000);
    return () => {
      window.removeEventListener("storage", checkAuth);
      clearInterval(interval);
    };
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={pathConstants.LOGIN} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const role = getUserRole();
    if (!role || !allowedRoles.includes(role)) {
      const redirectMap: Record<string, string> = {
        [ROLES.OWNER]: pathConstants.EXIST_CARS,
        [ROLES.OPERATOR]: pathConstants.OPERATOR,
        [ROLES.SERVICE]: pathConstants.SERVICE,
      };
      const redirect = role ? (redirectMap[role] ?? pathConstants.LOGIN) : pathConstants.LOGIN;
      return <Navigate to={redirect} replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
