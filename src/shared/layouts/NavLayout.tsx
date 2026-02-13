import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

const NavLayout = () => {
  return (
    <>
      <NavBar />
      <main>
        <Outlet /> {/* Тут рендеряться вкладені маршрути */}
      </main>
    </>
  );
};

export default NavLayout;