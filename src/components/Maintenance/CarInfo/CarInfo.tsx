import type React from "react";
import { formatOdometer } from "../../../shared/helpers/formatters/carFormatter";
import EditIcon from "@mui/icons-material/ModeEdit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from '@mui/icons-material/Close';
import styles from "./CarInfo.module.css";
import { useCarInfo } from "./useCarInfo";
import type { CarReceivingObject } from "../../../interfaces/Cars/CarInterface";

interface CarInfoProps {
  odometer: number;
  car: CarReceivingObject
}

const CarInfo: React.FC<CarInfoProps> = ({
  odometer,
  car
}) => {
  const { isInputActive, inputRef, odometerValue, onInputChange, error, handleBlur, handleConfirm, handleEdit, isPending } = useCarInfo({ odometer, car })

  return (
    <>
      <h1 className={styles.carName}>{car.name}</h1>
      <div className={styles.odometerWrapper}>
        {!isInputActive ? (
          <h4 className={styles.carOdometer}>
            {isPending ? "Завантаження..." : `Пробіг: ${formatOdometer(car.odometer.toString())} км.`}
          </h4>
        ) : <div className={styles.inputWrapper}>
          <input
            ref={inputRef}
            className={styles.carOdometerChangeInput}
            value={odometerValue}
            onChange={onInputChange}
            required
            onBlur={handleBlur}
            placeholder=" "
          />
          <label className={styles.floatingLabel}>
            Пробіг, км
          </label>
          {error && (
            <span className={styles.errorText}>
              {error}
            </span>
          )}
        </div>
        }
        {isInputActive ? <>
          <button
            className={styles.editButton}
            onClick={handleBlur}
          >
            <CloseIcon fontSize="small" />
          </button>
          <button
            className={styles.editButton}
            onMouseDown={(e) => {
              e.preventDefault(); // Запобігає втраті фокусу інпутом
              handleConfirm();
            }}
          >
            <CheckIcon fontSize="small" />
          </button>
        </> : <button
          className={styles.editButton}
          onClick={handleEdit}
        >
          <EditIcon colorRendering="red" fontSize="small" />
        </button>}
      </div>
    </>
  );
};

export default CarInfo;
