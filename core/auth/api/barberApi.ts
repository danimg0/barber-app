import { SecureStorageAdapter } from "@/utils/helpers/adapters/secure-storage.adaptar";
import axios from "axios";
import { Platform } from "react-native";

const STAGE = process.env.EXPO_PUBLIC_STAGE || "dev";

const fixProtocol = (url: string | undefined) => {
  if (!url) return undefined;
  return url.replace("exp://", "http://");
};

export const API_URL = fixProtocol(
  STAGE === "prod"
    ? process.env.EXPO_PUBLIC_API_URL
    : Platform.OS === "ios"
    ? process.env.EXPO_PUBLIC_API_URL_IOS
    : process.env.EXPO_PUBLIC_API_URL_ANDROID
);
const barberApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Al inicio del archivo después de definir API_URL
console.log("API URL:", API_URL);
console.log("ENV VARS:", {
  STAGE: process.env.EXPO_PUBLIC_STAGE,
  API_URL: process.env.EXPO_PUBLIC_API_URL,
  API_URL_IOS: process.env.EXPO_PUBLIC_API_URL_IOS,
  API_URL_ANDROID: process.env.EXPO_PUBLIC_API_URL_ANDROID,
});

barberApi.interceptors.request.use(async (config) => {
  const token = await SecureStorageAdapter.getItem("token");

  //Verificamos que tengamos el token en el storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { barberApi };
