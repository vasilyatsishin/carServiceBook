import type React from "react";
import { formatOdometer } from "../../../shared/helpers/formatters/carFormatter";
import EditIcon from "@mui/icons-material/ModeEdit";
import styles from "./CarInfo.module.css";
import { useState } from "react";

interface CarInfoProps {
  odometer: number;
  handleOdometerChange: () => void;
  carName: string;
}

const CarInfo: React.FC<CarInfoProps> = ({
  odometer,
  handleOdometerChange,
  carName,
}) => {
  const [isInputActive, setIsInputActive] = useState<boolean>(false);
  return (
    <>
      <h1 className={styles.carName}>{carName}</h1>
      <div className={styles.odometerWrapper}>
        {isInputActive && (
          <h4 className={styles.carOdometer}>
            Пробіг: {formatOdometer(odometer.toString())} км.
          </h4>
        )}
        <button
          className={styles.editButton}
          onClick={() => setIsInputActive(!isInputActive)}
        >
          <EditIcon colorRendering="red" fontSize="small" />
        </button>
      </div>
    </>
  );
};

export default CarInfo;
