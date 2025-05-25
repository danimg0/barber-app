import React from "react";
import { ActivityIndicator, Modal, ModalProps, View } from "react-native";
import ThemedButton from "./ThemedButton";
import ThemedText from "./ThemedText";

interface Props extends ModalProps {
  textBody: string;
  onClose: () => void;
  loading: boolean;
  onConfirm: () => void;
}

const ThemedDeleteModal = ({
  textBody,
  onClose,
  loading,
  onConfirm,
  ...rest
}: Props) => {
  return (
    <Modal animationType="fade" transparent {...rest}>
      {/* overlay */}
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
      >
        <View className="bg-white rounded-xl w-[70%] p-4 flex items-center justify-center">
          {loading ? (
            <ActivityIndicator />
          ) : (
            <>
              <ThemedText textBlack className="text-center">
                {textBody}
              </ThemedText>
              <View className="flex flex-row">
                <ThemedButton onPress={onClose}>
                  <ThemedText className="text-gray-500">Cancelar</ThemedText>
                </ThemedButton>
                <ThemedButton onPress={onConfirm}>
                  <ThemedText className="text-red-500">Confirmar</ThemedText>
                </ThemedButton>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ThemedDeleteModal;
