import { ServicioEntitie } from "@/core/servicios/servicios.interface";
import { Ionicons } from "@expo/vector-icons";
import React, { JSXElementConstructor, ReactElement } from "react";
import { MultiSelect } from "react-native-element-dropdown";

interface Props {
  icon: keyof typeof Ionicons.glyphMap;
  onChange: (item: any) => void;
  renderItem?: (
    item: any,
    selected?: boolean | undefined
  ) => ReactElement<unknown, string | JSXElementConstructor<any>> | null;
  elementosDespegables: string[] | ServicioEntitie[];
  value: any[];
  labelField: string;
  valueField: string;
  placeholder: string;
}

const ThemedMultiselect = ({
  elementosDespegables,
  onChange,
  icon,
  renderItem,
  labelField,
  value,
  valueField,
  placeholder,
}: Props) => {
  return (
    <MultiSelect
      maxHeight={400}
      style={{
        backgroundColor: "white",
        width: "100%",
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#d1d5db", // gris claro, igual que border-gray-300
        paddingHorizontal: 4,
        paddingVertical: 11,
        minHeight: 44,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
      //TODO: cambiar fontFamily a merriweather
      placeholderStyle={{
        color: "#5c5c5c", // igual que placeholderTextColor
        fontSize: 14,
      }}
      alwaysRenderSelectedItem
      //Container de abajo
      selectedStyle={{
        borderRadius: 16,
        backgroundColor: "grey",
      }}
      //Texto de los containers de abajo
      selectedTextStyle={{
        color: "white", // texto negro
        fontSize: 13,
      }}
      //Esto es para los contenedores de abajo
      // renderSelectedItem={() => <ThemedText>hola</ThemedText>}
      //Items del dropdown
      renderItem={renderItem}
      renderLeftIcon={() => (
        <Ionicons name={icon} size={24} className="ml-2 mr-4" />
      )}
      data={elementosDespegables}
      labelField={labelField}
      valueField={valueField}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      visibleSelectedItem={value.length !== 0}
    />
  );
};

export default ThemedMultiselect;
