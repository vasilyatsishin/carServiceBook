import { useState } from "react";

export const usePerformedMaintenance = () => {
  const [isModalShown, setIsModalShown] = useState<boolean>(false);

  return {
    state: {
      isModalShown,
    },
    setters: {
      setIsModalShown,
    },
  };
};
