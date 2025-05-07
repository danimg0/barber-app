import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, PressableProps, View } from "react-native";
import ThemedText from "./ThemedText";

interface Props extends PressableProps {
  icon?: keyof typeof Ionicons.glyphMap;
  className?: string;
  children: any;
}

const ThemedButton = ({ icon, className, children, ...rest }: Props) => {
  return (
    <View
      className={`${className} rounded-lg mt-3 py-3 active:opacity-80 items-center justify-center flex-row`}
    >
      <Pressable {...rest}>
        <ThemedText>{children}</ThemedText>
      </Pressable>
      {icon && (
        <Ionicons name={icon} size={20} color={"white"} className="ml-3" />
      )}
    </View>
  );
};

export default ThemedButton;
