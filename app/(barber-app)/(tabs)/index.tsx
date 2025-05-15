import useAuthStore from "@/app/auth/store/useAuthStore";
import { ThemedView } from "@/components/ThemedComponents/ThemedView";
import { ROLE } from "@/constants/Rols";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";

// Esta pantalla es el destino del item "Inicio" del drawer.
// CheckAuthLayout (el layout padre) redirigirá desde aquí al panel de rol correcto.

const DrawerIndexScreen = () => {
  const { status, user } = useAuthStore();

  console.log("DEBUG console log antes del useEffect");
  // Mueve la lógica de redirección a un useEffect
  console.log(
    `DEBUG antes del useEffect --> Estado ${status} y usuario ${user?.rol}`
  );

  useEffect(() => {
    console.log(
      `DEBUG drawer.index --> Estado ${status} y usuario ${user?.rol}`
    );

    if (status === "authenticated" && user !== null) {
      if (user?.rol === ROLE.ADMIN) {
        router.replace("/(barber-app)/(tabs)/(admin)");
      } else if (user?.rol === ROLE.EMPLEADO) {
        router.replace("/(barber-app)/(tabs)/(barber)");
      } else if (user?.rol === ROLE.CLIENTE) {
        router.replace("/(barber-app)/(tabs)/(client)");
        // return <Redirect  href={"/(barber-app)/(drawer)/(client)"} />;
      }
    } else {
      router.push("/auth/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, user, new Date()]); // Dependencias para que se ejecute cuando cambien

  // Renderiza un loading o contenido temporal mientras se procesa la redirección
  return (
    <ThemedView>
      <ActivityIndicator />
    </ThemedView>
  );
};

export default DrawerIndexScreen;
