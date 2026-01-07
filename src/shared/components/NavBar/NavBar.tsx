import type React from "react";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import { pathConstants } from "../../../constants/pathConstants";

const NavBar: React.FC = () => {
  return (
    <>
      <div className={styles.mainWrapper}>
        <NavLink to={pathConstants.EXIST_CARS} className={styles.navlink}>
          Мої автомобілі
        </NavLink>
        <NavLink to={pathConstants.MAINTENANCE} className={styles.navlink}>
          Обслуговування
        </NavLink>
        <NavLink
          to={pathConstants.ADD_CAR}
          className={styles.yellowContainerNavlink}
        >
          Додати авто
        </NavLink>
      </div>
    </>
  );
};

export default NavBar;
