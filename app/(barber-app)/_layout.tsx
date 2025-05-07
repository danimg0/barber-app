//Este es un buen lugar para poner la parte de la autenficacion, ya
//  que el usuario va a pasar por este layout siempre al entrar a la app

import { Redirect, Stack } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import useAuthStore from "../auth/store/useAuthStore";

const CheckAuthLayout = () => {
  const { status, checkStatus, user } = useAuthStore();

  useEffect(() => {
    //Disparamos el checkStatus
    // checkStatus()
  }, []);

  if (status === "checking") {
    return (
      <View className="flex-1 items-center justify-center m-5">
        <ActivityIndicator />
      </View>
    );
  }

  if (status === "unauthenticated") {
    return <Redirect href={"/auth/login"} />;
  }

  //   if (status === "authenticated") {
  //   }

  return (
    <Stack>
      <Stack.Screen
        name="(client)/index"
        options={{
          title: "Cliente",
        }}
      />
    </Stack>
  );
};

export default CheckAuthLayout;
