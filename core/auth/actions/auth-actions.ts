import { SecureStorageAdapter } from "@/utils/helpers/adapters/secure-storage.adaptar";
import { barberApi } from "../api/barberApi";
import { User } from "../interface/user";

export interface AuthResponse {
  id: number;
  email: string;
  name: string;
  rol: number;
  token: string;
}

// TODAS ESTAS FUNCIONES SE LLAMAN DESDE useAuthStore.ts (estado desde donde manejamos autentifacion)

/**
 * Retorna el usuario y el token, los desglosa.
 * @param data
 * @returns
 */
const returnUserToken = async (data: AuthResponse) => {
  const { id, email, name, rol, token } = data;

  const user: User = {
    id,
    email,
    name,
    rol,
  };

  return {
    user,
    token,
  };
};

//Estas funciones de actions dice Fernando que no deberian de cambiar de un framework a otro, que
//  copiando y pegando deberian de seguir funcionando exactamente igual
//Aunque el usa axios y hace las llamadas mas simple con const {data} = await loqueseaApi<AuthResponse>('/auth/endpoint')
/**
 * Llamada al backend para el login
 * @param email
 * @param password
 * @returns
 */
export const authLogin = async (email: string, password: string) => {
  email = email.toLowerCase();

  //ASI SERIA CON AXIOS
  console.log("Logeando con axios");
  try {
    // setTimeout(() => {
    //   return null;
    // }, 5000);
    const { data } = await barberApi.post<AuthResponse>("/auth/login", {
      email,
      password,
    });
    console.log("Logeo terminado");
    return returnUserToken(data);
  } catch (error) {
    console.log("error:", error);
    throw new Error("User or password not valid");
  }

  //ASI SERIA DE NORMAL
  // try {
  //   const response = await fetch("/api/auth/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email,
  //       password,
  //     }),
  //   });

  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }

  //   const data = await response.json();
  //   return returnUserToken(data);
  // } catch (error) {
  //   console.error("Error during auth login:", error);
  //   throw error;
  // }
};

/**
 * Hace el check del estado de autentifacion
 * @returns
 */
export const authCheckStatus = async () => {
  try {
    //ASI SERIA CON AXIOS
    const token = await SecureStorageAdapter.getItem("token");
    console.log("token almacenado:", token);
    if (!token) return null;
    const { data } = await barberApi.get<AuthResponse>("/auth/check-status");

    //ASI SERIA DE NORMAL
    // const token = SecureStorageAdapter.getItem("token");
    // console.log("Token:", token);

    // const response = await fetch("api/auth/check-status", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    // });

    // console.log("response:", response);

    // const data: AuthResponse = await response.json();
    // console.log("data:", data);

    return returnUserToken(data);
  } catch (error) {
    console.error("Error checking auth status:", error);
    return null;
  }
};

//TODO: Registro
export const authRegister = async () => {
  try {
    //TODO: Add interface al post (cambiar el any)
    const { data } = await barberApi.post<any>("/auth/register", {
      name: "",
      email: "",
      phone: "",
      password: "", //TODO: Encriptar
      rol: "",
      //TODO: terminar campos
    });

    return returnUserToken(data);
  } catch (error) {
    console.log("Error: ", error);
    throw new Error("Error al registrarse");
  }
};
