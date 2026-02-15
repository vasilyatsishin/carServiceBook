import React from "react";
import styles from "./Register.module.css";
import AuthInput from "../../shared/components/AuthInput/AuthInput";
import { useRegister } from "./useRegister";
import { InputTypes } from "../../interfaces/InputTypes";
import SaveButton from "../../shared/components/SaveButton/SaveButton";
import { NavLink } from "react-router-dom";
import { pathConstants } from "../../constants/pathConstants";

const Register: React.FC = () => {
  const state = useRegister();

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.formWrapper}>
        <h1 className={styles.header}>Реєстрація</h1>
        <AuthInput
          label="ПІБ"
          setValue={state.setName}
          value={state.name}
          type={InputTypes.TEXT}
          placeholder="Андрій Андріїв"
          error={state.errors.name}
        />
        <AuthInput
          label="Електронна пошта"
          setValue={state.setEmail}
          value={state.email}
          type={InputTypes.EMAIL}
          placeholder="your.name@gmail.com"
          error={state.errors.email}
        />
        <AuthInput
          label="Пароль"
          setValue={state.setPassword}
          value={state.password}
          type={InputTypes.PASSWORD}
          error={state.errors.password}
        />
        <AuthInput
          label="Підтвердіть пароль"
          setValue={state.setPasswordConfirm}
          value={state.passwordConfirm}
          type={InputTypes.PASSWORD}
          error={state.errors.passwordConfirm}
        />
        <NavLink to={pathConstants.LOGIN}>Вже зареєстровані?</NavLink>
      </div>
      <div className={styles.formWrapper}>
        <SaveButton isActive submitHandler={state.handleSubmit} fullWidth isLoading={state.isLoading}/>
      </div>
    </div>
  );
};

export default Register;
