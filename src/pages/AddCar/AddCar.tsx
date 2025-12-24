import type React from "react";
import styles from "./AddCar.module.css";
import AddCarForm from "../../components/AddCar/AddCarForm/AddCarForm";

const AddCar: React.FC = () => {
  return (
    <div className={styles.mainWrapper}>
      <h1 className={styles.header}>Додавання нового авто</h1>
      <AddCarForm />
    </div>
  );
};

export default AddCar;
