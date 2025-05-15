import ElevatedButton from "@/components/ElevatedButton";
import ThemedButton from "@/components/ThemedComponents/ThemedButton";
import ThemedText from "@/components/ThemedComponents/ThemedText";
import { ThemedView } from "@/components/ThemedComponents/ThemedView";
import { router } from "expo-router";
import React from "react";
import { Image, useWindowDimensions, View } from "react-native";

const ClienteIndex = () => {
  const { height } = useWindowDimensions();

  return (
    <ThemedView className="flex items-center">
      <View style={{ top: height * 0.1 }} className="gap-y-3">
        <Image
          source={{
            uri: "https://i.ibb.co/0j93NJRm/image-removebg-preview-3.png",
          }}
          className="w-48 h-48"
        />
        <ThemedButton
          elevation={5}
          icon="bookmark-outline"
          border
          background="secondary"
        >
          <ThemedText>Reservar cita</ThemedText>
        </ThemedButton>
        <ThemedButton
          elevation={5}
          icon="search-circle-outline"
          border
          background="primary"
          onPress={() => router.push("/ver-citas")}
        >
          <ThemedText>Ver mis citas</ThemedText>
        </ThemedButton>
      </View>
      <ElevatedButton
        icon="logo-whatsapp"
        openType="whatsapp"
        phoneNumber="34671788518"
        message=""
      />
    </ThemedView>
  );
};

export default ClienteIndex;
