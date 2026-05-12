import type React from "react";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import { pathConstants } from "../../../constants/pathConstants";
import { logout as logoutReq } from "../../../services/authService";
import LogoutIcon from "@mui/icons-material/Logout";
import { getUserRole } from "../../helpers/jwtDecoder";
import { ROLES } from "../../../constants/roles";

const NavBar: React.FC = () => {
  const role = getUserRole();

  const logout = async () => {
    localStorage.setItem("manual_logout", "true");
    localStorage.removeItem("access");
    await logoutReq();
  };

  return (
    <div className={styles.mainWrapper}>
      {role === ROLES.OWNER && (
        <NavLink to={pathConstants.EXIST_CARS} className={styles.navlink}>
          Мої автомобілі
        </NavLink>
      )}

      {role === ROLES.SERVICE && (
        <>
          <NavLink to={pathConstants.SERVICE} className={styles.navlink}>
            Всі автомобілі
          </NavLink>
          <NavLink to={pathConstants.SERVICE_ADD_CAR} className={styles.yellowContainerNavlink}>
            Додати авто
          </NavLink>
        </>
      )}

      <button onClick={logout} className={styles.logout}>
        Вихід
        <LogoutIcon htmlColor="#ff4d4f" fontSize="small" />
      </button>
    </div>
  );
};

export default NavBar;
