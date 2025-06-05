import ThemedButton from "@/components/ThemedComponents/ThemedButton";
import ThemedLink from "@/components/ThemedComponents/ThemedLink";
import ThemedText from "@/components/ThemedComponents/ThemedText";
import ThemedTextInput from "@/components/ThemedComponents/ThemedTextInput";
import { useUsuario } from "@/hooks/auth/useUsuario";
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

export default function RequestResetPasswordScreen() {
  const { requestResetMutation } = useUsuario();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const handleRequestReset = async () => {
    setError("");
    setSuccess("");
    if (!email) {
      setError("Por favor, introduce tu correo electrónico");
      return;
    }
    setIsPosting(true);
    requestResetMutation.mutate(
      { email },
      {
        onSuccess: (data: any) => {
          setSuccess(
            "Correo de recuperación enviado. Revisa tu bandeja de entrada."
          );
        },
        onError: (err: any) => {
          setError(err?.message || "Error al enviar el correo de recuperación");
        },
        onSettled: () => setIsPosting(false),
      }
    );
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
              Recuperar contraseña
            </ThemedText>
            <View className="px-8 pb-8 w-11/12 max-w-md items-center ">
              {error ? (
                <Text className="text-white bg-light-primary px-4 py-2 rounded-lg mb-4">
                  {error}
                </Text>
              ) : null}
              {success ? (
                <Text className="text-white bg-green-600 px-4 py-2 rounded-lg mb-4">
                  {success}
                </Text>
              ) : null}
              <ThemedTextInput
                placeholder="Correo electrónico"
                classNameView="mb-5"
                keyboardType="email-address"
                autoCapitalize="none"
                icon="mail-outline"
                onChangeText={setEmail}
                value={email}
              />
              <ThemedButton
                onPress={handleRequestReset}
                disabled={isPosting}
                className="bg-light-secondary"
                icon="refresh-outline"
              >
                {isPosting ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <ThemedText>Enviar correo de recuperación</ThemedText>
                )}
              </ThemedButton>
              <ThemedLink
                href="/auth/login"
                className="underline font-bold mt-5 text-white"
              >
                Volver al inicio de sesión
              </ThemedLink>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}
