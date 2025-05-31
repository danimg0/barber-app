import useAuthStore from "@/app/auth/store/useAuthStore";
import ThemedButton from "@/components/ThemedComponents/ThemedButton";
import ThemedText from "@/components/ThemedComponents/ThemedText";
import { ThemedView } from "@/components/ThemedComponents/ThemedView";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Image,
  useWindowDimensions,
  View,
} from "react-native";

const AdminIndex = () => {
  const { height } = useWindowDimensions();

  const { user } = useAuthStore();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Salir", "Seguro que quieres salir de la aplicación?", [
          {
            text: "Cancelar",
            onPress: () => null,
            style: "cancel",
          },
          { text: "Salir", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [])
  );

  if (!user) {
    return (
      <View>
        <ThemedText>Cargando usuario</ThemedText>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ThemedView className="flex items-center">
      <View style={{ top: height * 0.1 }} className="gap-y-3">
        <Image
          source={{
            uri: "https://i.ibb.co/0j93NJRm/image-removebg-preview-3.png",
          }}
          className="w-48 h-48"
        />
        <ThemedButton
          elevation={5}
          icon="bookmark-outline"
          border
          background="secondary"
          onPress={() =>
            router.replace({
              pathname: "/crear-cita-admin/datos-cita-admin",
              params: { barberoId: user.id },
            })
          }
        >
          <ThemedText>Crear cita</ThemedText>
        </ThemedButton>
        <ThemedButton
          elevation={5}
          icon="search-circle-outline"
          border
          background="primary"
          onPress={() => router.push("/ver-citas-admin")}
        >
          <ThemedText>Ver mis citas</ThemedText>
        </ThemedButton>
        {/* Servicios */}
        <ThemedButton
          elevation={5}
          icon="cut-outline"
          border
          background="secondary"
          onPress={() => router.push("/servicios")}
        >
          <ThemedText>Servicios</ThemedText>
        </ThemedButton>
        {/* Empleados */}
        <ThemedButton
          elevation={5}
          icon="person-outline"
          border
          background="primary"
          onPress={() => router.push("/empleados")}
        >
          <ThemedText>Empleados</ThemedText>
        </ThemedButton>
      </View>
    </ThemedView>
  );
};

export default AdminIndex;
