import { Redirect, Stack, useSegments } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import useAuthStore from "../auth/store/useAuthStore";

//LAYOUT DE REDIRECCION

export default function CheckAuthLayout() {
  const { status, user } = useAuthStore();
  const rol = user?.rol;
  const segments = useSegments(); // ej: ["(barber-app)", "(drawer)", "(admin)"]

  // 1) Estado de carga
  if (status === "checking") {
    // console.log("DEBUG layout principal de barber app cargado");
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#FF5656" />
      </View>
    );
  }

  // 2) Si no está autenticado
  if (status === "unauthenticated") {
    return <Redirect href="/auth/login" />;
  }

  // 3) Determinar si estamos en el drawer y cuál es el grupo de rol actual
  // const isInDrawer = segments[1] === "(drawer)";
  // const currentRoleGroupInDrawer = isInDrawer ? segments[2] : null; // ej: "(admin)", "(barber)", o "(client)" si está en el drawer

  // 4) Redirige según rol, sólo si NO estás ya en el grupo de rol correcto DENTRO del drawer
  // if (status === "authenticated") {
  // }

  // 5) Ya estamos en la ruta/grupo correcto o no se necesita redirección → renderiza el stack
  // Esto permitirá que se renderice el layout de (drawer) o cualquier otra ruta hija.
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
