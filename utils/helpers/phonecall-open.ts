import { Linking } from "react-native";

interface Props {
  phone: string;
}

export const openPhoneCall = ({ phone }: Props) => {
  Linking.openURL(`tel:${phone}`);
};
