import type React from "react";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import { pathConstants } from "../../../constants/pathConstants";
import { logout as logoutReq } from "../../../services/authService";
import LogoutIcon from '@mui/icons-material/Logout';

const NavBar: React.FC = () => {
  const logout = async () => {
    localStorage.setItem("manual_logout", "true");
    localStorage.removeItem("access"); 
    
    await logoutReq(); // Запит до бекенду (якщо треба)
  };

  return (
    <>
      <div className={styles.mainWrapper}>
        <NavLink to={pathConstants.EXIST_CARS} className={styles.navlink}>
          Мої автомобілі
        </NavLink>
        <NavLink
          to={pathConstants.ADD_CAR}
          className={styles.yellowContainerNavlink}
        >
          Додати авто
        </NavLink>
        <button onClick={logout} className={`${styles.navlink, styles.logout}`}>
          Вихід
          <LogoutIcon htmlColor="#ff4d4f" fontSize="small"/>
        </button>
      </div>
    </>
  );
};

export default NavBar;
