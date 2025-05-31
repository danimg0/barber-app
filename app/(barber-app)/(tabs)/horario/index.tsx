import HorarioItem from "@/components/HorarioItem";
import ThemedButton from "@/components/ThemedComponents/ThemedButton";
import ThemedText from "@/components/ThemedComponents/ThemedText";
import { ThemedView } from "@/components/ThemedComponents/ThemedView";
import { Image, Platform, ScrollView, View } from "react-native";

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

  const content = (
    <ThemedView className="lg:items-center lg:justify-center">
      <View className="lg:flex-row lg:items-center lg:justify-center lg:gap-x-20">
        <View
          className="
            w-full max-w-xl
            flex items-center gap-y-5 mb-4
            "
        >
          <ThemedText type="h2">Horarios</ThemedText>
          <View className="w-full space-y-3 items-center flex">
            {horariosSemana.map((item, index) => (
              <HorarioItem
                key={index}
                dia={item.dia}
                horarios={item.horarios}
              />
            ))}
          </View>
        </View>
        <View className="w-full flex items-center ">
          <Image
            className="rounded-xl w-[70%] max-w-xl h-80 "
            source={{
              uri: "https://i.ibb.co/BV0DTbxH/Captura-de-pantalla-2025-05-13-220744.png",
            }}
            resizeMode="cover"
          />
          <View className="flex flex-row justify-evenly w-full">
            <ThemedButton
              elevation={5}
              background="primary"
              icon="call-outline"
              border
            >
              <ThemedText>Llamar</ThemedText>
            </ThemedButton>
            <ThemedButton
              elevation={5}
              background="secondary"
              icon="logo-whatsapp"
              border
            >
              <ThemedText>WhatsApp</ThemedText>
            </ThemedButton>
          </View>
        </View>
      </View>
    </ThemedView>
  );

  return (
    <ThemedView className="lg:items-center lg:justify-center -m-14">
      <View className="lg:flex-row lg:items-center lg:justify-center lg:gap-x-20">
        {Platform.OS === "web" ? (
          <View className="w-full">{content}</View>
        ) : (
          <ScrollView className="w-full">{content}</ScrollView>
        )}
      </View>
    </ThemedView>
  );
};

export default Horarios;
