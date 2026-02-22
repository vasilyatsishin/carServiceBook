import { Navigate, Outlet } from "react-router-dom";
import { pathConstants } from "../constants/pathConstants";
import { useEffect, useState } from "react";
import { useToast } from "../shared/providers/ToastProvider";
import { logout } from "../services/authService";

const ProtectedRoute = () => {
  const toast = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("access")),
  );

  const checkAuth = async () => {
    const token = localStorage.getItem("access");
    if (!token) {
      setIsAuthenticated(false);
      toast("Сесія користувача закінчилась", "error");
      await logout();
    }
  };

  useEffect(() => {
    // 1. Слухаємо подію 'storage' (спрацьовує, якщо змінили localStorage в іншій вкладці)
    window.addEventListener("storage", checkAuth);

    // 2. Перевірка за інтервалом (опціонально, але корисно, якщо токен видаляється скриптом на цій же вкладці)
    const interval = setInterval(checkAuth, 1000);

    return () => {
      window.removeEventListener("storage", checkAuth);
      clearInterval(interval);
    };
  }, []);

  if (!isAuthenticated) {
    // replace: true не дає користувачу повернутися назад кнопкою "Back" до захищеної зони
    return <Navigate to={pathConstants.LOGIN} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
