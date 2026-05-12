import { useState } from "react";
import type { LoginDTO } from "../../interfaces/AuthInterfaces";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../shared/providers/ToastProvider";
import { validateEmail } from "../../shared/helpers/validators/authValidator";
import { getUserRole } from "../../shared/helpers/jwtDecoder";
import { ROLES } from "../../constants/roles";
import { pathConstants } from "../../constants/pathConstants";

export const useLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const toast = useToast();

  const validate = () => {
    const newErrors: Record<string, string> = {};

    const emailError = validateEmail(email);

    if (emailError) newErrors.email = emailError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (isLoading) return;

    setIsLoading(true);

    const isFormValid = validate();
    if (!isFormValid) {
      setIsLoading(false);
      return;
    }

    const payload: LoginDTO = {
      email,
      password,
    };

    try {
      const response = await login(payload);

      if (response) {
        localStorage.setItem("access", response);
      }

      const role = getUserRole();
      if (role === ROLES.OPERATOR) {
        navigate(pathConstants.OPERATOR);
      } else if (role === ROLES.SERVICE) {
        navigate(pathConstants.SERVICE);
      } else {
        navigate(pathConstants.EXIST_CARS);
      }

      toast("Успішна авторизація", "success");
    } catch (error: any) {
      toast(error, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // state
    email,
    password,
    isLoading,
    errors,

    // setters
    setEmail,
    setPassword,

    // handlers
    handleSubmit,
  };
};
