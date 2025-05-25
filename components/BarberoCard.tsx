import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, View } from "react-native";
import ThemedText from "./ThemedComponents/ThemedText";

interface Props {
  disponible: boolean;
  nombre: string;
  foto: string;
  onPress: () => void;
  seleccionado: boolean;
  className: string;
}

const BarberoCard = ({
  disponible,
  nombre,
  foto,
  onPress,
  seleccionado,
  className,
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className={`${className} flex flex-row bg-white shadow-lg  rounded-lg my-3 items-center justify-between`}
    >
      <View className=" flex-1 flex-row gap-x-4 h-full rounded-lg items-center">
        <View
          className={`${
            seleccionado && "w-3 h-full bg-dark-secondary rounded-l-lg "
          }`}
        />
        {disponible ? (
          <Ionicons name="checkmark-circle-sharp" size={20} color={"green"} />
        ) : (
          <Ionicons name="close-circle" size={20} color={"red"} />
        )}
        <ThemedText textBlack>{nombre}</ThemedText>
      </View>
      <View
        className="overflow-hidden rounded-r-lg"
        style={{ width: 80, height: 80 }}
      >
        <Image
          source={{ uri: foto }}
          style={{ width: 80, height: 80 }}
          resizeMode="cover"
        />
      </View>
    </Pressable>
  );
};

export default BarberoCard;
