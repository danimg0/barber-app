import { Linking } from "react-native";
import Toast from "react-native-toast-message";

interface Props {
  phoneNumber: string;
  message?: string;
}

const openWhatsApp = async ({ phoneNumber, message }: Props) => {
  //Se formatea el numero. Elimina espacios y guines
  const formattedNumber = phoneNumber.replace(/[\s-]/g, "");

  let whatsappUrl = `whatsapp://send?phone=${formattedNumber}`;
  if (message) {
    whatsappUrl += `&text=${encodeURIComponent(message)}`;
  }

  const canOpen = await Linking.canOpenURL(whatsappUrl);

  if (canOpen) {
    await Linking.openURL(whatsappUrl);
  } else {
    try {
      let whatsapp2try = `https://wa.me/${formattedNumber}?text=hola`;
      await Linking.openURL(whatsapp2try);
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Error al abrir WhatsApp",
        text2: "Asegúrate de tener WhatsApp instalado en tu dispositivo.",
      });
    }
  }
};

export default openWhatsApp;
