import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import React from "react";
import useAuthStore from "../../auth/store/useAuthStore"; // Ajusta la ruta si es necesario

const DrawerLayout = () => {
  const { user } = useAuthStore(); // Para obtener el título dinámico

  // Determinar el título de la cabecera para "Inicio" basado en el rol del usuario
  let homeScreenTitle = "Inicio"; // Título por defecto
  if (user?.rol === 1) {
    homeScreenTitle = "Panel Admin";
  } else if (user?.rol === 2) {
    homeScreenTitle = "Panel Barbero";
  } else if (user?.rol === 3) {
    homeScreenTitle = "Panel Cliente";
  }

  return (
    <Drawer
      screenOptions={{
        drawerStyle: {
          backgroundColor: "gray",
        },
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: Colors.dark.primary,
        },

        drawerActiveTintColor: "indigo",
        overlayColor: "rgba(0,0,0,0.4)",
        sceneStyle: {
          backgroundColor: "white",
        },
      }}
    >
      {/* Esta es la única pantalla "Inicio" que aparecerá en el menú del drawer. */}
      {/* Necesitas un archivo que corresponda a este 'name'. 
          Por ejemplo, crea un archivo: app/(barber-app)/(drawer)/index.tsx */}
      <Drawer.Screen
        name="index" // Corresponde a (drawer)/index.tsx
        options={{
          drawerLabel: "Inicio",
          title: homeScreenTitle, // Título dinámico en la cabecera
          drawerIcon: () => <Ionicons name="home-outline" size={25} />,
        }}
      />

      {/* Pantalla de Perfil */}
      {/* Si tu archivo es (drawer)/profile.tsx o (drawer)/profile/index.tsx, usa "profile".
          Si Expo Router lo muestra como "profile/index" y tienes problemas,
          puedes intentar name="profile/index" si tienes un archivo con ese nombre exacto (poco común)
          o asegurarte que la estructura sea (drawer)/profile/index.tsx y usar name="profile".
      */}
      <Drawer.Screen
        name="profile/index" // Asume (drawer)/profile.tsx o (drawer)/profile/index.tsx
        options={{
          drawerLabel: "Perfil",
          title: "Mi Perfil",
          drawerIcon: () => <Ionicons name="person-circle-outline" size={25} />,
        }}
      />

      <Drawer.Screen
        name="horario/index"
        options={{
          drawerLabel: "Horario",
          title: "Horario",
          drawerIcon: () => (
            <Ionicons name="calendar-clear-outline" size={25} />
          ),
        }}
      />

      {/* Ocultar las pantallas de rol específicas del menú del drawer. */}
      {/* Estas pantallas son a las que CheckAuthLayout redirigirá, */}
      {/* pero no queremos que sean ítems de menú separados. */}
      <Drawer.Screen
        name="(admin)"
        options={{
          drawerItemStyle: { display: "none" },
          title: "Panel de administrador",
        }}
      />
      <Drawer.Screen
        name="(barber)"
        options={{
          drawerItemStyle: { display: "none" },
          title: "Panel de barbero",
        }}
      />
      <Drawer.Screen
        name="(client)"
        options={{
          drawerItemStyle: { display: "none" },
          title: "BarberShop App",
        }}
      />

      {/* Si ves "profile/index" y es una ruta diferente a "profile" que no quieres: */}
      {/* <Drawer.Screen name="profile/index" options={{ drawerItemStyle: { display: 'none' } }} /> */}
    </Drawer>
  );
};

export default DrawerLayout;
