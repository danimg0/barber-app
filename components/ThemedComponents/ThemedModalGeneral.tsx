import React from "react";
import { Modal, ModalProps, Platform, View } from "react-native";
import ThemedButton from "./ThemedButton";
import ThemedText from "./ThemedText";

interface Props extends ModalProps {
  onClose: () => void;
  children: any;
}

const ThemedModalGeneral = ({ onClose, visible, children }: Props) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      // onRequestClose={() => setModalVisible(false)}
      className="flex justify-center items-center w-[50%] "
    >
      <View
        className="flex-1 justify-center items-center"
        style={{
          backgroundColor: "#00000080",
        }}
      >
        <View
          className={`${
            Platform.OS === "web" ? "max-w-[50%]" : "w-full"
          } w-[90%] bg-white rounded-[10px] p-5 flex justify-center items-center`}
        >
          {children}
          <ThemedButton
            onPress={onClose}
            className="mt-2 self-center w-[95%]"
            border
            icon="close-outline"
          >
            <ThemedText textBlack>Salir</ThemedText>
          </ThemedButton>
        </View>
      </View>
    </Modal>
  );
};

export default ThemedModalGeneral;
