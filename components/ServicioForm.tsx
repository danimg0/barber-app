import ThemedButton from "@/components/ThemedComponents/ThemedButton";
import ThemedText from "@/components/ThemedComponents/ThemedText";
import ThemedTextInput from "@/components/ThemedComponents/ThemedTextInput";
import { Formik } from "formik";
import React from "react";
import { View } from "react-native";

interface ServicioFormProps {
  initialValues?: {
    nombre: string;
    descripcion: string;
    precio: number | string;
    duracion: number | string;
  };
  onSubmit: (values: any) => void;
  submitText?: string;
}

function validate(values: any) {
  const errors: any = {};
  if (!values.nombre) errors.nombre = "El nombre es obligatorio";
  if (!values.descripcion) errors.descripcion = "La descripción es obligatoria";
  if (values.precio === "" || values.precio === undefined) {
    errors.precio = "El precio es obligatorio";
  } else if (isNaN(Number(values.precio))) {
    errors.precio = "Debe ser un número";
  } else if (Number(values.precio) < 0) {
    errors.precio = "No puede ser negativo";
  }
  if (values.duracion === "" || values.duracion === undefined) {
    errors.duracion = "La duración es obligatoria";
  } else if (isNaN(Number(values.duracion))) {
    errors.duracion = "Debe ser un número";
  } else if (Number(values.duracion) < 1) {
    errors.duracion = "Debe ser mayor que 0";
  }
  return errors;
}

const ServicioForm: React.FC<ServicioFormProps> = ({
  initialValues = {
    nombre: "",
    descripcion: "",
    precio: "",
    duracion: "",
  },
  onSubmit,
  submitText = "Guardar servicio",
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isSubmitting,
      }) => (
        <View className="gap-y-4 w-full">
          <ThemedText type="h2" className="mb-4 text-center">
            {initialValues?.nombre ? "Editar servicio" : "Crear servicio"}
          </ThemedText>
          <View>
            <ThemedText className={"text-sm p-0"}>Nombre</ThemedText>
            <ThemedTextInput
              placeholder="Nombre del servicio"
              value={values.nombre}
              onChangeText={handleChange("nombre")}
              onBlur={handleBlur("nombre")}
              errorText={
                touched.nombre && errors.nombre ? errors.nombre : undefined
              }
            />
          </View>
          <View className="w-full">
            <ThemedText className={"text-sm p-0"}>Descripción</ThemedText>
            <ThemedTextInput
              placeholder="Descripción"
              value={values.descripcion}
              onChangeText={handleChange("descripcion")}
              onBlur={handleBlur("descripcion")}
              errorText={
                touched.descripcion && errors.descripcion
                  ? errors.descripcion
                  : undefined
              }
              multiline
              numberOfLines={3}
            />
          </View>
          <View className="w-full">
            <ThemedText className={"text-sm p-0"}>Precio</ThemedText>
            <ThemedTextInput
              placeholder="Precio (€)"
              value={String(values.precio)}
              onChangeText={handleChange("precio")}
              onBlur={handleBlur("precio")}
              keyboardType="numeric"
              errorText={
                touched.precio && errors.precio ? errors.precio : undefined
              }
            />
          </View>
          <View className="w-full">
            <ThemedText className={"text-sm p-0"}>
              Duracion (minutos)
            </ThemedText>
            <ThemedTextInput
              placeholder="Duración (minutos)"
              value={String(values.duracion)}
              onChangeText={handleChange("duracion")}
              onBlur={handleBlur("duracion")}
              keyboardType="numeric"
              errorText={
                touched.duracion && errors.duracion
                  ? errors.duracion
                  : undefined
              }
            />
          </View>

          <ThemedButton
            border
            background="secondary"
            onPress={() => handleSubmit()}
            disabled={isSubmitting}
            className="mt-4"
          >
            <ThemedText>{submitText}</ThemedText>
          </ThemedButton>
        </View>
      )}
    </Formik>
  );
};

export default ServicioForm;
