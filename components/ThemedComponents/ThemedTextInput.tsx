import { Ionicons } from "@expo/vector-icons";
import React, { forwardRef, useState } from "react";
import { TextInput, TextInputProps, View } from "react-native";

interface Props extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap;
  classNameView?: string;
}

const ThemedTextInput = forwardRef<TextInput, Props>(
  ({ icon, classNameView, ...rest }, ref) => {
    const [isActive, setIsActive] = useState(false);
    // Al pulsar en el view cuenta como que está fuera del inputText, por ello creamos este ref

    return (
      <View
        className={` ${classNameView} w-full flex-row items-center border rounded p-1 bg-white ${
          isActive ? "border-red-500" : "border-gray-300"
        }`}
        onTouchStart={() =>
          (ref as React.RefObject<TextInput>)?.current?.focus()
        }
      >
        {icon && (
          <Ionicons name={icon} size={24} className="ml-2 mr-3 text-black" />
        )}
        <TextInput
          ref={ref}
          className="flex-1 text-black"
          placeholderTextColor={"#5c5c5c"}
          {...rest}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
        />
      </View>
    );
  }
);

ThemedTextInput.displayName = "ThemedTextInput";

export default ThemedTextInput;
