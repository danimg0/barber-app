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
    //TODO: Anadir font-family que sea a cada parte
    normal: "font-merriweather",
    h1: "text-3xl font-bold font-rye",
    h2: "text-2xl font-semibold font-rye ",
    "semi-bold": "font-semibold font-merriweather",
    link: "text-blue-500 underline font-merriweather",
  };

  //El children lo podria borrar y dejar el Text como autocierre, ya que
  // viene en las propiedades del ...rest al heredar
  return (
    <Text
      className={["text-white", className, textType[type]].join(" ")}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default ThemedText;
