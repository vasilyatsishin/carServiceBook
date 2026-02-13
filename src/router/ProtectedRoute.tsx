import { Navigate, Outlet } from "react-router-dom";
import { pathConstants } from "../constants/pathConstants";

const ProtectedRoute = () => {
  // Тут має бути ваша логіка перевірки авторизації (наприклад, з Redux, Context або LocalStorage)
  const isAuthenticated = Boolean(localStorage.getItem("token")); 

  if (!isAuthenticated) {
    // replace: true не дає користувачу повернутися назад кнопкою "Back" до захищеної зони
    return <Navigate to={pathConstants.LOGIN} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;