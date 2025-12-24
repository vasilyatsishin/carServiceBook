import type React from "react";
import styles from "./CarCard.module.css";
import type { CarReceivingObject } from "../../../interfaces/Cars/CarInterface";
import { formatOdometer } from "../../../shared/helpers/formatters/carFormatter";

interface CarCardProps {
  car: CarReceivingObject;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <div className={styles.mainWrapper}>
      <img src={car.photoUrl} className={styles.photo} />
      <h1 className={styles.header}>{car.name}</h1>
      <h2 className={styles.description}>
        Пробіг: {formatOdometer(car.odometer.toString())} км.
      </h2>
    </div>
  );
};

export default CarCard;
