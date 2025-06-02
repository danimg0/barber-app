import { ServicioEntitie } from "@/core/servicios/servicios.interface";
import { useServicio } from "@/hooks/servicios/useServicio";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, Platform, Pressable, View } from "react-native";
import ServicioForm from "./ServicioForm";
import ThemedDeleteModal from "./ThemedComponents/ThemedDeleteModal";
import ThemedText from "./ThemedComponents/ThemedText";

const ServicioCard = (servicio: ServicioEntitie) => {
  const { servicioMutation, deleteServicioMutation } = useServicio(servicio.id);
  const [modalVisible, setModalVisible] = useState(false);
  const [servicioEdit, setServicioEdit] = useState<any | null>(null);

  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const abrirModalEliminar = () => {
    setModalDeleteVisible(true);
  };

  const eliminarServicio = () => {
    deleteServicioMutation.mutate();
    setModalVisible(false);
  };

  const abrirModalEditar = (servicio: ServicioEntitie) => {
    setServicioEdit(servicio);
    setModalVisible(true);
  };

  return (
    <View
      className={`rounded-lg bg-gray-500 p-4 flex justify-between flex-row`}
    >
      {/* col izquierda */}
      <View className="flex-1 text-wrap gap-y-2">
        <ThemedText type="h3">{servicio.nombre}</ThemedText>
        <ThemedText className="w-[80%]">
          {servicio.descripcion || "No hay descripción disponible."}
        </ThemedText>
        <View className="flex flex-row gap-x-4">
          <View className="flex flex-row items-center gap-x-1">
            <Ionicons name="time-outline" size={25} />
            <ThemedText>{servicio.duracion.toString()} minutos</ThemedText>
          </View>
          <View className="flex flex-row items-center gap-x-1">
            <Ionicons name="cash-outline" size={25} />
            <ThemedText>{servicio.precio.toString()} €</ThemedText>
          </View>
        </View>
      </View>
      {/* Col iconos */}
      <View className="flex gap-y-2">
        <Pressable onPress={() => abrirModalEditar(servicio)}>
          <Ionicons name="create-outline" size={20} />
        </Pressable>
        <Pressable
          onPress={() => {
            abrirModalEliminar();
          }}
        >
          <Ionicons name="trash-outline" size={20} />
        </Pressable>
      </View>
      {/* Modal eliminar */}
      <ThemedDeleteModal
        visible={modalDeleteVisible}
        loading={false}
        onClose={() => setModalDeleteVisible(false)}
        onConfirm={eliminarServicio}
        textBody="¿Seguro que quieres borrar este servicio?"
      />
      {/* Modal editar */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
        className="flex justify-center items-center w-[50%] "
      >
        <View
          className="flex-1 justify-center items-center"
          style={{
            backgroundColor: "#00000080",
          }}
        >
          <View
            className={`${
              Platform.OS === "web" ? "max-w-[50%]" : "w-full"
            } w-[90%] bg-white rounded-[10px] p-5 flex justify-center items-center`}
          >
            <ServicioForm
              initialValues={
                servicioEdit || {
                  nombre: "",
                  descripcion: "",
                  precio: "",
                  duracion: "",
                }
              }
              onSubmit={(values) => {
                console.log("Valores del formulario:", values, servicio.id);
                servicioMutation.mutate({
                  ...values,
                  id: servicio.id,
                });
                setModalVisible(false);
              }}
              submitText={servicioEdit ? "Editar servicio" : "Crear servicio"}
            />
            <Pressable
              onPress={() => setModalVisible(false)}
              className="mt-2 self-center"
            >
              <Ionicons name="close-circle-outline" size={30} color="gray" />
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ServicioCard;
