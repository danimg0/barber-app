import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useRef, useState } from "react";
import { Platform, Pressable, ScrollView, View } from "react-native";
import {
  TimerPickerModal,
  TimerPickerModalRef,
} from "react-native-timer-picker";
import Toast from "react-native-toast-message";
import ThemedButton from "./ThemedComponents/ThemedButton";
import ThemedModalGeneral from "./ThemedComponents/ThemedModalGeneral";
import ThemedText from "./ThemedComponents/ThemedText";
import ThemedTextInput from "./ThemedComponents/ThemedTextInput";

const diasSemana = [
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado",
  "domingo",
];

type Horario = {
  [dia: string]: { hora_inicio: string; hora_fin: string }[];
};

type ModalStepperEmpleadoProps = {
  visible: boolean;
  onClose: () => void;
  initialValues?: {
    name?: string;
    email?: string;
    phone?: string;
    horario?: Horario;
    disponible?: boolean;
  };
  isEdit?: boolean;
  onSaveUser: (form: {
    name: string;
    email: string;
    phone: string;
    horario: Horario;
    disponible: boolean;
  }) => Promise<void>;
  loading: boolean;
};

function esHoraMayor(hora1: string, hora2: string) {
  // hora1 y hora2 en formato "HH:mm:ss"
  return hora1.localeCompare(hora2) === 1;
}

export default function ModalStepperEmpleado({
  visible,
  onClose,
  initialValues = {},
  isEdit = false,
  onSaveUser,
  loading,
}: ModalStepperEmpleadoProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: initialValues.name || "",
    email: initialValues.email || "",
    phone: initialValues.phone || "",
    horario: initialValues.horario || {},
    disponible: initialValues.disponible || true,
  });
  const [horario, setHorario] = useState(form.horario);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerTarget, setPickerTarget] = useState<{
    dia: string;
    idx: number;
    campo: "hora_inicio" | "hora_fin";
  } | null>(null);
  const [error, setError] = useState(""); // <-- Añade estado para error
  const timerPickerRef = useRef<TimerPickerModalRef>(null);

  // Para cada día, array de tramos [{inicio, fin}]
  const handleAddTramo = (dia: string) => {
    console.log(`Añadiendo tramo para el día: ${dia}`);

    setHorario((prev) => ({
      ...prev,
      [dia]: [...(prev[dia] || []), { hora_inicio: "", hora_fin: "" }],
    }));
  };

  const handleChangeTramo = (
    dia: string,
    idx: number,
    campo: "hora_inicio" | "hora_fin",
    valor: string
  ) => {
    // Si se está editando la hora_fin, comprobar que es mayor que hora_inicio
    if (campo === "hora_fin") {
      const horaInicio = horario[dia][idx].hora_inicio;
      if (horaInicio && !esHoraMayor(valor, horaInicio)) {
        Toast.show({
          type: "error",
          text1: "Error de horario",
          text2: "La hora fin debe ser mayor que la hora inicio.",
        });
        return;
      }
    }
    // Si se está editando la hora_inicio, comprobar que hora_fin (si existe) sea mayor
    if (campo === "hora_inicio") {
      const horaFin = horario[dia][idx].hora_fin;
      if (horaFin && !esHoraMayor(horaFin, valor)) {
        Toast.show({
          type: "error",
          text1: "Error de horario",
          text2: "La hora inicio debe ser menor que la hora fin.",
        });
        return;
      }
    }

    setHorario((prev) => ({
      ...prev,
      [dia]: prev[dia].map((tramo, i) =>
        i === idx ? { ...tramo, [campo]: valor } : tramo
      ),
    }));
  };

  const handleRemoveTramo = (dia: string, idx: number) => {
    console.log(`Eliminando tramo: ${dia}, idx: ${idx}`);
    setHorario((prev) => ({
      ...prev,
      [dia]: prev[dia].filter((_, i) => i !== idx),
    }));
  };

  // Al pulsar input, abre picker
  const openPicker = (
    dia: string,
    idx: number,
    campo: "hora_inicio" | "hora_fin",
    value: string
  ) => {
    // Asegura que value siempre tiene formato HH:mm:ss o HH:mm
    let [h, m] = value ? value.split(":").map(Number) : [0, 0];
    h = isNaN(h) ? 0 : h;
    m = isNaN(m) ? 0 : m;
    setPickerTarget({ dia, idx, campo });
    setPickerVisible(true);

    setTimeout(() => {
      timerPickerRef.current?.setValue(
        { days: 0, hours: h, minutes: m, seconds: 0 },
        { animated: false }
      );
    }, 0);
  };

  // Al confirmar picker
  const onConfirmPicker = ({
    hours,
    minutes,
  }: {
    hours: number;
    minutes: number;
  }) => {
    if (pickerTarget) {
      const hora = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:00`;
      handleChangeTramo(
        pickerTarget.dia,
        pickerTarget.idx,
        pickerTarget.campo,
        hora
      );
    }
    setPickerVisible(false);
    setPickerTarget(null);
  };

  // Paso 1: Datos básicos
  const renderStep1 = () => (
    <View className="gap-y-4">
      <ThemedText type="h2" className="text-center mb-2">
        {isEdit ? "Editar empleado" : "Nuevo empleado"}
      </ThemedText>
      {error ? (
        <ThemedText className="text-red-500 text-center">{error}</ThemedText>
      ) : null}
      <ThemedTextInput
        placeholder="Nombre"
        value={form.name}
        onChangeText={(v) => setForm({ ...form, name: v })}
      />
      <ThemedTextInput
        placeholder="Email"
        value={form.email}
        onChangeText={(v) => setForm({ ...form, email: v })}
        keyboardType="email-address"
      />
      <ThemedTextInput
        placeholder="Teléfono"
        value={form.phone}
        onChangeText={(v) => setForm({ ...form, phone: v })}
        keyboardType="phone-pad"
      />
      <Picker
        selectedValue={form.disponible}
        onValueChange={(value, index) => {
          setForm({ ...form, disponible: value });
        }}
        style={
          // Platform.OS === "web"
          /* ? */ {
            height: 60,
            width: 180,
            backgroundColor: "transparent",
          }

          // : { height: 50, width: 155 }
        }
        mode="dropdown"
        dropdownIconColor={Platform.OS === "web" ? "black" : "black"}
      >
        <Picker.Item color="green" label="Disponible" value={true} />
        <Picker.Item
          // si es modo claro, negro, si no, blanco
          color="red"
          label="No disponible"
          value={false}
        />
        {/* <Picker.Item label="Ausente" value={ESTADO_CITA.NO_PRESENTADO} /> */}
      </Picker>
      <ThemedButton
        background="secondary"
        className="mt-4"
        onPress={async () => {
          // Validación antes de pasar al siguiente paso
          if (!form.name || !form.email || !form.phone) {
            setError("Nombre, email y teléfono no pueden estar vacíos");
            return;
          }
          if (
            !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(form.email)
          ) {
            setError("Email no es válido");
            return;
          }
          if (!/^\+\d{6,15}$/.test(form.phone)) {
            setError(
              "Teléfono no es válido. Debe empezar con '+' y tener entre 6 y 15 dígitos."
            );
            return;
          }
          setError("");
          setStep(2);
        }}
        disabled={loading}
      >
        <ThemedText>Siguiente</ThemedText>
      </ThemedButton>
    </View>
  );

  // Paso 2: Horario
  const renderStep2 = () => (
    <>
      <ScrollView className="gap-y-4 max-h-[70vh] w-full p-6">
        <ThemedText textBlack type="h2" className="text-center mb-2">
          Horario del empleado
        </ThemedText>
        {diasSemana.map((dia) => (
          <View key={dia} className="mb-4">
            <View className="flex-row items-center justify-between mb-1">
              <ThemedText textBlack className="font-bold">
                {dia}
              </ThemedText>
              <Pressable
                className="bg-blue-200 px-2 py-1 rounded"
                onPress={() => handleAddTramo(dia)}
              >
                <Ionicons name="add-outline" size={18} />
              </Pressable>
            </View>
            {(horario[dia] || []).map((tramo, idx) => (
              <View key={idx} className="flex-row items-center gap-x-2 mb-1">
                <Pressable
                  onPress={() =>
                    openPicker(dia, idx, "hora_inicio", tramo.hora_inicio)
                  }
                  className={`border rounded p-2 w-24 bg-white justify-center ${
                    tramo.hora_fin ? "" : "opacity-50"
                  }`}
                >
                  <ThemedText textBlack>
                    {tramo.hora_inicio
                      ? tramo.hora_inicio.slice(0, 5)
                      : "Inicio"}
                  </ThemedText>
                </Pressable>
                <Pressable
                  onPress={() =>
                    openPicker(dia, idx, "hora_fin", tramo.hora_fin)
                  }
                  className={`border rounded p-2 w-24 bg-white justify-center ${
                    tramo.hora_fin ? "" : "opacity-50"
                  }`}
                >
                  <ThemedText textBlack>
                    {tramo.hora_fin ? tramo.hora_fin.slice(0, 5) : "Fin"}
                  </ThemedText>
                </Pressable>
                <Pressable
                  className="ml-2"
                  onPress={() => handleRemoveTramo(dia, idx)}
                >
                  <Ionicons name="trash-outline" size={20} color="#f00" />
                </Pressable>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      <ThemedButton
        className="mt-4 bg-dark-secondary"
        onPress={async () => {
          await onSaveUser({ ...form, horario });
          setStep(1);
          onClose();
        }}
        disabled={loading}
      >
        <ThemedText>Guardar</ThemedText>
      </ThemedButton>
      <ThemedButton className="mt-2 bg-dark-primary" onPress={() => setStep(1)}>
        <ThemedText>Volver</ThemedText>
      </ThemedButton>
    </>
  );

  if (!visible) return null;

  return (
    <ThemedModalGeneral visible={visible} onClose={onClose}>
      <View className="w-[95%]">
        {step === 1 ? renderStep1() : renderStep2()}
      </View>
      {/* TimerPicker modal */}
      {pickerVisible && (
        <TimerPickerModal
          ref={timerPickerRef}
          visible={pickerVisible}
          setIsVisible={setPickerVisible}
          onConfirm={onConfirmPicker}
          onCancel={() => setPickerVisible(false)}
          hideDays
          hideSeconds
          minutesPickerIsDisabled={true}
          // hours={pickerValue.hours}
          // minutes={pickerValue.minutes}
          // theme="light"
          modalTitle="Selecciona hora"
        />
      )}
    </ThemedModalGeneral>
  );
}
