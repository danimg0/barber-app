import CitaCard from "@/components/CitaCard";
import ThemedButton from "@/components/ThemedComponents/ThemedButton";
import ThemedText from "@/components/ThemedComponents/ThemedText";
import { ThemedView } from "@/components/ThemedComponents/ThemedView";
import { CitaUsuarioEntitie } from "@/core/entities/cita.entitie";
import { useCita } from "@/hooks/citas/useCita";
import { SecureStorageAdapter } from "@/utils/helpers/adapters/secure-storage.adaptar";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";

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
        Alert.alert("Error", "No se pudo cargar la cita");
        router.back();
      }
    };

    loadCita();
  }, []);

  if (!cita) {
    return null;
  }

  const handleSubmit = () => {
    citaMutation.mutate(cita, {
      onSuccess: () => {
        router.replace("/reserva-cita/final-reserva");
      },
      onError: (error) => {
        Alert.alert("Error", "No se pudo guardar la cita");
      },
    });
  };

  //TODO: añadir boton de cancelar cita
  return (
    <ThemedView className="items-center justify-center">
      <View className="w-[80%] mb-10 flex items-center">
        <ThemedText type="h2" className="">
          Confirmar reserva
        </ThemedText>
        <CitaCard confirmacion cita={cita} />
        <ThemedButton
          onPress={handleSubmit}
          icon="bookmark-outline"
          background="primary"
          iconColor="black"
          disabled={citaMutation.isPending}
        >
          {citaMutation.isPending ? (
            <ActivityIndicator />
          ) : (
            <ThemedText textBlack>Finalizar reserva</ThemedText>
          )}
        </ThemedButton>
      </View>
    </ThemedView>
  );
};

export default ConfirmacionReservaScreen;
