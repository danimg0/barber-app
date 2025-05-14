import HorarioItem from "@/components/HorarioItem";
import ThemedText from "@/components/ThemedComponents/ThemedText";
import { ThemedView } from "@/components/ThemedComponents/ThemedView";
import { Image, View } from "react-native";

const Horarios = () => {
  const horariosSemana = [
    { dia: "Lun", horarios: ["9 - 14", "16 - 20"] },
    { dia: "Mar", horarios: ["9 - 14", "16 - 20"] },
    { dia: "Mie", horarios: ["9 - 14", "16 - 20"] },
    { dia: "Jue", horarios: ["9 - 14", "16 - 20"] },
    { dia: "Vie", horarios: ["9 - 14", "16 - 20"] },
    { dia: "Sab", horarios: ["9 - 14"] },
    { dia: "Dom", horarios: ["cerrado"] },
  ];

  return (
    <ThemedView>
      <View className="p-6 rounded-lg mb-10 ">
        <ThemedText type="h2" className="text-white mb-10 text-center">
          Horarios
        </ThemedText>

        {horariosSemana.map((item, index) => (
          <HorarioItem key={index} dia={item.dia} horarios={item.horarios} />
        ))}
      </View>
      <View className="flex items-center flex-1">
        <Image
          className="w-[70%] h-[70%] rounded-xl"
          source={{
            uri: "https://i.ibb.co/BV0DTbxH/Captura-de-pantalla-2025-05-13-220744.png",
          }}
        />
      </View>
    </ThemedView>
  );
};

export default Horarios;
