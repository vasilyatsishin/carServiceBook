import Select from "react-select";
import type React from "react";
import makeAnimated from "react-select/animated";
import type { DropDownOptionsInterface } from "../../../interfaces/DropDownOptionsInterface";

interface MultiDropDownProps {
  values: DropDownOptionsInterface[];
  chosenValues: DropDownOptionsInterface[];
  setChosenValue: (val: DropDownOptionsInterface[]) => void;
}

const animatedComponents = makeAnimated();

const MultiDropDown: React.FC<MultiDropDownProps> = ({
  values,
  chosenValues,
  setChosenValue,
}) => {
  return (
    <Select<DropDownOptionsInterface, true>
      closeMenuOnSelect={true}
      placeholder="Виберіть проведені роботи:"
      noOptionsMessage={() => "Немає створених регламентних робіт"}
      components={animatedComponents}
      value={chosenValues}
      onChange={(value) =>
        setChosenValue(value ? (value as DropDownOptionsInterface[]) : [])
      }
      isMulti
      options={
        values?.map((e) => ({
          value: e.value,
          label: e.label,
        })) || []
      }
      styles={{
        control: (provided, state) => ({
          ...provided,
          border: 0,
          borderBottom: "1px solid",
          borderBottomColor: state.isFocused ? "var(--yellow-color)" : "black",
          "&:hover": { borderBottomColor: "var(--yellow-color)" },
          transition: "border-bottom-color 0.3s ease",
          boxShadow: "none",
          borderRadius: 0,
          padding: 0,
          minHeight: "unset",
          width: "100%",
          marginTop: 5,
          zIndex: 15,
        }),
        valueContainer: (provided) => ({
          ...provided,
          padding: 0,
          zIndex: 15,
        }),
        input: (provided) => ({
          ...provided,
          margin: 0,
          padding: 0,
          zIndex: 15,
        }),
        multiValue: (provided) => ({
          ...provided,
          margin: "2px 2px 2px 2px",
        }),
        indicatorsContainer: (provided) => ({
          ...provided,
          padding: 0,
        }),
        placeholder: (provided) => ({
          ...provided,
          fontSize: 15,
          letterSpacing: 0,
        }),
        multiValueLabel: (provided) => ({
          ...provided,
          fontSize: 15,
        }),
      }}
    />
  );
};

export default MultiDropDown;
