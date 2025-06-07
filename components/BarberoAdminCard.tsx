import { useBarbero } from "@/hooks/barberos/useBarbero";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, Platform, View } from "react-native";
import ModalStepperEmpleado from "./ModalStepperEmpleado";
import ThemedDeleteModal from "./ThemedComponents/ThemedDeleteModal";
import ThemedText from "./ThemedComponents/ThemedText";

interface Props {
  id: number;
  name: string;
  foto: string;
  email: string;
  phone: string;
  horario: Record<string, { hora_inicio: string; hora_fin: string }[]>;
  rol: number;
  disponible: boolean;
}

const BarberoAdminCard = ({
  disponible,
  email,
  foto,
  horario,
  id,
  name,
  phone,
  rol,
}: Props) => {
  const { barberoMutation, deleteBarberoMutation } = useBarbero({ id });
  const [modalDelete, setModalDelete] = useState(false);

  // Nuevo estado para editar
  const [modalEdit, setModalEdit] = useState(false);

  // Puedes adaptar esta función según tu lógica de guardado
  const handleSaveUser = async (form: any) => {
    // Aquí deberías llamar a tu mutación de edición de barbero
    try {
      await barberoMutation.mutateAsync({
        id,
        nombre: form.name,
        email: form.email,
        phone: form.phone,
        foto: foto || "",
        horario: form.horario,
        disponible: form.disponible,
        rol,
      });
    } finally {
      // Aquí puedes cerrar el modal después de guardar
      setModalEdit(false);
    }
    setModalEdit(false);
  };

  return (
    <View
      className={` ${
        Platform.OS === "web" ? "w-full lg:w-[60%]" : "w-full"
      } flex-row items-center rounded-xl p-4
    ${rol === 1 ? "bg-red-400" : "bg-blue-300"} `}
    >
      <View className="mr-4">
        {foto ? (
          <Image
            source={{ uri: foto }}
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              objectFit: "cover",
              borderWidth: 2,
              borderColor: "#e5e7eb",
            }}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
          />
        ) : (
          <Image
            source={require("../assets/images/default-avatar.jpg")}
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              objectFit: "cover",
              borderWidth: 2,
              borderColor: "#e5e7eb",
            }}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
          />
        )}
      </View>
      <View className="flex-1">
        <ThemedText textBlack>
          {name?.slice(0, 1).toUpperCase()}
          {name?.slice(1)}
        </ThemedText>
        <ThemedText className="text-sm">{email}</ThemedText>
        <ThemedText className="text-sm">{phone}</ThemedText>
        <ThemedText className="text-sm">
          Rol: {rol === 1 ? "Administrador" : "Barbero"}
        </ThemedText>
        <ThemedText
          className={`text-xs font-bold ${
            disponible ? "text-green-600" : "text-red-500"
          }`}
        >
          {disponible ? "Disponible" : "No disponible"}
        </ThemedText>
      </View>
      <View className="flex-row space-x-2">
        <Ionicons
          name="create-outline"
          size={22}
          onPress={() => setModalEdit(true)}
        />
        <Ionicons
          name="trash-outline"
          size={22}
          onPress={() => setModalDelete(true)}
        />
      </View>
      <ThemedDeleteModal
        visible={modalDelete}
        textBody={`¿Estás seguro de que quieres eliminar a ${name}?`}
        onConfirm={() => {
          deleteBarberoMutation.mutate();
          setModalDelete(false);
        }}
        onClose={() => setModalDelete(false)}
        loading={deleteBarberoMutation.isPending}
      />

      {/* Modal de edición */}
      <ModalStepperEmpleado
        visible={modalEdit}
        onClose={() => setModalEdit(false)}
        initialValues={{
          name,
          email,
          phone,
          horario,
          disponible,
        }}
        isEdit={true}
        onSaveUser={handleSaveUser}
        loading={false}
      />
    </View>
  );
};

export default BarberoAdminCard;
