import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

const NavLayout = () => {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default NavLayout;
