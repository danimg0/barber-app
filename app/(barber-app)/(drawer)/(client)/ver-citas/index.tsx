import CitaCard, { Cita } from "@/components/CitaCard";
import ThemedText from "@/components/ThemedComponents/ThemedText";
import { ThemedView } from "@/components/ThemedComponents/ThemedView";
import React from "react";
import { FlatList } from "react-native";

const CitasClienteScreen = () => {
  //TODO: CAMBIAR EL INTERFACE CITA DE SITIO
  const citas: Cita[] = [
    {
      id: 1,
      peluquero: "Jeffrey",
      fecha: "6/10/2023",
      hora: "10:00",
      servicios: ["Corte de cabello", "Afeitado"],
      foto_peluquero:
        "https://i.ibb.co/5hJgFZyZ/Captura-de-pantalla-2025-05-11-225738.png",
      estado: "pendiente",
    },
    {
      id: 2,
      peluquero: "Negrito ojos claro",
      fecha: "6/10/2023",
      hora: "10:00",
      servicios: ["Corte de cabello"],
      foto_peluquero:
        "https://i.ibb.co/fYbGwJPP/Captura-de-pantalla-2025-05-11-225545.png",
      estado: "terminada",
    },
    {
      id: 3,
      peluquero: "Conejo malo",
      fecha: "6/10/2023",
      hora: "10:00",
      servicios: ["Corte de cabello"],
      foto_peluquero:
        "https://i.ibb.co/rKhhrm8K/Captura-de-pantalla-2025-05-11-235943.png",
      estado: "terminada",
    },
  ];

  return (
    <ThemedView className="items-center">
      {/* <ScrollView className="w-full pb-40"> */}
      <ThemedText type="h2">Tus citas</ThemedText>
      <FlatList
        className="w-[90%]"
        data={citas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CitaCard cita={item} />}
        ListFooterComponent={<ThemedView className="h-24" />}
        showsVerticalScrollIndicator={false}
      />
      {/* </ScrollView> */}
      {/* <View className="h-10" /> */}
    </ThemedView>
  );
};

export default CitasClienteScreen;
