import CitaCard from "@/components/CitaCard";
import ThemedButton from "@/components/ThemedComponents/ThemedButton";
import ThemedText from "@/components/ThemedComponents/ThemedText";
import { ThemedView } from "@/components/ThemedComponents/ThemedView";
import Colors from "@/constants/Colors";
import { CitaUsuarioEntitie } from "@/core/entities/cita.entitie";
import { useCita } from "@/hooks/citas/useCita";
import { SecureStorageAdapter } from "@/utils/helpers/adapters/secure-storage.adaptar";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Platform, Text, View } from "react-native";
import Toast from "react-native-toast-message";

const ConfirmacionReservaScreen = () => {
  const [cita, setCita] = useState<CitaUsuarioEntitie>();
  const { citaMutation } = useCita(cita?.idCita ?? 0);

  useEffect(() => {
    const loadCita = async () => {
      try {
        const citaString = await SecureStorageAdapter.getItem("citaActual");
        if (citaString) {
          setCita(JSON.parse(citaString));
          console.log(`Cita en useState: ${JSON.stringify(cita)}`);
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

  const handleSubmit = () => {
    citaMutation.mutate(cita, {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Reserva confirmada",
          text2: "Tu cita ha sido confirmada correctamente.",
        });
        router.replace("/reserva-cita/final-reserva");
      },
      //Dejar este y quitar el de useCitas
      onError: (error) => {
        console.error("Error al confirmar la cita:", error);
        Toast.show({
          type: "error",
          text1: "Error al confirmar la cita",
          text2:
            "No se pudo confirmar la cita. Por favor, inténtelo de nuevo más tarde.",
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
      ${Platform.OS === "web" ? "w-full px-4 lg:w-[40%]" : "w-[80%]  "}
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
