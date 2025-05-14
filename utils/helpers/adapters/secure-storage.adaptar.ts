import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

//Patron adaptador para interactuar de forma segura con el SecureStorage

// EL modulo instalado actualmente es npx expo install expo-secure-store

//Pero por lo que se ve no funciona en web, instalar y cambiar por @react-native-async-storage/async-storage
//  cuando llegue el momento
export class SecureStorageAdapter {
  static async setItem(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      Alert.alert("Error", `Error en getItem de SecureStore: ${error}`);
    }
  }

  static async getItem(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      Alert.alert("Error", `Error en setItem de SecureStore: ${error}`);
    }
  }
  static async deleteItem(key: string) {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      Alert.alert("Error", `Error en deleteItem de SecureStore: ${error}`);
    }
  }
}
