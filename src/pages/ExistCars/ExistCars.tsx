import type React from "react";
import styles from "./ExistCars.module.css";
import { useExistCars } from "./useExistCars";
import { useEffect } from "react";
import CarCard from "../../components/ExistCars/CarCard/CarCard";
import { useLocation } from "react-router";
// import Loader from "../../shared/components/Loader/Loader";

const ExistCars: React.FC = () => {
  const { state, functions } = useExistCars();

  const location = useLocation();

  useEffect(() => {
    functions.fetchCars();
  }, [location.pathname]);

  return (
    <>
      <div className={styles.mainWrapper}>
        <div className={styles.listWrapper}>
          {state.cars.map((e) => (
            <CarCard key={e.id} car={e} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ExistCars;
