export const formatOdometer = (value: string) => {
  // Видаляємо всі символи, крім цифр
  const digits = value.replace(/\D/g, "");
  // Додаємо крапку як тисячний роздільник
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const parseOdometerIntoNumber = (numberStr: string) => {
  return Number(numberStr.replace(/\./g, ""));
};
