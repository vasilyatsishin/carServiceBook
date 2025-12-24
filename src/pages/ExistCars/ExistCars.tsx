import type React from "react";
import styles from "./ExistCars.module.css";
import { useExistCars } from "./useExistCars";
import { useEffect } from "react";
import CarCard from "../../components/ExistCars/CarCard/CarCard";
// import Loader from "../../shared/components/Loader/Loader";

const ExistCars: React.FC = () => {
  const { state, functions } = useExistCars();

  useEffect(() => {
    functions.fetchCars();
  }, []);

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
