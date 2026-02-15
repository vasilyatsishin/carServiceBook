import type React from "react";
import styles from "./SaveButton.module.css";

interface SaveButtonProps {
  submitHandler: () => void;
  isActive: boolean;
  fullWidth: boolean;
  text?: string;
  isLoading: boolean
}

const SaveButton: React.FC<SaveButtonProps> = ({
  submitHandler,
  isActive,
  fullWidth,
  text = "Зберегти",
  isLoading
}) => {
  return (
    <>
      <div className={styles.mainWrapper}>
        <button
          type="button"
          onClick={submitHandler}
          className={`${styles.button} ${isActive ? styles.buttonActive : ""}`}
          style={{ width: fullWidth ? "100%" : "" }}
          disabled={!isActive}
        >
          {isLoading ? "Завантаження..." : text}
        </button>
      </div>
    </>
  );
};

export default SaveButton;
