import React, { useState, useEffect } from "react";
import type { ToastType } from "../../providers/ToastProvider";
import styles from "./Toast.module.css";

interface ToastProps {
  message: string;
  duration?: number;
  type: ToastType;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  duration = 5000,
  type,
  onClose,
}) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Запускаємо анімацію появи відразу після монтування
    setShouldRender(true);

    const timer = setTimeout(() => {
      setShouldRender(false);
      setTimeout(onClose, 500); // Чекаємо завершення анімації виходу
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`${styles.toast} ${shouldRender ? styles.enter : styles.exit} ${type === "error" ? styles.toastError : styles.toastSuccess}`}
    >
      <span>{message}</span>

      <button
        onClick={() => {
          setShouldRender(false);
          setTimeout(onClose, 500);
        }}
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
