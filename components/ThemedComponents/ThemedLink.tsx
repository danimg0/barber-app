import { Link, LinkProps } from "expo-router";
import React from "react";

//String o objeto
interface Props extends LinkProps {
  //El children podemos tomarlo pero en realidad no
  //  hace falta porque el LinkProps ya acepta texto como un children
  className?: string;
}

const ThemedLink = ({ className, ...rest }: Props) => {
  return <Link {...rest} className={`${className} text-blue-400 `} />;
};

export default ThemedLink;
