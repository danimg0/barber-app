import { View, type ViewProps } from "react-native";
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
  const top = useSafeAreaInsets().top;

  return (
    <View
      className={`bg-dark-background flex-1 ${className} `}
      style={[{ paddingTop: top }, style]}
      {...otherProps}
    />
  );
}
