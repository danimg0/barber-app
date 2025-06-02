import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
// import "react-native-reanimated";

import "../global.css";

import ThemedText from "@/components/ThemedComponents/ThemedText";
import { ThemedView } from "@/components/ThemedComponents/ThemedView";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useAuthStore from "./auth/store/useAuthStore";

//LAYOUT RAIZ
// TEMAS, FUENTES, CHECKSTATUS

//Configuracion de tanstack query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //Reintentar si una peticion falla, tambien se le puede poner un numero de intentos
      retry: false,
    },
  },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Merriweather: require("../assets/fonts/Merriweather_24pt-Regular.ttf"),
    Rye: require("../assets/fonts/Rye-Regular.ttf"),
  });
  const { checkStatus } = useAuthStore();

  useEffect(() => {
    console.log("Verificando estado de autenticación una sola vez");
    checkStatus();
  }, []);

  if (!loaded) {
    console.log("NO CARGADO");
    // Async font loading only occurs in development.
    return (
      <ThemedView className="items-center justify-center ">
        <ThemedText className="text-white">Cargando...</ThemedText>
        <ActivityIndicator />
      </ThemedView>
    );
  }

  //TODO: revisar video pantalla registro de fernando para el parpadeo
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Configuracion de tanstack query */}
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          {/* <Text className="">Hola</Text> */}
          <View style={{ flex: 1, backgroundColor: "#000000" }}>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: Colors.dark.background },
                animation: "fade", // Usar animación fade en vez de slide
              }}
            />
          </View>
          {/* <StatusBar style="auto" /> */}
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
