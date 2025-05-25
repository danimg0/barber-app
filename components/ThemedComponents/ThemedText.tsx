import React from "react";
import { Text, TextProps } from "react-native";

type TextType = "normal" | "h1" | "h2" | "h3" | "semi-bold" | "link";

interface Props extends TextProps {
  className?: string;
  type?: TextType;
  children: string | string[];
  textBlack?: boolean;
}

const ThemedText = ({
  className,
  type = "normal",
  children,
  textBlack,
  ...rest
}: Props) => {
  const textType = {
    //TODO: Anadir font-family que sea a cada parte
    normal: "font-merriweather",
    h1: "text-3xl font-semibold font-rye",
    h2: "text-2xl font-semibold font-rye ",
    h3: "text-xl font-semibold font-merriweather",
    "semi-bold": "text-lg font-semibold font-merriweather",
    link: "text-blue-500 underline font-merriweather",
  };

  //El children lo podria borrar y dejar el Text como autocierre, ya que
  // viene en las propiedades del ...rest al heredar
  return (
    <Text
      className={[
        textType[type],
        className,
        // Solo añade color por defecto si no hay ninguno en className
        !className?.includes("text-") &&
          (textBlack ? "text-black dark:text-black" : "text-white"),
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default ThemedText;
