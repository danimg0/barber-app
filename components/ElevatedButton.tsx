import openWhatsApp from "@/utils/button-functions/whatsapp-open";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, useWindowDimensions } from "react-native";

interface Props {
  icon: keyof typeof Ionicons.glyphMap;
  openType: "whatsapp" | "phone";
  phoneNumber: string;
  message?: string;
  onPress?: () => void; //No lo estoy usando ahora mismo
}

const ElevatedButton = ({ icon, message, phoneNumber, openType }: Props) => {
  const { width, height } = useWindowDimensions();
  const rightPosition = width * 0.1;
  const bottomPosition = height * 0.1;

  //TODO: distintos tamaños, izquierda o derecha

  return (
    <Pressable
      style={{
        right: rightPosition,
        bottom: bottomPosition,
      }}
      onPress={
        openType === "whatsapp"
          ? () =>
              openWhatsApp({
                phoneNumber: phoneNumber,
                message: message,
              })
          : () => {} //TODO: llamar a la funcion para abrir el tlf
      }
      className="bg-gray-400 absolute w-20 h-20 flex items-center justify-center rounded-xl elevation-lg"
    >
      <Ionicons name={icon} size={35} />
    </Pressable>
  );
};

export default ElevatedButton;
