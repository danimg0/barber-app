import { useRouter } from "expo-router";
import { useEffect } from "react";
import { BackHandler } from "react-native";

/**
 * Reemplaza el comportamiento del botón "atrás" para redirigir a una ruta específica.
 * @param to Ruta a la que redirigir (ej: "/menu")
 */
export const useBackRedirect = (to: string) => {
  const router = useRouter();

  useEffect(() => {
    const backAction: () => boolean = () => {
      router.replace(to as any);
      return true; // evita comportamiento por defecto
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [to]);
};
