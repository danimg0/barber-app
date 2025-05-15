import { Stack } from "expo-router";
import React from "react";

export default function BarberLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#121212",
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Panel de Barbero",
        }}
      />
      {/* Otras pantallas específicas del barbero */}
      <Stack.Screen
        name="reservas"
        options={{
          title: "Mis Citas",
        }}
      />
    </Stack>
  );
}
