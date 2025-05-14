import React from "react";
import { FlatList, Image, View } from "react-native";
import ThemedButton from "./ThemedComponents/ThemedButton";
import ThemedText from "./ThemedComponents/ThemedText";

//TODO: CAMBIAR EL INTERFACE CITA DE SITIO
export interface Cita {
  id: number;
  peluquero: string;
  fecha: string;
  hora: string;
  servicios: string[];
  foto_peluquero: string;
  estado: string;
}

interface Props {
  cita: Cita;
}

const CitaCard = ({ cita }: Props) => {
  return (
    <View className="bg-blue-300 p-3 rounded-lg w-full mt-5">
      {/* Header */}
      <View className="flex flex-row gap-x-3 items-center">
        <Image
          source={{ uri: cita.foto_peluquero }}
          className="w-16 h-16 rounded-full"
        />
        <ThemedText textBlack>Cita con {cita.peluquero}</ThemedText>
      </View>
      {/* Fecha / hora */}
      <View className="mt-3 ml-3">
        <ThemedText textBlack>Fecha: {cita.fecha}</ThemedText>
        <ThemedText textBlack>Hora: {cita.hora}</ThemedText>
      </View>
      {/* Servicios */}
      <View className="mt-5 ml-3">
        <ThemedText className="text-gray-700">
          Servicios seleccionados
        </ThemedText>
        <FlatList
          data={cita.servicios}
          keyExtractor={(i) => i}
          renderItem={(servicio) => (
            <View className="ml-2">
              <ThemedText className="text-gray-700">{`\u2023 ${servicio.item}`}</ThemedText>
            </View>
          )}
        />
      </View>
      {cita.estado === "terminada" ? (
        <View className="flex flex-row justify-end">
          <ThemedButton className="w-fit p-2 bg-gray-500" disabled>
            <ThemedText className="text-gray-300" textBlack>
              Terminada
            </ThemedText>
          </ThemedButton>
        </View>
      ) : (
        <View className="flex flex-row justify-end">
          {/* //TODO: On press abrir ThemedModal */}
          <ThemedButton
            className="w-fit p-2"
            elevation={10}
            // border
            background="primary"
            icon="close-outline"
            iconColor="black"
          >
            <ThemedText textBlack>Cancelar cita</ThemedText>
          </ThemedButton>
        </View>
      )}
    </View>
  );
};

export default CitaCard;
