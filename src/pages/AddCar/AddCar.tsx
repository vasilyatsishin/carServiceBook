import type React from "react";
import styles from "./AddCar.module.css";
import AddCarForm from "../../components/AddCar/AddCarForm/AddCarForm";
import { useAddCar } from "./useAddCar";

interface AddCarProps {
  isEdit?: boolean;
}

const AddCar: React.FC<AddCarProps> = ({ isEdit = false }) => {
  const { carInfo } = useAddCar({ isEdit });
  return (
    <div className={styles.mainWrapper}>
      <h1 className={styles.header}>Додавання нового авто</h1>
      <AddCarForm carInfo={carInfo} />
    </div>
  );
};

export default AddCar;
