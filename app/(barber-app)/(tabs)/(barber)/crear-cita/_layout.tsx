import { Stack } from "expo-router";
import React from "react";

const CrearCitaEmpleadoLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="datos-cita"
        options={{
          title: "Datos de la cita",
        }}
      />
      <Stack.Screen
        name="confirmacion-cita"
        options={{ title: "Confirmacion de cita" }}
      />
    </Stack>
  );
};

export default CrearCitaEmpleadoLayout;
