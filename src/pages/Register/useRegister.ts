import { useState } from "react";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../shared/helpers/validators/authValidator";
import { register } from "../../services/authService";
import { useToast } from "../../shared/providers/ToastProvider";
import type { RegisterDTO } from "../../interfaces/AuthInterfaces";

export const useRegister = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const validate = () => {
    const newErrors: Record<string, string> = {};

    const emailError = validateEmail(email);
    const nameError = validateName(name); // Припустимо, ти додав поле name
    const passwordError = validatePassword(password);

    if (emailError) newErrors.email = emailError;
    if (nameError) newErrors.name = nameError;
    if (passwordError) newErrors.password = passwordError;

    if (!passwordError) {
      if (!passwordConfirm) {
        newErrors.passwordConfirm = "Підтвердіть пароль";
      } else if (password !== passwordConfirm) {
        newErrors.passwordConfirm = "Паролі не збігаються";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (isLoading) return;

    setIsLoading(true);
    const isFormValid = validate();
    if (!isFormValid) {
      setIsLoading(false)
      return;
    }

    const payload: RegisterDTO = {
      email,
      name,
      password,
    };

    try {
      await register(payload);
      toast("Успішна реєстрація", "success");
    } catch (error: any) {
      toast(error, "error");
    } finally {
      setIsLoading(false)
    }
  };

  return {
    // state
    name,
    email,
    password,
    passwordConfirm,
    errors,
    isLoading,

    // setters
    setName,
    setEmail,
    setPassword,
    setPasswordConfirm,

    // handlers
    handleSubmit,
  };
};
