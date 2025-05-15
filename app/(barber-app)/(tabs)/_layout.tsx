import useAuthStore from "@/app/auth/store/useAuthStore";
import ThemedText from "@/components/ThemedComponents/ThemedText";
import { ThemedView } from "@/components/ThemedComponents/ThemedView";
import Colors from "@/constants/Colors";
import { ROLE } from "@/constants/Rols";
import { Ionicons } from "@expo/vector-icons";
import { router, Tabs, usePathname } from "expo-router";
import { ActivityIndicator } from "react-native";

const TabsLayout = () => {
  const { user } = useAuthStore();
  const pathname = usePathname();

  if (!user) {
    return (
      <ThemedView>
        <ActivityIndicator />
      </ThemedView>
    );
  }

  // Determinar el título de la pantalla de inicio según el rol
  const getHomeScreenTitle = () => {
    switch (user?.rol) {
      case ROLE.ADMIN:
        return "Panel Admin";
      case ROLE.EMPLEADO:
        return "Panel Barbero";
      case ROLE.CLIENTE:
        return "Panel Cliente";
      default:
        return "Inicio";
    }
  };

  // Función para determinar si el tab "Inicio" debe estar activo
  const isHomeActive = () => {
    return (
      pathname === "/" ||
      pathname.startsWith("/(admin)") ||
      pathname.startsWith("/(barber)") ||
      pathname.startsWith("/(client)")
    );
  };

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarInactiveTintColor: "black",
        tabBarStyle: {
          backgroundColor: Colors.dark.secondary,
        },
        headerStyle: {
          backgroundColor: Colors.dark.primary,
        },
        headerTitle: ({ children }) => {
          if (route.name === "index") {
            return (
              <ThemedText type="h2" textBlack>
                {getHomeScreenTitle()}
              </ThemedText>
            );
          }
          return (
            <ThemedText type="h2" textBlack>
              {children}
            </ThemedText>
          );
        },
        headerRight: () => (
          <Ionicons
            name="person-circle-outline"
            size={35}
            style={{ marginRight: 20 }}
            onPress={() => router.push("/profile")}
          />
        ),
        tabBarActiveTintColor: "black",
      })}
    >
      {/* Pantalla de Inicio */}
      <Tabs.Screen
        name="index"
        options={{
          title: getHomeScreenTitle(),
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="home-outline"
              size={25}
              color={isHomeActive() ? "white" : color}
            />
          ),
          tabBarLabelStyle: {
            color: isHomeActive() ? "white" : undefined,
          },
        }}
      />

      {/* Pantalla de Horario */}
      <Tabs.Screen
        name="horario/index"
        options={{
          title: "Horario",
          tabBarLabel: "Horario",
          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar-clear-outline" size={25} color={color} />
          ),
          tabBarActiveTintColor: "white",
        }}
      />

      {/* Pantallas ocultas - no aparecerán en el tab bar */}
      <Tabs.Screen
        name="(admin)"
        options={{
          title: "Panel Admin",
          tabBarItemStyle: { display: "none" },
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="(barber)"
        options={{
          title: "Panel Barbero",
          tabBarItemStyle: { display: "none" },
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="(client)"
        options={{
          title: "BarberShop APP",
          tabBarItemStyle: { display: "none" },
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Mi perfil",
          tabBarItemStyle: { display: "none" },
          tabBarButton: () => null,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
