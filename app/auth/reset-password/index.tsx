import ThemedButton from "@/components/ThemedComponents/ThemedButton";
import ThemedText from "@/components/ThemedComponents/ThemedText";
import ThemedTextInput from "@/components/ThemedComponents/ThemedTextInput";
import { useUsuario } from "@/hooks/auth/useUsuario";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

const ResetPasswordScreen = () => {
  const params = useLocalSearchParams<{ token: string }>();
  const { token } = params;
  const { resetPasswordMutation } = useUsuario();
  const [error, setError] = useState("");
  const [inputs, setInputs] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isPosting, setIsPosting] = useState(false);

  const handleChange = (name: string, value: string) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetPassword = async () => {
    const { password, confirmPassword } = inputs;
    setError("");

    // Validación doble
    if (!password || !confirmPassword) {
      setError("Por favor, complete todos los campos");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setIsPosting(true);
    try {
      // Llamada a la mutación para restablecer la contraseña
      await resetPasswordMutation.mutateAsync({
        token: token || "",
        password,
      });
      // Aquí podrías manejar el éxito, como redirigir al usuario o mostrar un mensaje
    } catch (error) {
      // Manejo de errores
      setError("Error al restablecer la contraseña. Inténtalo de nuevo.");
    }
    setIsPosting(false);
    //todo:mostrar mensaje de exito
    if (!error) {
      router.replace("/auth/login");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={{
          uri: "https://i.ibb.co/vCS4XN3p/c15a59f893dfd1e4231d7365e0d14cf4-1.png",
        }}
        style={{ flex: 1, width: "100%" }}
        resizeMode="cover"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: "https://i.ibb.co/0j93NJRm/image-removebg-preview-3.png",
              }}
              className="w-48 h-48"
            />
            <ThemedText type="h2" className="mb-5">
              Resetear contraseña
            </ThemedText>
            <View className="px-8 pb-8 w-11/12 max-w-md items-center ">
              {error ? (
                <Text className="text-white bg-light-primary px-4 py-2 rounded-lg mb-4">
                  {error}
                </Text>
              ) : null}

              <ThemedTextInput
                placeholder="Nueva contraseña"
                secureTextEntry
                classNameView="mb-5"
                autoCapitalize="none"
                onChangeText={(value) => handleChange("password", value)}
                value={inputs.password}
                icon="lock-closed-outline"
              />
              <ThemedTextInput
                placeholder="Repite la contraseña"
                secureTextEntry
                classNameView="mb-5"
                autoCapitalize="none"
                onChangeText={(value) => handleChange("confirmPassword", value)}
                value={inputs.confirmPassword}
                icon="lock-closed-outline"
              />
              <Text className="text-white text-center">
                ¿Has olvidado la contraseña?
              </Text>
              {/* boton reset */}
              <ThemedButton
                onPress={handleResetPassword}
                disabled={isPosting}
                className="bg-light-secondary w-[70%]"
                icon="refresh-outline"
              >
                {isPosting ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <ThemedText type="semi-bold">Resetear contraseña</ThemedText>
                )}
              </ThemedButton>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
