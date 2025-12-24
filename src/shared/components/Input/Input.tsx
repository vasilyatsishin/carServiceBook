import type React from "react";
import styles from "./Input.module.css";
import { useState } from "react";

interface InputProps {
  label: string;
  placeholder: string;
  data: string;
  setData: (value: string) => void;
  validator?: (value: string) => string | null; // функція для валідації, повертає помилку або null
}

const Input: React.FC<InputProps> = ({
  label,
  data,
  setData,
  placeholder,
  validator,
}) => {
  const [error, setError] = useState<string | null>("");

  const handleChange = (value: string) => {
    if (validator) {
      const validationResult = validator(value);
      if (validationResult) {
        setError(validationResult);
      } else {
        setError("");
      }
    }
    setData(value);
  };

  return (
    <>
      <div className={styles.mainWrapper}>
        <p className={styles.label}>{label}</p>
        <input
          value={data}
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target.value)}
          className={styles.input}
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    </>
  );
};

export default Input;
