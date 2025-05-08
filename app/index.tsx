import { Redirect } from "expo-router";
import React from "react";
import { View } from "react-native";

const RootIndex = () => {
  return (
    //TODO: Comprobar si esta login
    //TODO: Redirigir en funcion del rol
    <View>
      <Redirect href={"/auth/login"} />
    </View>
  );
};

export default RootIndex;
