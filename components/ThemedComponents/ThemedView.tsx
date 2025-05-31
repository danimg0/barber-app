import { Platform, View, type ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  className?: string;
};

export function ThemedView({
  style,
  className,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  //useDimensions

  const insets = useSafeAreaInsets();

  let top;
  if (Platform.OS === "web") {
    top = 20; // calcular mejor de cara a la web
  } else {
    top = insets.top;
  }

  return (
    <View
      className={`bg-dark-background flex-1 ${className} `}
      style={[{ paddingTop: top }, style]}
      {...otherProps}
    />
  );
}
