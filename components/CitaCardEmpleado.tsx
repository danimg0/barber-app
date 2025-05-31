import { useCita } from "@/hooks/citas/useCita";
import { openPhoneCall } from "@/utils/helpers/phonecall-open";
import openWhatsApp from "@/utils/helpers/whatsapp-open";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ThemedDeleteModal from "./ThemedComponents/ThemedDeleteModal";
import ThemedText from "./ThemedComponents/ThemedText";

interface Props {
  id: number;
  nombre: string;
  servicios: string[];
  telefono: string;
  hora: string;
  estado: string;
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
  const { deleteCitaMutation } = useCita(id);

  const handleDelCita = () => {
    deleteCitaMutation.mutate(id);
    if (deleteCitaMutation.isSuccess) {
      setAbrirDelete(false);
    } else if (deleteCitaMutation.isError) {
      setAbrirDelete(false);
    }
  };

  return (
    //Todo: cambiar este mt-2 por el contentStyle en la flatlist o lo que se haga
    <View className={`mt-2 lg:w-[80%]`}>
      <View className="flex flex-row justify-between">
        <ThemedText type="h3">{hora}</ThemedText>
        <ThemedText type="h3">{estado}</ThemedText>
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
