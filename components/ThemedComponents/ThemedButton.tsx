import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, PressableProps, View } from "react-native";

interface Props extends PressableProps {
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  className?: string;
  elevation?: number;
  children: any;
  background?: "primary" | "secondary";
  border?: boolean;
}

const ThemedButton = ({
  background,
  border,
  elevation,
  icon,
  iconColor,
  className,
  children,
  ...rest
}: Props) => {
  return (
    <Pressable
      style={[
        border && { borderWidth: 1 },
        elevation ? { elevation: elevation } : {},
      ]}
      className={`${className} rounded-lg mt-3 p-3 active:opacity-80 items-center justify-center flex-row
      
      ${
        background === "primary"
          ? "bg-light-primary"
          : background === "secondary"
          ? "bg-light-secondary"
          : ""
      }`}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      {...rest}
    >
      <View className="flex-row items-center justify-center">
        {children}
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={iconColor || "white"}
            className="ml-3"
          />
        )}
      </View>
    </Pressable>
  );
};

export default ThemedButton;
