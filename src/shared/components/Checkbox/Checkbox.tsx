import type React from "react";
import styles from "./Checkbox.module.css";

interface CheckboxProps {
  handleChoose: (e: any) => void;
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, handleChoose }) => {
  return (
    <>
      <label className={styles.label}>
        <input
          type="checkbox"
          name="forallcars"
          onChange={handleChoose}
          className={styles.checkbox}
        />
        {label}
      </label>
    </>
  );
};

export default Checkbox;
