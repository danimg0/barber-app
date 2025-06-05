import useAuthStore from "@/app/auth/store/useAuthStore";
import ThemedButton from "@/components/ThemedComponents/ThemedButton";
import ThemedText from "@/components/ThemedComponents/ThemedText";
import { ThemedView } from "@/components/ThemedComponents/ThemedView";
import { ROLE } from "@/constants/Rols";
import { router, Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function ClientLayout() {
  const { user } = useAuthStore();

  const handleRedirect = () => {
    if (user?.rol === ROLE.ADMIN) {
      // Redirigir al panel de administración
      router.replace("/(barber-app)/(tabs)/(admin)");
    } else if (user?.rol === ROLE.EMPLEADO) {
      // Redirigir al menú principal
      router.replace("/(barber-app)/(tabs)/(barber)");
    } else if (user?.rol === ROLE.CLIENTE) {
      // Redirigir al menú principal
      router.replace("/(barber-app)/(tabs)/(client)");
    } else {
      // Redirigir al menú principal por defecto
      router.replace("/");
    }
  };

  if (user?.rol !== ROLE.CLIENTE) {
    return (
      <ThemedView className="items-center justify-center">
        <View className="bg-white p-8 rounded-lg elevation-lg flex items-center justify-center">
          <ThemedText textBlack>Acceso no autorizado</ThemedText>
          <ThemedButton background="primary" className="mt-4">
            <ThemedText onPress={handleRedirect}>
              Volver al menu principal
            </ThemedText>
          </ThemedButton>
        </View>
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
