//TODO: Una especie de loading hasta que no cargue las imagenes

import { ApiResponse } from "@/app/api/types/responses";
import ThemedButton from "@/components/ThemedComponents/ThemedButton";
import ThemedText from "@/components/ThemedComponents/ThemedText";
import ThemedTextInput from "@/components/ThemedComponents/ThemedTextInput";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import useAuthStore from "../store/useAuthStore";

export default function RegisterScreen() {
  const { register } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    tryPassword: "",
  });

  function handleChange(name: string, value: string) {
    setInputs((prev) => ({ ...prev, [name]: value }));
  }

  const handleRegister = async () => {
    if (
      !inputs.email ||
      !inputs.password ||
      !inputs.name ||
      !inputs.phone ||
      !inputs.tryPassword
    ) {
      setError("Por favor, complete todos los campos");
      return;
    }

    if (inputs.password !== inputs.tryPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // setLoading(true);

    const resp: ApiResponse = await register(
      inputs.name,
      inputs.email,
      inputs.phone,
      1,
      inputs.password
    );

    console.log("Resp recibida", resp);

    if (resp.success) {
      router.replace("/auth/login");
    } else {
      // Alert.alert(
      //   "Error en el registro",
      //   "Ha ocurrido un error al registrar el usuario"
      // );
      setError(resp.message);
      router.reload();
    }

    setLoading(false);
    // try {
    //   setLoading(true);
    //   setError("");
    //   // Validación básica
    //   if (!inputs.email || !inputs.password) {
    //     setError("Por favor, complete todos los campos");
    //     return;
    //   }
    // Llamada a la API
    // const response = await fetch("/api/auth", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: inputs.email,
    //     password: inputs.password,
    //   }),
    // });
    // const data = await response.json();
    //   if (data) {
    //     console.log("Usuario logueado:", {
    //       id: data.id,
    //       email: data.email,
    //       name: data.name,
    //       rol: data.rol,
    //       token: data.token,
    //     });
    //     router.push("/(barber-app)/(tabs)/(client)");
    //   } else {
    //     setError(data.message || "Error al iniciar sesión");
    //   }
    // } catch (err) {
    //   setError("Error de conexión. Inténtelo más tarde.");
    //   console.error(err);
    // } finally {
    //   setLoading(false);
    // }
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
            <View className="px-8 pb-8 w-11/12 max-w-md items-center">
              {error ? (
                <ThemedText className="text-white bg-light-primary px-4 py-2 rounded-lg mb-4">
                  {error}
                </ThemedText>
              ) : null}
              <ThemedText type="h2" className="mb-5 text-white text-left">
                Registro
              </ThemedText>
              {/* inputs registro */}
              <ThemedTextInput
                classNameView="mb-5"
                placeholder="Nombre"
                keyboardType="default"
                autoCapitalize="none"
                icon="person-outline"
                value={inputs.name}
                onChangeText={(value) => handleChange("name", value)}
              />
              {/* correo */}
              <ThemedTextInput
                classNameView="mb-5"
                placeholder="Correo electrónico"
                keyboardType="email-address"
                autoCapitalize="none"
                icon="mail-outline"
                value={inputs.email}
                onChangeText={(value) => handleChange("email", value)}
              />
              {/* telefono */}
              {/* //TODO: Poner un icono de informacion y si le pulsa, abrir modal informando de porque tiene que dar el tlf */}
              <ThemedTextInput
                classNameView="mb-5"
                placeholder="Teléfono"
                keyboardType="phone-pad"
                autoCapitalize="none"
                icon="phone-portrait-outline"
                value={inputs.phone}
                onChangeText={(value) => handleChange("phone", value)}
              />
              {/* password */}
              {/* //TODO: ojito para ver la contrasena? */}
              <ThemedTextInput
                classNameView="mb-5"
                placeholder="Contraseña"
                secureTextEntry
                onChangeText={(value) => handleChange("password", value)}
                value={inputs.password}
                icon="lock-closed-outline"
              />
              <ThemedTextInput
                classNameView="mb-5"
                placeholder="Repetir contraseña"
                secureTextEntry
                onChangeText={(value) => handleChange("tryPassword", value)}
                value={inputs.tryPassword}
                icon="lock-closed-outline"
              />
              {/* boton Registro */}
              <ThemedButton
                onPress={handleRegister}
                disabled={loading}
                className="bg-light-primary w-[50%]"
                icon="log-in-outline"
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <ThemedText type="semi-bold">Registrarse</ThemedText>
                )}
              </ThemedButton>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}
