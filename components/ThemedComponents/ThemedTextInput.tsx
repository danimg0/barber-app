import { Ionicons } from "@expo/vector-icons";
import React, { forwardRef, useState } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface Props extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap;
  classNameView?: string;
  errorText?: string;
}

const ThemedTextInput = forwardRef<TextInput, Props>(
  ({ icon, classNameView, errorText, ...rest }, ref) => {
    const [isActive, setIsActive] = useState(false);

    return (
      <View className="w-full">
        <View
          className={` ${classNameView} w-full flex-row items-center border rounded p-1 bg-white ${
            isActive
              ? "border-red-500"
              : errorText
              ? "border-red-500"
              : "border-gray-300"
          }`}
          onTouchStart={() =>
            (ref as React.RefObject<TextInput>)?.current?.focus()
          }
        >
          {icon && (
            <Ionicons name={icon} size={24} className="ml-2 mr-3 text-black" />
          )}
          <TextInput
            autoComplete="off"
            ref={ref}
            className="flex-1 text-black"
            placeholderTextColor={"#5c5c5c"}
            {...rest}
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
          />
        </View>
        {errorText ? (
          <View className="mt-1 ml-2">
            <Text style={{ color: "#ef4444", fontSize: 12 }}>{errorText}</Text>
          </View>
        ) : null}
      </View>
    );
  }
);

ThemedTextInput.displayName = "ThemedTextInput";

export default ThemedTextInput;
