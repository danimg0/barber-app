import useAuthStore from "@/app/auth/store/useAuthStore";
import { ThemedView } from "@/components/ThemedComponents/ThemedView";
import { ROLE } from "@/constants/Rols";
import { Stack } from "expo-router";
import React from "react";
import { Text } from "react-native";

export default function BarberLayout() {
  const { user } = useAuthStore();
  if (user?.rol !== ROLE.ADMIN && user?.rol !== ROLE.EMPLEADO) {
    console.log("rol:", user?.rol);
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
