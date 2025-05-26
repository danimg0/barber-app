import { ServicioEntitie } from "@/core/servicios/servicios.interface";
import { Ionicons } from "@expo/vector-icons";
import React, { JSXElementConstructor, ReactElement } from "react";
import { Dropdown } from "react-native-element-dropdown";

interface Props {
  icon: keyof typeof Ionicons.glyphMap;
  onChange: (item: any) => void;
  renderItem?: (
    item: any,
    selected?: boolean | undefined
  ) => ReactElement<unknown, string | JSXElementConstructor<any>> | null;
  elementosDespegables: string[] | ServicioEntitie[];
  value: any[] | string;
  labelField: string;
  valueField: string;
  placeholder: string;
}

const ThemedDropdown = ({
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
    <Dropdown
      style={{
        backgroundColor: "white",
        width: "100%",
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#d1d5db",
        paddingHorizontal: 4,
        paddingVertical: 11,
        marginBottom: 10,
        minHeight: 44,
        flexDirection: "row",
        alignItems: "center",
      }}
      containerStyle={{
        borderRadius: 16,
        backgroundColor: "white",
        overflow: "hidden",
      }}
      //TODO: cambiar fontFamily a merriweather
      placeholderStyle={{
        color: "#5c5c5c",
        fontSize: 14,
      }}
      selectedTextStyle={{
        color: "black",
        fontSize: 13,
      }}
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
    />
  );
};

export default ThemedDropdown;
