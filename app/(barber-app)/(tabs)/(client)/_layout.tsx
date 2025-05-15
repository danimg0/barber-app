import { Stack } from "expo-router";
import React from "react";

export default function ClientLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "#121212",
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Cliente",
        }}
      />
      {/* Otras pantallas específicas del cliente */}
      <Stack.Screen
        name="reservar"
        options={{
          title: "Reservar cita",
        }}
      />
      <Stack.Screen
        name="/ver-citas"
        options={{
          title: "Ver citas",
        }}
      />
    </Stack>
  );
}
