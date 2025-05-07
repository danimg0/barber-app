import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
// import "react-native-reanimated";

import "../global.css";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack } from "expo-router";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Merriweather: require("../assets/fonts/Merriweather_24pt-Regular.ttf"),
    Rye: require("../assets/fonts/Rye-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    // <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {/* <Text className="">Hola</Text> */}

      <Stack
        screenOptions={{
          headerShown: false,
        }}
      ></Stack>

      {/* <StatusBar style="auto" /> */}
    </ThemeProvider>
  );
}
