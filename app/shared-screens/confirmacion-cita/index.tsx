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
import { ActivityIndicator, Platform, Text, View } from "react-native";
import Toast from "react-native-toast-message";

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
          // console.log(`Cita en useState: ${JSON.stringify(cita)}`);
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Error al cargar la cita",
          text2: "No se pudo recuperar la cita actual.",
        });
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

  // console.log(`Cita en ConfirmacionReservaScreen: ${JSON.stringify(cita)}`);

  // const nuevaCita:CitaUsuarioEntitie = {

  // };

  const handleSubmit = () => {
    citaMutation.mutate(cita, {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Reserva confirmada",
          text2: "Tu cita ha sido confirmada correctamente.",
        });
        if (user?.rol === ROLE.ADMIN) {
          router.replace("/ver-citas-admin");
        } else if (user?.rol === ROLE.EMPLEADO) {
          router.replace("/ver-citas");
        }
      },
      //Dejar este y quitar el de useCitas
      onError: (error) => {
        console.error("Error al confirmar la cita:", error);
        Toast.show({
          type: "error",
          text1: "Error al confirmar la cita",
          text2:
            "No se pudo completar la reserva. Por favor, inténtalo de nuevo más tarde.",
        });
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
