import BarberoAdminCard from "@/components/BarberoAdminCard";
import ModalStepperEmpleado from "@/components/ModalStepperEmpleado";
import ThemedButton from "@/components/ThemedComponents/ThemedButton";
import ThemedText from "@/components/ThemedComponents/ThemedText";
import { ThemedView } from "@/components/ThemedComponents/ThemedView";
import { ROLE } from "@/constants/Rols";
import { Horario } from "@/core/barberos/interface/barberos.interface";
import { useBarbero } from "@/hooks/barberos/useBarbero";
import { useBarberos } from "@/hooks/barberos/useBarberos";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, Platform, View } from "react-native";

const EmpleadosViewAdmin = () => {
  const { barberosConHorarioQuery } = useBarberos();
  const { barberoMutation } = useBarbero({ id: 0 });

  const barberos = barberosConHorarioQuery.data;

  const [modalVisible, setModalVisible] = useState(false);
  type EmpleadoFormValues = {
    name?: string;
    email?: string;
    phone?: string;
    foto_perfil?: string;
    horario?: Horario;
  };

  const [empleadoEdit, setEmpleadoEdit] = useState<
    EmpleadoFormValues | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);

  const handleSaveUser = async (userData: EmpleadoFormValues) => {
    setLoading(true);
    //NO HACER TRYCATCH, mutateAsync ya maneja errores
    //El try esta puesto para el finally solo
    try {
      await barberoMutation.mutateAsync({
        id: 0, // Si es un nuevo empleado, el id será 0
        nombre: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        foto: userData.foto_perfil || "",
        horario: userData?.horario || {}, // Mantener el horario existente si se está editando
        disponible: true,
        rol: ROLE.EMPLEADO, // Rol de empleado
      });
      setModalVisible(false);
    } finally {
      setLoading(false);
    }
  };

  if (barberosConHorarioQuery.isLoading) {
    return (
      <ThemedView className="flex items-center justify-center">
        <ActivityIndicator />
      </ThemedView>
    );
  }

  return (
    <ThemedView className="items-center">
      <ThemedText type="h2" className="mb-4">
        Empleados
      </ThemedText>
      <ThemedText type="normal" className="mb-4">
        Aquí puedes ver, editar o eliminar los empleados.
      </ThemedText>
      <View
        className={`${
          Platform.OS === "web" ? "max-w-[50%]" : "w-full px-4"
        } mb-4`}
      >
        <ThemedButton
          border
          className="w-full"
          onPress={() => {
            setEmpleadoEdit(undefined);
            setModalVisible(true);
          }}
          icon="add-outline"
        >
          <ThemedText>Añadir empleado</ThemedText>
        </ThemedButton>
      </View>
      <FlatList
        data={barberos}
        keyExtractor={(item) => item.id.toString()}
        className={`${
          Platform.OS === "web" ? "w-full lg:max-w-[50%]" : "w-full "
        } px-4`}
        ItemSeparatorComponent={() => {
          return <View className="h-4" />;
        }}
        ListEmptyComponent={
          <View className="flex items-center justify-center">
            <ThemedText type="h2" className="mt-40">
              No hay empleados
            </ThemedText>
          </View>
        }
        renderItem={({ item }) => (
          <BarberoAdminCard
            id={item.id}
            name={item.name}
            foto={item.foto_perfil}
            email={item.email}
            phone={item.phone}
            horario={item.horario}
            rol={item.rol}
            disponible={item.disponible}
          />
        )}
      />
      {/* Modal de creacion */}

      <ModalStepperEmpleado
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        initialValues={empleadoEdit}
        isEdit={!!empleadoEdit}
        onSaveUser={handleSaveUser}
        loading={loading}
      />
    </ThemedView>
  );
};

export default EmpleadosViewAdmin;
