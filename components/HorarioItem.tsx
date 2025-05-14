// components/HorarioItem.tsx
import { View } from "react-native";
import ThemedText from "./ThemedComponents/ThemedText";

interface HorarioItemProps {
  dia: string;
  horarios: string[];
}

const HorarioItem = ({ dia, horarios }: HorarioItemProps) => {
  return (
    <View className="flex-row items-center ml-5 my-1">
      <ThemedText
        className="text-white min-w-[65px]  mr-5 tracking-widest"
        type="semi-bold"
      >
        {dia}:
      </ThemedText>
      <View className="flex-row flex-wrap">
        {horarios.map((horario, index) => (
          <View key={index} className="flex-row items-center">
            <ThemedText
              className="text-white tracking-widest mr-5"
              type="semi-bold"
            >
              {horario}
            </ThemedText>
            {index < horarios.length - 1 && (
              <ThemedText
                className="text-white mr-5 tracking-widest"
                type="semi-bold"
              >
                &
              </ThemedText>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default HorarioItem;
