import useAuthStore from "@/app/auth/store/useAuthStore";
import CitaCardEmpleado from "@/components/CitaCardEmpleado";
import { ThemedDatePicker } from "@/components/ThemedComponents/ThemedDateInput";
import ThemedDropdown from "@/components/ThemedComponents/ThemedDropdown";
import ThemedText from "@/components/ThemedComponents/ThemedText";
import { ThemedView } from "@/components/ThemedComponents/ThemedView";
import Colors from "@/constants/Colors";
import { ESTADO_CITA } from "@/constants/EstadoCita";
import { ROLE } from "@/constants/Rols";
import { useCitas } from "@/hooks/citas/useCitas";
import { agruparCitas } from "@/utils/helpers/agruparCitas";
import {
  parseFechaIngToEsp,
  parseFechaStrEspToIng,
} from "@/utils/helpers/parseFecha";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ActivityIndicator, SectionList, View } from "react-native";

const CrearCitaScreen = () => {
  const { user } = useAuthStore();
  const [filtroInputs, setFiltroInputs] = useState({
    fecha: "",
    estado: "1",
  });
  const { citasQueryEmpleado } = useCitas({
    fecha: parseFechaStrEspToIng(filtroInputs.fecha),
    estado: parseInt(filtroInputs.estado),
  });
  const citasAgrupadas = agruparCitas(citasQueryEmpleado.data?.pages[0] ?? []);

  const handleChange = (name: string, value: string) => {
    setFiltroInputs({ ...filtroInputs, [name]: value });
    if (name === "estado") {
      console.log("estado:", value);
    }
  };

  if (user?.rol !== ROLE.ADMIN && user?.rol !== ROLE.EMPLEADO) {
    console.log("rol:", user?.rol);

    return null;
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
            dropdownPosition="bottom"
            elementosDespegables={[
              { label: "Cancelada", value: ESTADO_CITA.CANCELADA },
              { label: "Pendiente", value: ESTADO_CITA.PENDIENTE },
              { label: "Completada", value: ESTADO_CITA.COMPLETADA },
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
                  selected && "bg-dark-secondary"
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
        <View className="w-full px-8">
          {citasAgrupadas.length === 0 ? (
            <View className="flex mt-48 items-center justify-center">
              <ThemedText>No ha citas para mostrar</ThemedText>
            </View>
          ) : (
            <SectionList
              sections={citasAgrupadas}
              keyExtractor={(item, index) => item.id.toString()}
              renderSectionHeader={({ section: { title } }) => (
                <ThemedText type="h3" className="text-center mt-6 text-white">
                  {title} -{" "}
                  {citasAgrupadas
                    .find((section) => section.title === title)
                    ?.data.length.toString() ?? ""}{" "}
                  citas
                </ThemedText>
              )}
              renderItem={({ item }) => (
                <CitaCardEmpleado
                  id={item.id}
                  estado={
                    item.estado.tipo.charAt(0).toUpperCase() +
                    item.estado.tipo.slice(1)
                  }
                  hora={item.horaInicio.replace(/:00$/, "")}
                  nombre={item.cliente.nombre}
                  servicios={item.servicios.map((ser) => ser.nombre)}
                  telefono={item.cliente.telefono ?? ""} //todo: const enum con los tlf, poner tlf del admin
                />
              )}
            />
          )}
        </View>
      )}
    </ThemedView>
  );
};

export default CrearCitaScreen;
