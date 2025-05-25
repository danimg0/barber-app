//stack para la reserva de citas
import { Stack } from "expo-router";
import React from "react";

const ReservaClienteLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="eleccion-barbero"
        options={{
          title: "Elige tu barbero",
        }}
      />
      <Stack.Screen
        name="eleccion-cita"
        options={{
          title: "Selecciona tu cita",
        }}
      />
      <Stack.Screen
        name="confirmacion-reserva"
        options={{
          title: "Reserva finalizada",
        }}
      />
      <Stack.Screen
        name="final-reserva"
        options={{
          title: "Reserva finalizada",
        }}
      />
    </Stack>
  );
};

export default ReservaClienteLayout;
