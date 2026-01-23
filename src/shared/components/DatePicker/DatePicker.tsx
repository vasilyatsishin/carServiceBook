import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { PickerValue } from "@mui/x-date-pickers/internals";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import type React from "react";
import type { Dayjs } from "dayjs";

import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";

interface CustomDatePickerProps {
  date: Dayjs | null;
  setDate: (newValue: Dayjs | null) => void;
}

const DatePicker: React.FC<CustomDatePickerProps> = ({ date, setDate }) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
        <MuiDatePicker
          value={date}
          onChange={(newValue: PickerValue) => setDate(newValue)}
          label="Дата проведення"
          slotProps={{
            popper: {
              placement: "bottom-start", // Примусово знизу (зліва)
              modifiers: [
                {
                  name: "flip",
                  enabled: true, // Вимикаємо авто-перевертання вгору
                },
                {
                  name: "offset",
                  options: {
                    offset: [0, 0], // Відступ 10 пікселів вниз від інпуту
                  },
                },
              ],
            },
            textField: {
              readOnly: true,
              onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
                e.preventDefault(); // Скасовує будь-яке введення з клави
              },
              sx: {
                "& .MuiOutlinedInput-root": {
                  borderRadius: "45px",
                  backgroundColor: "#f9f9f9",
                  // Рамка при фокусі (замість синьої)
                  "&.Mui-focused fieldset": {
                    borderColor: "yellow !important",
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "black",
                  fontFamily: "Montserrat",
                  fontWeight: 700, // Лейбл теж жовтіє
                  zIndex: 0,
                },
                "&.Mui-focused fieldset": {
                  borderColor: "yellow !important", // ставимо жовтий
                  borderWidth: "2px",
                  zIndex: -1,
                },
                "& .MuiInputAdornment-root .MuiButtonBase-root": {
                  color: "gray",
                  "&.Mui-focused": {
                    color: "yellow",
                  },
                },
              },
            },
            yearButton: {
              sx: {
                // Стиль для вибраного року
                "&.Mui-selected": {
                  backgroundColor: "yellow !important",
                  color: "black !important",
                  "&:focus": {
                    backgroundColor: "#e6e600 !important",
                  },
                },
                // Стиль при наведенні
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 0, 0.1)",
                },
                // Колір тексту поточного року
                "&.MuiPickersYear-yearButton.Mui-disabled": {
                  color: "rgba(0, 0, 0, 0.38)",
                },
              },
            },
            // 2. Робимо фон календаря білим (замість рожевого)
            desktopPaper: {
              sx: {
                backgroundColor: "#fff !important",
                "& .MuiPickersCalendarHeader-root": {
                  backgroundColor: "#fff", // Хедер теж білий
                },
              },
            },
            // 3. Міняємо колір вибраного дня (Синій -> Жовтий)
            day: {
              sx: {
                "&.Mui-selected": {
                  backgroundColor: "yellow !important",
                  color: "black !important", // Текст на жовтому фоні краще чорним
                  "&:hover": {
                    backgroundColor: "#e6e600 !important", // Трохи темніший жовтий при наведенні
                  },
                },
                // Обводка сьогоднішнього дня
                "&.MuiPickersDay-today": {
                  borderColor: "yellow !important",
                },
              },
            },
            monthButton: {
              sx: {
                "&.Mui-selected": {
                  backgroundColor: "yellow !important",
                  color: "black !important", // Текст на жовтому фоні краще чорним
                  "&:hover": {
                    backgroundColor: "#e6e600 !important", // Трохи темніший жовтий при наведенні
                  },
                },
                // Обводка сьогоднішнього дня
                "&.MuiPickersMonth": {
                  borderColor: "yellow !important",
                },
              },
            },
          }}
        />
      </LocalizationProvider>
    </>
  );
};

export default DatePicker;
