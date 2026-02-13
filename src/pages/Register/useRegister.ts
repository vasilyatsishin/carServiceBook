import { useState } from "react";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../shared/helpers/validators/authValidator";
import { register } from "../../services/authService";

export const useRegister = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    const isFormValid = validate();
    if (!isFormValid) {
      return;
    }
    try {
      await register();
    } catch (error) {}
  };

  return {
    // state
    name,
    email,
    password,
    passwordConfirm,
    errors,

    // setters
    setName,
    setEmail,
    setPassword,
    setPasswordConfirm,

    // handlers
    handleSubmit,
  };
};
