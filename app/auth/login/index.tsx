//TODO: Una especie de loading hasta que no cargue las imagenes
import ThemedButton from "@/components/ThemedComponents/ThemedButton";
import ThemedLink from "@/components/ThemedComponents/ThemedLink";
import ThemedText from "@/components/ThemedComponents/ThemedText";
import ThemedTextInput from "@/components/ThemedComponents/ThemedTextInput";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import useAuthStore from "../store/useAuthStore";

export default function LoginScreen() {
  const { login } = useAuthStore();
  const [error, setError] = useState("");
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  //TODO: Usar tanstack query para esto en vez de un estado
  const [isPosting, setIsPosting] = useState(false);

  function handleChange(name: string, value: string) {
    setInputs((prev) => ({ ...prev, [name]: value }));
  }

  const handleLogin = async () => {
    const { email, password } = inputs;
    console.log("HandleLogin en loginIndex:", email, password);

    setError("");
    // Validación básica
    if (!inputs.email || !inputs.password) {
      setError("Por favor, complete todos los campos");
      return;
    }

    //Con esto evito el doble tap
    setIsPosting(true);
    const wasSuccessful = await login(email, password);
    console.log("wasSuccesful:", wasSuccessful);
    setIsPosting(false);

    if (wasSuccessful) {
      const { user } = useAuthStore.getState();
      console.log("wasSuccesful, usuario: ", user);
      if (user?.rol === 1) {
        router.replace("/(barber-app)/(tabs)/(admin)");
      } else if (user?.rol === 2) {
        router.replace("/(barber-app)/(tabs)/(barber)");
      } else if (user?.rol === 3) {
        router.replace("/(barber-app)/(tabs)/(client)");
      }
      return;
    }

    Alert.alert("Error", "Usuario o contraseña no son correctos");
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
              Inicio de sesión
            </ThemedText>
            <View className="px-8 pb-8 w-11/12 max-w-md items-center ">
              {error ? (
                <Text className="text-white bg-light-primary px-4 py-2 rounded-lg mb-4">
                  {error}
                </Text>
              ) : null}
              {/* inputs login */}
              <ThemedTextInput
                // className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 bg-white"
                placeholder="Correo electrónico"
                classNameView="mb-5"
                keyboardType="email-address"
                autoCapitalize="none"
                icon="mail-outline"
                onChangeText={(value) => handleChange("email", value)}
              />
              {/* //TODO: ojito para ver la contrasena? */}
              <ThemedTextInput
                // className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 bg-white"
                placeholder="Contraseña"
                secureTextEntry
                classNameView="mb-5"
                autoCapitalize="none"
                onChangeText={(value) => handleChange("password", value)}
                value={inputs.password}
                icon="lock-closed-outline"
              />
              <Text className="text-white text-center">
                ¿Has olvidado la contraseña?
              </Text>
              <Text className="text-white text-center mb-5">
                Recuperala{" "}
                <ThemedLink href={"/"} className="underline font-bold">
                  aquí
                </ThemedLink>
              </Text>
              {/* boton login */}
              <ThemedButton
                onPress={handleLogin}
                disabled={isPosting}
                className="bg-light-secondary w-[70%]"
                icon="log-in-outline"
              >
                {isPosting ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <ThemedText type="semi-bold">Iniciar sesion</ThemedText>
                )}
              </ThemedButton>
              {/* Boton registro */}
              <ThemedButton
                onPress={() => router.push("/auth/register")}
                className="bg-light-primary w-[50%]"
              >
                <ThemedText type="semi-bold">Registrarse</ThemedText>
              </ThemedButton>

              {/* Link a registro */}
              {/* <View className="flex flex-row items-center mt-10">
                <ThemedText>¿No tienes cuenta?</ThemedText>
                <ThemedLink href={"/auth/register"}> Crear cuenta</ThemedLink>
              </View> */}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        {/* <ElevatedButton
          icon="logo-whatsapp"
          phoneNumber={MAIN_PELUQUERO}
          openType="whatsapp"
          message="Hola, me gustaría reservar una cita."
        /> */}
      </ImageBackground>
    </SafeAreaView>
  );
}
