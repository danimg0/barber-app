import { SecureStorageAdapter } from "@/utils/helpers/adapters/secure-storage.adaptar";
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

console.log("API_URL seleccionada:", API_URL);

const barberApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

barberApi.interceptors.request.use(async (config) => {
  const token = await SecureStorageAdapter.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { barberApi };

// import { SecureStorageAdapter } from "@/utils/helpers/adapters/secure-storage.adaptar";
// import axios from "axios";
// import { Platform } from "react-native";

// // Detecta si estás en desarrollo o producción
// const STAGE = process.env.EXPO_PUBLIC_STAGE || "dev";

// // Usa IP local en desarrollo móvil, y rutas relativas en producción
// const API_URL =
//   STAGE === "prod"
//     ? "" // rutas relativas en producción
//     : Platform.OS === "ios"
//     ? process.env.EXPO_PUBLIC_API_URL_IOS
//     : process.env.EXPO_PUBLIC_API_URL_ANDROID;

// console.log("API_URL seleccionada:", API_URL);

// const barberApi = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Al inicio del archivo después de definir API_URL
// console.log("API URL:", API_URL);
// console.log("ENV VARS:", {
//   STAGE: process.env.EXPO_PUBLIC_STAGE,
//   API_URL: process.env.EXPO_PUBLIC_API_URL,
//   API_URL_IOS: process.env.EXPO_PUBLIC_API_URL_IOS,
//   API_URL_ANDROID: process.env.EXPO_PUBLIC_API_URL_ANDROID,
// });

// barberApi.interceptors.request.use(async (config) => {
//   const token = await SecureStorageAdapter.getItem("token");

//   //Verificamos que tengamos el token en el storage
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export { barberApi };
