//Rederigir a citas del tiron, sin nada de reserva completada, pero si mostrar un alert o un snackbar diciendo que todo perfe

import useAuthStore from "@/app/auth/store/useAuthStore";
import CitaCard from "@/components/CitaCard";
import ThemedButton from "@/components/ThemedComponents/ThemedButton";
import ThemedText from "@/components/ThemedComponents/ThemedText";
import { ThemedView } from "@/components/ThemedComponents/ThemedView";
import Colors from "@/constants/Colors";
import { ROLE } from "@/constants/Rols";
import { CitaUsuarioEntitie } from "@/core/entities/cita.entitie";
import { useCita } from "@/hooks/citas/useCita";
import { SecureStorageAdapter } from "@/utils/helpers/adapters/secure-storage.adaptar";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Platform, Text, View } from "react-native";

const ConfirmacionReservaScreen = () => {
  const [cita, setCita] = useState<CitaUsuarioEntitie>();
  const { user } = useAuthStore();

  //Se envia 0 para indicar que es para crear una nueva cita
  const { citaMutation } = useCita(0);

  useEffect(() => {
    const loadCita = async () => {
      try {
        const citaString = await SecureStorageAdapter.getItem(
          "citaActualEmpleado"
        );
        if (citaString) {
          setCita(JSON.parse(citaString));
          console.log(`Cita en useState: ${JSON.stringify(cita)}`);
        }
      } catch (error) {
        Alert.alert("Error", "No se pudo cargar la cita");
        router.back();
      }
    };

    loadCita();
  }, []);

  if (!cita) {
    return (
      <ThemedView>
        <Text>No existe cita</Text>
      </ThemedView>
    );
  }

  const handleSubmit = () => {
    citaMutation.mutate(cita, {
      onSuccess: () => {
        if (user?.rol === ROLE.ADMIN) {
          router.replace("/ver-citas-admin");
        } else if (user?.rol === ROLE.EMPLEADO) {
          router.replace("/ver-citas");
        }
      },
      //Dejar este y quitar el de useCitas
      onError: (error) => {
        Alert.alert("Error", "No se pudo guardar la cita");
      },
    });
  };

  const handleCancel = () => {
    SecureStorageAdapter.deleteItem("citaActual");
    router.replace("/");
  };

  //TODO: añadir boton de cancelar cita
  return (
    <ThemedView className="items-center">
      <View
        className={`mb-10 flex-1 items-center justify-around 
      ${Platform.OS === "web" ? "w-full lg:w-[40%] p-4" : "w-[80%]"}
      `}
      >
        <ThemedText type="h2" className="">
          Confirmar reserva
        </ThemedText>
        <CitaCard confirmacion cita={cita} />
        <View className="flex flex-row gap-x-8">
          <ThemedButton
            onPress={handleCancel}
            icon="close-circle-outline"
            border
            className="border-dark-primary"
            iconColor={Colors.dark.primary}
            disabled={citaMutation.isPending}
          >
            <ThemedText className="text-dark-primary">
              Cancelar reserva
            </ThemedText>
          </ThemedButton>
          <ThemedButton
            onPress={handleSubmit}
            icon="bookmark-outline"
            background="secondary"
            iconColor="white"
            disabled={citaMutation.isPending}
          >
            {citaMutation.isPending ? (
              <ActivityIndicator />
            ) : (
              <ThemedText>Finalizar reserva</ThemedText>
            )}
          </ThemedButton>
        </View>
      </View>
    </ThemedView>
  );
};

export default ConfirmacionReservaScreen;
