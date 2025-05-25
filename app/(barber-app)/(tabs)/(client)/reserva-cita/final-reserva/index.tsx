import ThemedButton from "@/components/ThemedComponents/ThemedButton";
import ThemedText from "@/components/ThemedComponents/ThemedText";
import { ThemedView } from "@/components/ThemedComponents/ThemedView";
import { router } from "expo-router";
import React from "react";

const FinalReservaScreen = () => {
  return (
    <ThemedView className="items-center justify-center">
      <ThemedText type="h1" className="mb-52">
        ¡Reserva finalizada!
      </ThemedText>
      <ThemedButton
        onPress={() => router.replace("/ver-citas")}
        background="secondary"
        icon="search-circle-outline"
      >
        <ThemedText>Ver mis citas</ThemedText>
      </ThemedButton>
    </ThemedView>
  );
};

export default FinalReservaScreen;
