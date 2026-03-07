import type React from "react";
import styles from "./ExistCars.module.css";
import { useExistCars } from "./useExistCars";
import { useLayoutEffect } from "react";
import CarCard from "../../components/ExistCars/CarCard/CarCard";
import { useLocation } from "react-router";
import Loader from "../../shared/components/Loader/Loader";

const ExistCars: React.FC = () => {
  const { state, functions } = useExistCars();

  const location = useLocation();

  useLayoutEffect(() => {
    functions.fetchCars();
  }, [location.pathname]);

  return (
    <>
      <div className={styles.mainWrapper}>
        <div className={styles.listWrapper}>
          {state.isLoading ? (
            <Loader visible={state.isLoading} />
          ) : (
            <>
              {!state.cars.length && (
                <div className={styles.emptyContainer}>
                  <h1 className={styles.emptyText}>
                    Список автомобілів порожній
                  </h1>
                </div>
              )}

              {state.cars.map((e) => (
                <CarCard
                  key={e.id}
                  car={e}
                  onDeleteClick={functions.deleteCar}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ExistCars;
