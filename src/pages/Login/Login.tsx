import React from "react";
import styles from "./Login.module.css";
import AuthInput from "../../shared/components/AuthInput/AuthInput";
import { useLogin } from "./useLogin";
import { InputTypes } from "../../interfaces/InputTypes";
import SaveButton from "../../shared/components/SaveButton/SaveButton";
import { NavLink } from "react-router-dom";
import { pathConstants } from "../../constants/pathConstants";

const Login: React.FC = () => {
  const state = useLogin();

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.formWrapper}>
        <h1 className={styles.header}>З поверненням!</h1>
        <AuthInput
          label="Електронна пошта"
          setValue={state.setEmail}
          value={state.email}
          type={InputTypes.EMAIL}
          placeholder="your.name@gmail.com"
        />
        <AuthInput
          label="Пароль"
          setValue={state.setPassword}
          value={state.password}
          type={InputTypes.PASSWORD}
        />
        <NavLink to={pathConstants.REGISTER}>Ще не зареєстровані?</NavLink>
      </div>
      <div className={styles.formWrapper}>
        <SaveButton isActive submitHandler={() => {}} fullWidth />
      </div>
    </div>
  );
};

export default Login;
