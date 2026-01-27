import { useEffect, useState } from "react";

export const usePerformedMaintenance = () => {
  const [isModalShown, setIsModalShown] = useState<boolean>(false);

  useEffect(() => {
    if (isModalShown) {
      // Забороняємо скрол
      document.body.style.overflow = 'hidden';
    } else {
      // Дозволяємо назад
      document.body.style.overflow = 'unset';
    }

    // "Прибираємо" за собою, якщо компонент розмонтується несподівано
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalShown]);

  return {
    state: {
      isModalShown,
    },
    setters: {
      setIsModalShown,
    },
  };
};
