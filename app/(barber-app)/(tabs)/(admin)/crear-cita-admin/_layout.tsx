import { Stack } from "expo-router";
import React from "react";

const CrearCitaAdminLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="/datos-cita-admin"
        options={{
          title: "Datos cita admin",
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="/confirmacion-cita-admin"
        options={{
          title: "Confirmacion cita admin",
        }}
      ></Stack.Screen>
    </Stack>
  );
};

export default CrearCitaAdminLayout;
