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
import type { NextMaintenanceObject } from "../../../interfaces/Maintenance/MaintenanceJobInterface";
import MultiDropDown from "../../../shared/components/MultiDropDown/MultiDropDown";
import DatePicker from "../../../shared/components/DatePicker/DatePicker";

interface AddMaintenanceHistoryModalProps {
  visible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  maintenanceList: NextMaintenanceObject[];
}

const AddMaintenanceHistoryModal: React.FC<AddMaintenanceHistoryModalProps> = ({
  visible,
  setIsVisible,
  maintenanceList,
}) => {
  const { carId } = useParams<{ carId: string }>();
  const { setters, state, handlers } = useAddMaintenanceHistoryModal({
    carId: carId || "",
    setIsVisible,
  });

  return (
    <>
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
            setData={(value: string) =>
              setters.setOdometer(formatOdometer(value))
            }
            placeholder="180.000"
            variant="addMaintenance"
            validator={(value) => {
              if (!odometorValidator(value)) {
                return "Пробіг має містити тільки цифри";
              }
              if (state.car.odometer > parseOdometerIntoNumber(value)) {
                return "Пробіг не може бути меншим, ніж на минулому ТО";
              }
              return null; // якщо все ок
            }}
          />
          <div className={styles.fullsizeWrapper} style={{ marginBottom: 15 }}>
            <p className={styles.label}>Роботи</p>
            <MultiDropDown
              chosenValues={state.performedMaintenances}
              setChosenValue={setters.setPerformedMaintenances}
              values={maintenanceList.map((e) => ({
                label: e.jobName,
                value: e.jobId,
              }))}
            />
          </div>
          <div className={styles.fullsizeWrapper} style={{ marginBottom: 15 }}>
            <div className={styles.spaceBetweenWrapper}>
              <DatePicker date={state.date} setDate={setters.setDate} />

              <Input
                variant="priceInput"
                label="Сума"
                placeholder="15.000"
                data={state.price}
                setData={(value: string) =>
                  setters.setPrice(formatOdometer(value))
                }
                validator={(value) => {
                  if (!odometorValidator(value)) {
                    return "Ціна має містити тільки цифри";
                  }
                  return null;
                }}
              />
            </div>
          </div>
          <SaveButton
            submitHandler={handlers.handleSubmit}
            isActive={state.isSendButtonActive}
            fullWidth={false}
          />
        </div>
      </div>
    </>
  );
};

export default AddMaintenanceHistoryModal;
