import useAuthStore from "@/app/auth/store/useAuthStore";
import { ThemedView } from "@/components/ThemedComponents/ThemedView";
import { ROLE } from "@/constants/Rols";
import { Stack } from "expo-router";
import React from "react";
import { Text } from "react-native";

export default function ClientLayout() {
  const { user } = useAuthStore();

  if (user?.rol !== ROLE.CLIENTE) {
    console.log("rol NO ADMITIDO:", user?.rol);
    return (
      <ThemedView>
        <Text>Rol no admitido</Text>
      </ThemedView>
    );
  }

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
        name="reserva-cita"
        options={{
          title: "Reservar cita",
        }}
      />
      <Stack.Screen
        name="ver-citas"
        options={{
          title: "Ver citas",
        }}
      />
    </Stack>
  );
}
