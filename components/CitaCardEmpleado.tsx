import { ESTADO_CITA } from "@/constants/EstadoCita";
import { useCita } from "@/hooks/citas/useCita";
import { openPhoneCall } from "@/utils/helpers/phonecall-open";
import openWhatsApp from "@/utils/helpers/whatsapp-open";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Platform, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ThemedDeleteModal from "./ThemedComponents/ThemedDeleteModal";
import ThemedText from "./ThemedComponents/ThemedText";
interface Props {
  id: number;
  nombre: string;
  servicios: string[];
  telefono: string;
  hora: string;
  estado: number;
}

const CitaCardEmpleado = ({
  id,
  nombre,
  hora,
  servicios,
  telefono,
  estado,
}: Props) => {
  const [abrirDelete, setAbrirDelete] = useState(false);
  const { deleteCitaMutation, citaMutation } = useCita(id);
  const [selectedEstado, setSelectedEstado] = useState(estado);

  const handleDelCita = () => {
    deleteCitaMutation.mutate(id);
    if (deleteCitaMutation.isSuccess) {
      setAbrirDelete(false);
    } else if (deleteCitaMutation.isError) {
      setAbrirDelete(false);
    }
  };

  const handleUpdateCita = (value: number) => {
    setSelectedEstado(value);
    citaMutation.mutate({
      idCita: id,
      tipoEstado: value,
      // servicios: servicios,
    });
  };

  return (
    //Todo: cambiar este mt-2 por el contentStyle en la flatlist o lo que se haga
    <View
      className={`${
        Platform.OS === "web" ? "w-full lg:w-[80%]" : "w-full"
      } mt-2 `}
    >
      <View className="flex flex-row justify-between items-center">
        <ThemedText type="h3">{hora}</ThemedText>
        <Picker
          selectedValue={selectedEstado}
          onValueChange={(value, index) => {
            handleUpdateCita(value);
          }}
          style={
            // Platform.OS === "web"
            /* ? */ {
              height: 50,
              width: 180,
              color: "white",
              backgroundColor: "transparent",
              borderWidth: 0,
              outline: "none",
              boxShadow: "none",
            }

            // : { height: 50, width: 155 }
          }
          mode="dropdown"
          dropdownIconColor={Platform.OS === "web" ? "white" : "white"}
        >
          <Picker.Item
            color="red"
            label="Cancelada"
            value={ESTADO_CITA.CANCELADA}
          />
          <Picker.Item
            // si es modo claro, negro, si no, blanco
            color="orange"
            label="Pendiente"
            value={ESTADO_CITA.PENDIENTE}
          />
          <Picker.Item
            color="green"
            label="Completada"
            value={ESTADO_CITA.COMPLETADA}
          />
          {/* <Picker.Item label="Ausente" value={ESTADO_CITA.NO_PRESENTADO} /> */}
        </Picker>
        {/* <ThemedText type="h3">{estado}</ThemedText> */}
      </View>

      <View className="p-2 rounded-lg flex flex-row bg-blue-300">
        {/* Datos */}
        <View className="flex flex-col flex-1">
          <View className="flex flex-row">
            <ThemedText className="min-w-[25%]" textBlack>
              Cliente:{" "}
            </ThemedText>
            <ThemedText textBlack>{nombre}</ThemedText>
          </View>
          {servicios ? (
            <View className="flex flex-row">
              <ThemedText className="min-w-[25%]" textBlack>
                Servicios:
              </ThemedText>
              <View className="flex flex-row">
                <FlatList
                  data={servicios}
                  keyExtractor={(i) => i}
                  renderItem={(servicio) => (
                    <View className="ml-2">
                      <ThemedText className="text-gray-800">{`\u2023 ${servicio.item}`}</ThemedText>
                    </View>
                  )}
                />
              </View>
            </View>
          ) : null}
        </View>
        {/* Acciones */}
        <View className="flex flex-col justify-between">
          <Ionicons
            className=" my-2"
            name="logo-whatsapp"
            size={20}
            color={"green"}
            onPress={() => openWhatsApp({ phoneNumber: telefono })}
          />
          <Ionicons
            className=" my-2"
            name="call-outline"
            size={20}
            color={"black"}
            onPress={() => openPhoneCall({ phone: telefono })}
          />
          <Ionicons
            className=" my-2"
            name="trash-outline"
            size={20}
            color={"red"}
            onPress={() => setAbrirDelete(true)}
          />
        </View>
        {abrirDelete ? (
          <ThemedDeleteModal
            loading={false}
            onClose={() => setAbrirDelete(false)}
            onConfirm={handleDelCita}
            textBody="Seguro que quieres borrar/cancelar esta cita"
          />
        ) : null}
      </View>
    </View>
  );
};

export default CitaCardEmpleado;
