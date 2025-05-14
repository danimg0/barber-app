import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { TextInput, TextInputProps, View } from "react-native";

interface Props extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap;
}

const ThemedTextInput = ({ icon, ...rest }: Props) => {
  const [isActive, setIsActive] = useState(false);
  // Al pulsar en el view cuenta como que está fuera del inputText, por ello creamos este ref
  const inputRef = useRef<TextInput>(null);

  return (
    <View
      className={`w-full flex-row items-center border rounded p-1 mb-2.5 bg-white ${
        isActive ? "border-red-500" : "border-gray-300"
      }`}
      onTouchStart={() => inputRef.current?.focus()}
    >
      {icon && (
        <Ionicons name={icon} size={24} className="ml-2 mr-3 text-black" />
      )}
      <TextInput
        ref={inputRef}
        className="flex-1 text-black"
        placeholderTextColor={"#5c5c5c"}
        {...rest}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
      />
    </View>
  );
};

export default ThemedTextInput;
