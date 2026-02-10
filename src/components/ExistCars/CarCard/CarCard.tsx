import type React from "react";
import styles from "./CarCard.module.css";
import type { CarReceivingObject } from "../../../interfaces/Cars/CarInterface";
import { formatOdometer } from "../../../shared/helpers/formatters/carFormatter";
import { NavLink } from "react-router-dom";
import { pathConstants } from "../../../constants/pathConstants";
import EditIcon from "@mui/icons-material/ModeEdit";

interface CarCardProps {
  car: CarReceivingObject;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <div className={styles.mainWrapper}>
      <NavLink
        to={`${pathConstants.MAINTENANCE}/${car.id}`}
        className={styles.navigationToMaintenance}
      >
        <img src={car.photoUrl} className={styles.photo} />
        <div className={styles.textWrapper}>
          <h1 className={styles.header}>{car.name}</h1>
          <h2 className={styles.description}>
            Пробіг: {formatOdometer(car.odometer.toString())} км.
          </h2>
        </div>
      </NavLink>
      <NavLink
        to={`${pathConstants.EDIT_CAR}/${car.id}`}
        className={styles.editIconWrapper}
      >
        <EditIcon />
      </NavLink>
    </div>
  );
};

export default CarCard;
