import useAuthStore from "@/app/auth/store/useAuthStore";
import ThemedButton from "@/components/ThemedComponents/ThemedButton";
import ThemedText from "@/components/ThemedComponents/ThemedText";
import { ThemedView } from "@/components/ThemedComponents/ThemedView";
import React, { useState } from "react";
import { Platform, Switch, Text, View } from "react-native";

const UserSettings = () => {
  const { user, logout } = useAuthStore();
  const [switchState, setSwitchState] = useState(false);

  if (!user) {
    return (
      <ThemedView>
        <Text>No existe usuario</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView className="items-center justify-between">
      {/* <ScrollView className="w-full pb-40"> */}
      <View className={`${Platform.OS === "web" ? "w-[40%]" : "w-[90%] "}`}>
        <ThemedText type="h2" className="text-center">
          Perfil
        </ThemedText>
        <View className="mb-10">
          <ThemedText type="h3">Nombre</ThemedText>
          <ThemedText
            style={{ borderWidth: 0.75 }}
            className="rounded-lg p-2 mt-2"
          >
            {user.name}
          </ThemedText>
        </View>
        <View className="mb-10">
          <ThemedText type="h3">Correo electrónico</ThemedText>
          <ThemedText
            style={{ borderWidth: 0.75 }}
            className="rounded-lg p-2 mt-2"
          >
            {user.email}
          </ThemedText>
        </View>
        <View className="mb-10">
          <ThemedText type="h3">Teléfono</ThemedText>
          <ThemedText
            style={{ borderWidth: 0.75 }}
            className="rounded-lg p-2 mt-2"
          >
            671788417
          </ThemedText>
        </View>
        <View className="mb-10">
          {Platform.OS !== "web" && (
            <>
              <View className="flex flex-row items-center justify-between pr-5">
                <ThemedText type="h3">Notificaciones</ThemedText>
                <Switch
                  value={switchState}
                  onChange={() => {
                    setSwitchState(!switchState);
                    !switchState &&
                      alert(
                        "A partir de ahora recibiras notificaciones para tus citas"
                      );
                  }}
                />
              </View>
              <ThemedText>
                Mantenlo activado para recibir notificaciones sobre tus próximas
                citas
              </ThemedText>
            </>
          )}
        </View>
        <ThemedButton
          onPress={() => {}}
          className=" bg-[#2C2C2C] w-full p-2"
          elevation={5}
        >
          <ThemedText className="text-white">Cambiar contraseña</ThemedText>
        </ThemedButton>
        <ThemedButton
          onPress={logout}
          background="primary"
          className="w-full p-2"
          elevation={5}
        >
          <ThemedText className="">Cerrar sesión</ThemedText>
        </ThemedButton>
      </View>
    </ThemedView>
  );
};

export default UserSettings;
