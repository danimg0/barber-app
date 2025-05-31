// import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

//Patron adaptador para interactuar de forma segura con el SecureStorage

//Modulo nuevo instalado @react-native-async-storage/async-storage

// EL modulo instalado actualmente es npx expo install expo-secure-store
export class SecureStorageAdapter {
  static async setItem(key: string, value: string) {
    try {
      // await SecureStore.setItemAsync(key, value);
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      Alert.alert("Error", `Error en getItem de SecureStore: ${error}`);
    }
  }

  static async getItem(key: string) {
    try {
      // return await SecureStore.getItemAsync(key);
      return await AsyncStorage.getItem(key);
    } catch (error) {
      Alert.alert("Error", `Error en setItem de SecureStore: ${error}`);
    }
  }
  static async deleteItem(key: string) {
    try {
      // await SecureStore.deleteItemAsync(key);
      await AsyncStorage.removeItem(key);
    } catch (error) {
      Alert.alert("Error", `Error en deleteItem de SecureStore: ${error}`);
    }
  }
}
