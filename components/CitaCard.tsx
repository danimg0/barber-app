import { CitaUsuarioEntitie } from "@/core/entities/cita.entitie";
import { useCita } from "@/hooks/citas/useCita";
import { useServicios } from "@/hooks/servicios/useServicios";
import React, { useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import ThemedButton from "./ThemedComponents/ThemedButton";
import ThemedDeleteModal from "./ThemedComponents/ThemedDeleteModal";
import ThemedText from "./ThemedComponents/ThemedText";
import { ThemedView } from "./ThemedComponents/ThemedView";

interface Props {
  cita: CitaUsuarioEntitie;
  confirmacion?: boolean;
}

const CitaCard = ({ cita, confirmacion }: Props) => {
  const [abrirModal, setAbrirModal] = useState(false);
  const { serviciosQuery } = useServicios();
  const { data } = serviciosQuery;
  const serviciosSeleccionados: string[] = [];
  const { deleteCitaMutation } = useCita(cita.idCita);

  // console.log("fecha recibida en card", cita.fechaCita);

  // const serviciosPrueba = data
  //   //Me quedo solo con los servicios que hay
  //   ?.filter((servicio) => cita.servicios.includes(servicio.id))
  //   //Me quedo solo con los nombres
  //   .map((servicio) => servicio.nombre);

  // console.log("serviciosPrueba", serviciosPrueba);

  //guarrada historica
  //@ts-expect-error
  if (isNaN(cita.servicios[0])) {
    cita.servicios.map((servicio) => {
      serviciosSeleccionados.push(servicio.nombre);
    });
  } else {
    data?.forEach((servicio) => {
      //@ts-expect-error
      if (cita.servicios.includes(servicio.id)) {
        serviciosSeleccionados.push(servicio.nombre);
      }
    });
  }

  if (!serviciosSeleccionados)
    return (
      <ThemedView>
        <Text>No existe usuario</Text>
      </ThemedView>
    );

  return (
    <View className="bg-blue-300 p-3 rounded-lg w-full mt-5">
      {/* Header */}
      <View className="flex flex-row gap-x-3 items-center">
        <Image
          source={{ uri: cita.fotoPerfil }}
          className="w-16 h-16 rounded-full"
        />
        <ThemedText textBlack>Cita con {cita.nombreBarbero}</ThemedText>
      </View>
      {cita.nombreCliente && cita.telefono ? (
        <View className="mt-3 ml-3">
          <ThemedText textBlack>Cliente: {cita.nombreCliente}</ThemedText>
          <ThemedText textBlack>Telefono: {cita.telefono}</ThemedText>
        </View>
      ) : null}
      {/* Fecha / hora */}
      <View className="mt-3 ml-3">
        <ThemedText textBlack>
          Fecha: {cita.fechaCita.toString().split("-").reverse().join("/")}
        </ThemedText>
        <ThemedText textBlack>Hora: {cita.horaInicio.slice(0, 5)}</ThemedText>
      </View>
      {/* Servicios */}
      <View className="mt-5 ml-3">
        <ThemedText className="text-gray-700">
          Servicios seleccionados
        </ThemedText>
        <FlatList
          data={serviciosSeleccionados}
          keyExtractor={(i) => i}
          renderItem={(servicio) => (
            <View className="ml-2">
              <ThemedText className="text-gray-700">{`\u2023 ${servicio.item}`}</ThemedText>
            </View>
          )}
        />
      </View>
      <ThemedDeleteModal
        visible={abrirModal}
        textBody="¿Seguro que quieres cancelar tu cita? Esta acción es irreversible?"
        loading={deleteCitaMutation.isPending}
        onConfirm={() => {
          deleteCitaMutation.mutate(cita.idCita);
          if (deleteCitaMutation.isSuccess) {
            setAbrirModal(false);
          }
        }}
        onClose={() => setAbrirModal(false)}
      />
      {!confirmacion &&
        //TODO: Hacer el tipado para los estados
        (cita.tipoEstado === "terminada" ? (
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
              onPress={() => {
                setAbrirModal(true);
              }}
            >
              <ThemedText textBlack>Cancelar cita</ThemedText>
            </ThemedButton>
          </View>
        ))}
    </View>
  );
};

export default CitaCard;
