import React from "react";
import { Text, TextProps } from "react-native";

type TextType = "normal" | "h1" | "h2" | "semi-bold" | "link";

interface Props extends TextProps {
  className?: string;
  type?: TextType;
  children: string;
}

const ThemedText = ({
  className,
  type = "normal",
  children,
  ...rest
}: Props) => {
  const textType = {
    normal: "",
    h1: "text-3xl font-bold",
    h2: "text-2xl font-semibold",
    "semi-bold": "font-semibold",
    link: "text-blue-500 underline",
  };

  //El children lo podria borrar y dejar el Text como autocierre, ya que
  // viene en las propiedades del ...rest al heredar
  return (
    <Text
      className={["dark:text-white", className, textType[type]].join(" ")}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default ThemedText;
