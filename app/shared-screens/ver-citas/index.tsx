import useAuthStore from "@/app/auth/store/useAuthStore";
import CitaCardEmpleado from "@/components/CitaCardEmpleado";
import { ThemedDatePicker } from "@/components/ThemedComponents/ThemedDateInput";
import ThemedDropdown from "@/components/ThemedComponents/ThemedDropdown";
import ThemedText from "@/components/ThemedComponents/ThemedText";
import { ThemedView } from "@/components/ThemedComponents/ThemedView";
import Colors from "@/constants/Colors";
import { ESTADO_CITA, mapEstadoCitaStrToNumber } from "@/constants/EstadoCita";
import { MAIN_PELUQUERO } from "@/constants/PhoneNumbers";
import { useCitas } from "@/hooks/citas/useCitas";
import { agruparCitas } from "@/utils/helpers/agruparCitas";
import {
  parseFechaIngToEsp,
  parseFechaStrEspToIng,
} from "@/utils/helpers/parseFecha";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  RefreshControl,
  SectionList,
  Text,
  View,
} from "react-native";

const VerCitasEmpleadoScreen = () => {
  const today = parseFechaIngToEsp(new Date());
  const { user } = useAuthStore();
  const [refreshing, setRefreshing] = useState(false);

  const [filtroInputs, setFiltroInputs] = useState({
    fecha: today,
    estado: "1",
  });
  const { citasQueryEmpleado } = useCitas({
    fecha: parseFechaStrEspToIng(filtroInputs.fecha),
    estado: parseInt(filtroInputs.estado),
  });
  const citasAgrupadas = agruparCitas(
    citasQueryEmpleado.data?.pages.flat() ?? []
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    citasQueryEmpleado.refetch();
  }, [citasQueryEmpleado]);

  useEffect(() => {
    if (!citasQueryEmpleado.isFetching) {
      setRefreshing(false);
    }
  }, [citasQueryEmpleado.isFetching]);

  const handleChange = (name: string, value: string) => {
    setFiltroInputs({ ...filtroInputs, [name]: value });
    if (name === "estado") {
      // console.log("estado:", value);
    }
  };

  if (!user) {
    return (
      <ThemedView>
        <Text>No existe usuario</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView className="items-center">
      <ThemedText type="h2" className="py-4">
        Mis reservas
      </ThemedText>
      <View className="flex flex-row items-start justify-center">
        <View className="mx-4 w-[40%] ">
          <ThemedDatePicker
            onChange={(value) =>
              handleChange("fecha", parseFechaIngToEsp(value))
            }
            value={parseFechaStrEspToIng(filtroInputs.fecha)}
            placeholder="Elija una fecha"
            // inputRef opcional
          />
        </View>
        <View className="w-[40%]">
          <ThemedDropdown
            position="bottom"
            elementosDespegables={[
              { label: "Cancelada", value: ESTADO_CITA.CANCELADA.toString() },
              { label: "Pendiente", value: ESTADO_CITA.PENDIENTE.toString() },
              { label: "Completada", value: ESTADO_CITA.COMPLETADA.toString() },
            ]}
            icon="warning-outline"
            labelField="label"
            onChange={(item) => handleChange("estado", item?.value ?? "")}
            placeholder="Filtrar estado"
            value={filtroInputs.estado}
            valueField="value"
            renderItem={(item, selected) => (
              <View
                key={item.value}
                className={`my-1 overflow-hidden flex flex-row justify-between items-center p-4 mx-2 rounded-lg ${
                  selected ? "bg-dark-secondary" : null
                }`}
              >
                <ThemedText className={!selected ? "text-black" : undefined}>
                  {item.label}
                </ThemedText>
              </View>
            )}
            data={[]}
          />
        </View>
        <Ionicons
          className="p-2"
          name="refresh-circle-outline"
          size={35}
          color={Colors.dark.secondary}
          onPress={() =>
            setFiltroInputs({
              fecha: "",
              estado: "1",
            })
          }
        />
      </View>

      {/* fecha */}
      {citasQueryEmpleado.isLoading ? (
        <View className="flex items-center justify-center">
          <ActivityIndicator />
        </View>
      ) : (
        <View
          className={`${
            Platform.OS === "web" ? "w-[95%] lg:w-[50%]" : "w-[95%]"
          }   px-8 h-[60vh] overflow-auto bg-gray-800 my-5 p-4 rounded-xl`}
        >
          <SectionList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            sections={citasAgrupadas}
            keyExtractor={(item, index) =>
              item.id.toString() ?? Math.random().toString(36).substring(2, 10)
            }
            ListEmptyComponent={
              <View className="flex mt-48 items-center justify-center">
                <ThemedText>No ha citas para mostrar</ThemedText>
              </View>
            }
            renderSectionHeader={({ section: { title } }) => (
              <ThemedText type="h3" className="text-center mt-6 text-white">
                {title} -{" "}
                {citasAgrupadas
                  .find((section) => section.title === title)
                  ?.data.length.toString() ?? ""}{" "}
                citas
              </ThemedText>
            )}
            renderItem={({ item }) => {
              // console.log("estado en index:", item.estado.tipo);

              const estadoMapeado = mapEstadoCitaStrToNumber(item.estado.tipo);
              return (
                <View
                  className={`${
                    Platform.OS === "web" ? "flex items-center" : ""
                  }`}
                >
                  <CitaCardEmpleado
                    // esWeb={Platform.OS === "web"}
                    id={item.id}
                    estado={
                      estadoMapeado
                      // item.estado.tipo.charAt(0).toUpperCase() +
                      // item.estado.tipo.slice(1)
                    }
                    hora={item.horaInicio.replace(/:00$/, "")}
                    nombre={item.cliente.nombre}
                    servicios={item.servicios.map((ser) => ser.nombre)}
                    telefono={item.cliente.telefono ?? MAIN_PELUQUERO}
                  />
                </View>
              );
            }}
          />
        </View>
      )}
    </ThemedView>
  );
};

export default VerCitasEmpleadoScreen;
