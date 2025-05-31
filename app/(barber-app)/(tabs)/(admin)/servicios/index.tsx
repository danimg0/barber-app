import ServicioCard from "@/components/ServicioCard";
import ServicioForm from "@/components/ServicioForm";
import ThemedButton from "@/components/ThemedComponents/ThemedButton";
import ThemedText from "@/components/ThemedComponents/ThemedText";
import { ThemedView } from "@/components/ThemedComponents/ThemedView";
import { useServicios } from "@/hooks/servicios/useServicios";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Modal, Platform, Pressable, View } from "react-native";

const ServiciosViewAdmin = () => {
  const { serviciosQuery } = useServicios();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [servicioEdit, setServicioEdit] = React.useState<any | null>(null);

  const abrirModalCrear = () => {
    setServicioEdit(null);
    setModalVisible(true);
  };

  if (serviciosQuery.isLoading) {
    return (
      <ThemedView className="items-center">
        <ThemedText type="h2">Cargando servicios...</ThemedText>
      </ThemedView>
    );
  }

  const servicios = serviciosQuery.data;

  return (
    <ThemedView className="items-center">
      <ThemedText type="h2" className="mb-4">
        Servicios
      </ThemedText>
      <ThemedText type="normal" className="mb-4">
        Aquí puedes ver, editar o eliminar los servicios disponibles.
      </ThemedText>
      <View
        className={`${
          Platform.OS === "web" ? "max-w-[50%]" : "w-full px-4"
        } mb-4`}
      >
        <ThemedButton
          border
          className="w-full"
          onPress={abrirModalCrear}
          icon="add-outline"
        >
          <ThemedText>Añadir servicio</ThemedText>
        </ThemedButton>
      </View>
      <FlatList
        data={servicios}
        keyExtractor={(item) => item.id.toString()}
        className={`${
          Platform.OS === "web" ? "min-w-[50%] max-w-[50%]" : "w-full px-4"
        }`}
        ItemSeparatorComponent={() => {
          return <View className="h-4" />;
        }}
        ListEmptyComponent={
          <ThemedText type="h2">No hay servicios disponibles</ThemedText>
        }
        renderItem={({ item }) => (
          <ServicioCard
            id={item.id}
            nombre={item.nombre}
            duracion={item.duracion}
            precio={item.precio}
            descripcion={item.descripcion}
          />
        )}
      />
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
                // lógica para crear o editar
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
    </ThemedView>
  );
};

export default ServiciosViewAdmin;
