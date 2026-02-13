import type React from "react";
import styles from "./AuthInput.module.css";
import { InputTypes } from "../../../interfaces/InputTypes";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityOnIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";

interface AuthInputProps {
  type: InputTypes;
  value: string;
  setValue: (value: string) => void;
  label: string;
  placeholder?: string;
  error?: string;
}

const AuthInput: React.FC<AuthInputProps> = ({
  type,
  value,
  setValue,
  label,
  placeholder = "",
  error,
}) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [fixedType, setFixedType] = useState<InputTypes>(type);

  useEffect(() => {
    if (type === InputTypes.PASSWORD && passwordVisible) {
      setFixedType(InputTypes.TEXT);
    } else if (type === InputTypes.PASSWORD && !passwordVisible) {
      setFixedType(InputTypes.PASSWORD);
    }
  }, [passwordVisible]);

  return (
    <>
      <div className={styles.inputWrapper}>
        <span className={styles.labelForInput}>{label}</span>
        <div className={styles.inputContainer}>
          <input
            type={fixedType}
            className={`${styles.input} ${error && styles.inputError}`}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            placeholder={placeholder}
          />
          {type === InputTypes.PASSWORD && (
            <div
              className={styles.iconWrapper}
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? (
                <VisibilityOffIcon sx={{ color: "#000" }} />
              ) : (
                <VisibilityOnIcon sx={{ color: "#000" }} />
              )}
            </div>
          )}
        </div>
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    </>
  );
};

export default AuthInput;
