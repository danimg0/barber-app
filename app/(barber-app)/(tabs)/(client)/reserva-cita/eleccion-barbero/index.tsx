import ThemedButton from "@/components/ThemedComponents/ThemedButton";
import ThemedText from "@/components/ThemedComponents/ThemedText";
import { ThemedView } from "@/components/ThemedComponents/ThemedView";
import { BarberoConHorario } from "@/core/entities/barbero.entitie";
import { mapBarberosDBToBarberoEleccion } from "@/core/mappers/barbero.mapper";
import { useBarberos } from "@/hooks/barberos/useBarberos";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Platform, ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";
import BarberoCard from "../../../../../../components/BarberoCard";

const EleccionBarberoScreen = () => {
  const [barberoSeleccionado, setBarberoSeleccionado] = useState<number | null>(
    null
  );
  const { barberosConHorarioQuery } = useBarberos(
    mapBarberosDBToBarberoEleccion
  );

  if (barberosConHorarioQuery.isLoading) {
    return (
      <ThemedView className="items-center justify-center">
        <ActivityIndicator />
      </ThemedView>
    );
  }
  // console.log("barberos con horario:", barberosConHorarioQuery.data);

  const eleccion = (barbero: any) => {
    if (!barbero.disponible) {
      Toast.show({
        type: "error",
        text1: "Barbero no disponible",
        text2: `${barbero.nombre} no está disponible actualmente. Selecciona otro por favor.`,
      });
      return;
    }

    if (barbero.id === barberoSeleccionado) {
      setBarberoSeleccionado(null);
      return;
    }

    setBarberoSeleccionado(barbero.id);
  };

  return (
    <ThemedView className="items-center w-full">
      <ThemedText type="h2">Elige tu peluquero</ThemedText>
      {/* disponible / no disponible */}
      <View className={"mt-8 flex flex-row gap-x-16"}>
        <View className={"flex flex-row items-center justify-around gap-x-4"}>
          <Ionicons name="checkmark-circle-sharp" size={20} color="green" />
          <ThemedText>Disponible</ThemedText>
        </View>
        <View className={"flex flex-row items-center justify-around gap-x-4"}>
          <Ionicons name="close-circle" size={20} color="red" />
          <ThemedText>No disponible</ThemedText>
        </View>
      </View>

      <View
        className={`bg-gray-600 my-8 min-h-[45%] h-[65%] max-h-[65%] rounded-3xl ${
          Platform.OS === "web" ? "w-[90%] lg:w-[40%]" : "w-[90%]"
        } shadow-lg`}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ alignItems: "center" }}
        >
          {barberosConHorarioQuery.data.map((barbero: BarberoConHorario) => (
            <BarberoCard
              className="w-[90%]"
              seleccionado={barbero.id === barberoSeleccionado}
              key={barbero.id}
              disponible={barbero.disponible}
              foto={barbero.foto}
              nombre={barbero.nombre}
              onPress={() => eleccion(barbero)}
            />
          ))}
        </ScrollView>
      </View>

      {/* boton continuar */}
      <ThemedButton
        elevation={!barberoSeleccionado ? 0 : 5}
        icon="arrow-forward"
        border
        className={` absolute bottom-10 ${
          !barberoSeleccionado ? "bg-gray-500" : "bg-light-secondary"
        }`}
        disabled={barberoSeleccionado == null}
        onPress={() =>
          router.replace({
            pathname: "/reserva-cita/eleccion-cita",
            params: { barberoId: barberoSeleccionado },
          })
        }
      >
        <ThemedText>Continuar</ThemedText>
      </ThemedButton>
    </ThemedView>
  );
};

export default EleccionBarberoScreen;
