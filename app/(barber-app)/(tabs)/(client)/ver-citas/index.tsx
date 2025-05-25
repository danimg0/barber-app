import useAuthStore from "@/app/auth/store/useAuthStore";
import CitaCard from "@/components/CitaCard";
import ThemedText from "@/components/ThemedComponents/ThemedText";
import { ThemedView } from "@/components/ThemedComponents/ThemedView";
import { ROLE } from "@/constants/Rols";
import { mapCitasDBToCitasEntities } from "@/core/mappers/cita.mapper";
import { useCitas } from "@/hooks/citas/useCitas";
import React from "react";
import { ActivityIndicator, FlatList } from "react-native";

const CitasClienteScreen = () => {
  const { user } = useAuthStore();
  let rol = ROLE.CLIENTE;
  if (user) {
    rol = user.rol;
  }
  const { citasQuery, loadNextPage } = useCitas({
    rol,
    mapper: mapCitasDBToCitasEntities,
  });

  if (citasQuery.isLoading) {
    return (
      <ThemedView>
        <ActivityIndicator />
      </ThemedView>
    );
  }

  const citas = citasQuery.data?.pages?.flatMap((page) => page) ?? [];

  return (
    <ThemedView className="items-center">
      {/* <ScrollView className="w-full pb-40"> */}
      <ThemedText type="h2">Tus citas</ThemedText>

      {citasQuery.data?.pages.flatMap((page) => page).length === 0 ? (
        <ThemedText>Sin citas</ThemedText>
      ) : (
        <FlatList
          className="w-[90%]"
          data={citasQuery.data?.pages.flatMap((page) => page) ?? []}
          keyExtractor={(item) => item.idCita.toString()}
          renderItem={({ item }) => <CitaCard cita={item} />}
          ListFooterComponent={<ThemedView className="h-24" />}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* </ScrollView> */}
      {/* <View className="h-10" /> */}
    </ThemedView>
  );
};

export default CitasClienteScreen;
