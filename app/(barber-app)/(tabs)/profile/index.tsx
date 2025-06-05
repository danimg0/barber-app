import useAuthStore from "@/app/auth/store/useAuthStore";
import ThemedButton from "@/components/ThemedComponents/ThemedButton";
import ThemedModalGeneral from "@/components/ThemedComponents/ThemedModalGeneral";
import ThemedText from "@/components/ThemedComponents/ThemedText";
import ThemedTextInput from "@/components/ThemedComponents/ThemedTextInput";
import { ThemedView } from "@/components/ThemedComponents/ThemedView";
import { useUsuario } from "@/hooks/auth/useUsuario";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Platform, Switch, Text, View } from "react-native";

const UserSettings = () => {
  const { user, logout } = useAuthStore();
  const [switchState, setSwitchState] = useState(false);
  const [abrirModal, setAbrirModal] = useState(false);
  const { changePasswordMutation } = useUsuario();
  const [inputsPassword, setInputsPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  function handleChangePassword(
    name: keyof typeof inputsPassword,
    value: string
  ) {
    setInputsPassword((prev) => ({ ...prev, [name]: value }));
  }

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
          onPress={() => setAbrirModal(true)}
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
      <View className="flex mb-3 items-center justify-center">
        <ThemedText className="text-sm text-white text-center">
          Puedes consultar las políticas de privdacidad de la app en el
          siguiente
        </ThemedText>
        {/* https://danimg0.github.io/barber-politicas/ */}
        <Text className="text-sm ">
          <Link
            href="https://danimg0.github.io/barber-politicas/"
            target="_blank"
            className="text-blue-200"
          >
            Ver políticas de privacidad
          </Link>
        </Text>
      </View>
      <ThemedModalGeneral
        visible={abrirModal}
        onClose={() => setAbrirModal(false)}
      >
        <View className="flex items-center w-full gap-y-4">
          <ThemedText textBlack>Escriba la nueva contraseña</ThemedText>
          <ThemedTextInput
            placeholder="Nueva contraseña"
            secureTextEntry
            autoCapitalize="none"
            icon="lock-closed-outline"
            value={inputsPassword.newPassword}
            onChangeText={(value) => handleChangePassword("newPassword", value)}
          />
          <ThemedTextInput
            placeholder="Repite la contraseña"
            secureTextEntry
            autoCapitalize="none"
            icon="lock-closed-outline"
            value={inputsPassword.confirmPassword}
            onChangeText={(value) =>
              handleChangePassword("confirmPassword", value)
            }
          />
          <ThemedButton
            onPress={() => {
              if (
                inputsPassword.newPassword !== inputsPassword.confirmPassword
              ) {
                alert("Las contraseñas no coinciden");
                return;
              }
              changePasswordMutation.mutate(
                {
                  newPassword: inputsPassword.newPassword,
                },
                {
                  onSuccess: () => {
                    alert("Contraseña cambiada correctamente");
                    setAbrirModal(false);
                  },
                  onError: (error) => {
                    // console.error("Error al cambiar la contraseña:", error);
                    alert("Error al cambiar la contraseña");
                    setAbrirModal(false);
                  },
                }
              );
              setInputsPassword({ newPassword: "", confirmPassword: "" });
            }}
            className="bg-light-secondary w-full p-2 mt-3"
            elevation={5}
          >
            <ThemedText type="semi-bold">Cambiar contraseña</ThemedText>
          </ThemedButton>
        </View>
      </ThemedModalGeneral>
    </ThemedView>
  );
};

export default UserSettings;
