import { useState } from "react";
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from "react-native-ui-datepicker";

interface Props {
  //Retorna la fecha
  onChange: (date: Date) => void;
}

export function ThemedDatePicker({ onChange }: Props) {
  const defaultStyles = useDefaultStyles();
  const [selected, setSelected] = useState<DateType>();

  const today = new Date();

  function getDateInTwoWeeks(): Date {
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 14);
    return maxDate;
  }

  return (
    <DateTimePicker
      className="bg-gray-300 w-[92%] rounded-3xl shadow-2xl"
      disableYearPicker
      mode="single"
      minDate={today}
      maxDate={getDateInTwoWeeks()}
      styles={defaultStyles}
      onChange={({ date }) => {
        if (date instanceof Date) {
          onChange(date);
        }
      }}
    />
  );
}
