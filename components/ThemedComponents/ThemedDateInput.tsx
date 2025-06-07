import React, { useState } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import DateTimePicker, { useDefaultStyles } from "react-native-ui-datepicker";
import ThemedTextInput from "./ThemedTextInput";

interface Props {
  value: string;
  onChange: (date: Date) => void;
  className?: string;
  placeholder?: string;
  inputRef?: React.RefObject<any>;
  disabledDates?: Date[];
}

export function ThemedDatePicker({
  value,
  onChange,
  className = "w-full",
  placeholder = "Elige una fecha",
  inputRef,
  disabledDates = [],
}: Props) {
  const [showCalendar, setShowCalendar] = useState(false);

  // console.log("fecha recibida primero", value);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setShowCalendar(true)}
        style={{ width: "100%" }}
      >
        <ThemedTextInput
          // className={className}
          icon="calendar-clear-outline"
          placeholder={placeholder}
          value={value}
          ref={inputRef}
          editable={false}
          pointerEvents="none"
          style={{
            width: "100%",
            minHeight: 41,
          }}
        />
      </TouchableOpacity>

      <Modal visible={showCalendar} transparent animationType="fade">
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={1}
          onPress={() => setShowCalendar(false)}
        >
          <View
            style={{ padding: 20 }}
            onStartShouldSetResponder={() => true}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            <DatePicker
              onChange={(date) => {
                onChange(date);
                setShowCalendar(false);
              }}
              value={value}
              disabledDates={disabledDates}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const DatePicker: React.FC<{
  onChange: (date: Date) => void;
  value?: string;
  disabledDates?: Date[];
}> = ({ onChange, value, disabledDates = [] }) => {
  const defaultStyles = useDefaultStyles();
  const today = new Date();

  function getDateInOneMonth(): Date {
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate;
  }

  let fechaElegida = new Date();
  // console.log("fecha recibida", value);
  if (value) {
    fechaElegida = new Date(value) ?? "";
  }

  return (
    <DateTimePicker
      className="bg-gray-600 p-2  w-[300px] rounded-3xl shadow-2xl"
      disableYearPicker
      //TODO: meter las fechas donde el barbero no trabaja o no hay citas
      // disabledDates={[new Date(2025, 5, 13), new Date(2025, 5, 19)]}
      disabledDates={disabledDates}
      mode="single"
      locale="es-ES"
      minDate={today}
      maxDate={getDateInOneMonth()}
      firstDayOfWeek={1}
      date={fechaElegida}
      onChange={({ date }) => {
        if (date instanceof Date) {
          // Corregir problema de zona horaria
          const year = date.getFullYear();
          const month = date.getMonth();
          const day = date.getDate();
          // Crear fecha sin desplazamiento de zona horaria
          const correctedDate = new Date(year, month, day, 12);
          onChange(correctedDate);
        }
      }}
      styles={{
        ...defaultStyles,
        // days: {
        //   backgroundColor: "#4B5563", // bg-gray-600
        //   borderRadius: 16,
        // },
        header: {
          backgroundColor: "#4B5563",
        },
        weekdays: {
          backgroundColor: "#4B5563",
          borderBottomWidth: 1,
          borderBottomColor: "#374151",

          marginBottom: 4,
        },
        weekday_label: {
          color: "#D1D5DB",
          fontWeight: "600",
          fontSize: 13,
        },
        // day_cell: {
        //   margin: 2,
        //   borderRadius: 8,
        // },
        day_label: {
          color: "#F3F4F6",
          fontWeight: "500",
          fontSize: 15,
        },
        selected: {
          backgroundColor: "#2563EB",
          borderRadius: 8,
        },
        selected_label: {
          color: "#FFF",
          fontWeight: "bold",
        },
        today: {
          // borderWidth: 2,
          // borderColor: "#3B82F6",
          // borderRadius: 8,
        },
        today_label: {
          // color: "#60A5FA",
          fontWeight: "bold",
        },
        outside_label: {
          color: "#6B7280",
          opacity: 0.5,
        },
        button_next: {
          // backgroundColor: "#FFFFFF",
          borderRadius: 16,
          padding: 8,
        },
        button_prev: {
          // backgroundColor: "#FFFFFF",
          borderRadius: 16,
          padding: 8,
        },
        month_selector_label: {
          color: "#F3F4F6",
          fontWeight: "bold",
        },
        year_selector_label: {
          color: "#F3F4F6",
          fontWeight: "bold",
        },
      }}
    />
  );
};
