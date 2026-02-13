import React from "react";
import styles from "./Register.module.css";
import AuthInput from "../../shared/components/AuthInput/AuthInput";
import { useRegister } from "./useRegister";
import { InputTypes } from "../../interfaces/InputTypes";
import SaveButton from "../../shared/components/SaveButton/SaveButton";

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
      </div>
      <div className={styles.formWrapper}>
        <SaveButton isActive submitHandler={state.handleSubmit} fullWidth />
      </div>
    </div>
  );
};

export default Register;
