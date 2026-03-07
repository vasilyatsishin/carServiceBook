import type React from "react";
import styles from "./CarCard.module.css";
import type { CarReceivingObject } from "../../../interfaces/Cars/CarInterface";
import { formatOdometer } from "../../../shared/helpers/formatters/carFormatter";
import { NavLink } from "react-router-dom";
import { pathConstants } from "../../../constants/pathConstants";
import EditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/DeleteOutline";

interface CarCardProps {
  car: CarReceivingObject;
  onDeleteClick: (carId: number) => void
}

const CarCard: React.FC<CarCardProps> = ({ car, onDeleteClick }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();  // Забороняє NavLink перейти за посиланням
    e.stopPropagation(); // Зупиняє передачу кліку від кнопки до NavLink
    onDeleteClick(car.id);
  };

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
        <div className={styles.actionsWrapper}>
          <NavLink
            to={`${pathConstants.EDIT_CAR}/${car.id}`}
            className={styles.editIconWrapper}
          >
            <EditIcon fontSize="small" />
          </NavLink>

          <button
            onClick={handleDelete}
            className={styles.editIconWrapper}
          >
            <DeleteIcon fontSize="small" htmlColor="#ff4d4f"/>
          </button>
        </div>
      </NavLink>
    </div>
  );
};

export default CarCard;
