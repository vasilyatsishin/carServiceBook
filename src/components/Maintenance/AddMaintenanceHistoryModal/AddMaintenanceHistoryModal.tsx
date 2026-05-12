import type React from "react";
import styles from "./AddMaintenanceHistoryModal.module.css";
import Input from "../../../shared/components/Input/Input";
import { useAddMaintenanceHistoryModal } from "./useAddMaintenanceHistoryModal";
import { odometorValidator } from "../../../shared/helpers/validators/addCarValidator";
import {
  formatOdometer,
  parseOdometerIntoNumber,
} from "../../../shared/helpers/formatters/carFormatter";
import SaveButton from "../../../shared/components/SaveButton/SaveButton";
import { useParams } from "react-router";
import MultiDropDown from "../../../shared/components/MultiDropDown/MultiDropDown";
import DatePicker from "../../../shared/components/DatePicker/DatePicker";

interface AddMaintenanceHistoryModalProps {
  visible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

const AddMaintenanceHistoryModal: React.FC<AddMaintenanceHistoryModalProps> = ({
  visible,
  setIsVisible,
}) => {
  const { carId } = useParams<{ carId: string }>();
  const { setters, state, handlers } = useAddMaintenanceHistoryModal({
    carId: carId || "",
    setIsVisible,
  });

  return (
    <div
      className={styles.overlay}
      data-visible={visible}
      onClick={() => handlers.setToNull()}
    >
      <div
        className={styles.mainWrapper}
        onClick={(e) => e.stopPropagation()}
      >
        <h1>Додати запис про обслуговування</h1>
        <Input
          data={state.place}
          label="Місце"
          setData={setters.setPlace}
          placeholder="Офіційний дилерський центр BMW"
          variant="addMaintenance"
        />
        <Input
          data={state.odometer}
          label="Пробіг"
          setData={(value: string) => setters.setOdometer(formatOdometer(value))}
          placeholder="180.000"
          variant="addMaintenance"
          validator={(value) => {
            if (!odometorValidator(value)) return "Пробіг має містити тільки цифри";
            if ((state.car?.odometer ?? 0) > parseOdometerIntoNumber(value)) {
              return "Пробіг не може бути меншим, ніж на минулому ТО";
            }
            return null;
          }}
        />
        <div className={styles.fullsizeWrapper} style={{ marginBottom: 15 }}>
          <p className={styles.label}>Виконані роботи</p>
          <MultiDropDown
            chosenValues={state.performedMaintenances}
            setChosenValue={setters.setPerformedMaintenances}
            values={state.catalogDropdownOptions}
          />
        </div>
        <div className={styles.fullsizeWrapper} style={{ marginBottom: 15 }}>
          <div className={styles.spaceBetweenWrapper}>
            <DatePicker date={state.date} setDate={setters.setDate} />
            <p style={{ fontSize: 15, alignSelf: "flex-end" }}>
              Сума: <strong>{state.calculatedPrice} грн</strong>
            </p>
          </div>
        </div>
        <SaveButton
          submitHandler={handlers.handleSubmit}
          isActive={state.isSendButtonActive}
          fullWidth={false}
          isLoading={state.isLoading}
        />
      </div>
    </div>
  );
};

export default AddMaintenanceHistoryModal;
