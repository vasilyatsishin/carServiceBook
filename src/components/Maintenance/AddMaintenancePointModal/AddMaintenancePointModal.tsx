import type React from "react";
import styles from "./AddMaintenancePointModal.module.css";
import Input from "../../../shared/components/Input/Input";
import { useAddMaintenancePointModal } from "./useAddMaintenancePointModal";
import { odometorValidator } from "../../../shared/helpers/validators/addCarValidator";
import { formatOdometer } from "../../../shared/helpers/formatters/carFormatter";
import SaveButton from "../../../shared/components/SaveButton/SaveButton";
import { useParams } from "react-router";
import Checkbox from "../../../shared/components/Checkbox/Checkbox";
import Select from "react-select";
import type { DropDownOptionsInterface } from "../../../interfaces/DropDownOptionsInterface";

interface AddMaintenancePointModalProps {
  visible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  scheduledJobNames: string[];
}

const AddMaintenancePointModal: React.FC<AddMaintenancePointModalProps> = ({
  visible,
  setIsVisible,
  scheduledJobNames,
}) => {
  const { carId } = useParams<{ carId: string }>();
  const { setters, state, handlers } = useAddMaintenancePointModal({
    carId: carId || "",
    setIsVisible,
    scheduledJobNames,
  });

  const catalogOptions: DropDownOptionsInterface[] = state.catalogItems.map(
    (c) => ({
      value: c.id,
      label: c.name,
    }),
  );

  return (
    <>
      <div
        className={styles.overlay}
        data-visible={visible}
        onClick={() => setIsVisible(false)}
      >
        <div
          className={styles.mainWrapper}
          onClick={(e) => e.stopPropagation()}
        >
          <h1>Створити тип обслуговування</h1>
          <div className={styles.fullsizeWrapper} style={{ marginBottom: 10 }}>
            <p style={{ fontSize: 16, margin: 0, fontWeight: 600 }}>Робота</p>
            <Select<DropDownOptionsInterface>
              placeholder="Виберіть роботу з довідника"
              noOptionsMessage={() => "Довідник порожній"}
              options={catalogOptions}
              value={
                catalogOptions.find((o) => o.value === state.catalogId) ?? null
              }
              onChange={(opt) => setters.setCatalogId(opt ? opt.value : null)}
              styles={{
                control: (provided, s) => ({
                  ...provided,
                  border: 0,
                  borderBottom: "1px solid",
                  borderBottomColor: s.isFocused
                    ? "var(--yellow-color)"
                    : "black",
                  "&:hover": { borderBottomColor: "var(--yellow-color)" },
                  boxShadow: "none",
                  borderRadius: 0,
                  minHeight: "unset",
                }),
                indicatorsContainer: (p) => ({ ...p, padding: 0 }),
                valueContainer: (p) => ({ ...p, padding: 0 }),
                input: (p) => ({ ...p, margin: 0, padding: 0 }),
              }}
            />
          </div>
          <Input
            data={state.interval}
            label="Інтервал заміни, км"
            setData={(value: string) =>
              setters.setInterval(formatOdometer(value))
            }
            placeholder="10.000"
            variant="addMaintenance"
            validator={(value) =>
              odometorValidator(value)
                ? null
                : "Інтервал має містити тільки цифри"
            }
          />
          <div className={styles.fullsizeWrapper}>
            <Checkbox
              handleChoose={(e) => setters.setRegular(e.target.checked)}
              label="Регулярне обслуговування"
            />
          </div>

          <SaveButton
            submitHandler={handlers.handleSubmit}
            isActive={state.isSendButtonActive}
            fullWidth={false}
            isLoading={state.isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default AddMaintenancePointModal;
