import ThemedButton from "@/components/ThemedComponents/ThemedButton";
import { ThemedDatePicker } from "@/components/ThemedComponents/ThemedDateInput";
import ThemedDropdown from "@/components/ThemedComponents/ThemedDropdown";
import ThemedMultiselect from "@/components/ThemedComponents/ThemedMultiselect";
import ThemedText from "@/components/ThemedComponents/ThemedText";
import ThemedTextInput from "@/components/ThemedComponents/ThemedTextInput";
import { ThemedView } from "@/components/ThemedComponents/ThemedView";
import { router } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { KeyboardAvoidingView, View } from "react-native";

const CrearCitaEmpleadoScreen = () => {
  const validate = (values: {
    nombreCliente: string;
    telefonoCliente: string;
    fecha: string;
    hora: string;
    servicios: string[];
  }) => {
    const errors: Partial<typeof values> = {};
    if (!values.nombreCliente)
      errors.nombreCliente = "Se requiere nombre cliente";
    if (!values.telefonoCliente)
      errors.telefonoCliente = "Se requiere telefono del cliente";
    if (!values.fecha) errors.fecha = "Se requiere fecha";
    if (!values.hora) errors.hora = "Se requiere hora";
    if (!values.servicios || values.servicios.length === 0) {
      errors.servicios = ["Se requiere al menos un servicio"];
    }
    return errors;
  };

  return (
    <ThemedView className="items-center">
      <ThemedText type="h2">Crear reserva</ThemedText>
      <Formik
        initialValues={{
          nombreCliente: "",
          telefonoCliente: "",
          fecha: "",
          hora: "",
          servicios: [],
        }}
        onSubmit={() => {}}
        validate={validate}
      >
        {({
          values,
          handleSubmit,
          handleChange,
          setFieldValue,
          isValid,
          dirty,
        }) => {
          return (
            <KeyboardAvoidingView className="flex-1">
              <View className="flex-1 w-[80%] items-center gap-y-5 mt-8">
                {/* nombre cliente */}
                <ThemedTextInput
                  icon="person-outline"
                  placeholder="Nombre y apellidos del cliente"
                ></ThemedTextInput>
                {/* telefono cliente */}
                <ThemedTextInput
                  icon="call-outline"
                  placeholder="Telefono del cliente"
                ></ThemedTextInput>
                {/* fecha cita */}
                <ThemedDatePicker
                  onChange={() => {}}
                  value=""
                  placeholder="Fecha de la cita"
                  className="w-[88%]"
                />
                {/* servicios cita */}
                <ThemedMultiselect
                  elementosDespegables={[]}
                  icon="cut-outline"
                  labelField=""
                  onChange={() => {}}
                  placeholder="Servicios"
                  value={[]}
                  valueField=""
                />
                {/* hora cita */}
                <ThemedDropdown
                  elementosDespegables={[]}
                  icon="time-outline"
                  labelField=""
                  onChange={() => {}}
                  placeholder="Horas disponibles"
                  value={""}
                  valueField=""
                  data={[]}
                />
                <ThemedButton
                  elevation={!(isValid && dirty) ? 0 : 5}
                  icon="arrow-forward"
                  border
                  className={` absolute bottom-10 ${
                    !(isValid && dirty) ? "bg-gray-500" : "bg-light-primary"
                  }`}
                  disabled={!(isValid && dirty)}
                  onPress={() => {
                    if (isValid && dirty) handleSubmit();
                    router.replace("/reserva-cita/confirmacion-reserva");
                  }}
                >
                  <ThemedText>Continuar</ThemedText>
                </ThemedButton>
              </View>
            </KeyboardAvoidingView>
          );
        }}
      </Formik>
    </ThemedView>
  );
};

export default CrearCitaEmpleadoScreen;
