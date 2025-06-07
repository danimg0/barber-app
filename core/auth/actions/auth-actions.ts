import { SecureStorageAdapter } from "@/utils/helpers/adapters/secure-storage.adaptar";
import { barberApi } from "../api/barberApi";
import { User } from "../interface/user";

export interface AuthResponse {
  id: number;
  email: string;
  phone: string;
  name: string;
  notifications: boolean;
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
  const { id, email, name, rol, token, notifications, phone } = data;

  const user: User = {
    id: id,
    email: email,
    phone: phone,
    name: name,
    notifications: notifications,
    rol: rol,
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

  try {
    setTimeout(() => {
      return null;
    }, 5000);

    const { data } = await barberApi.post<AuthResponse>("/auth/login", {
      email,
      password,
    });

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
    //console.error("Error checking auth status:", error);
    return null;
  }
};

//TODO: Registro
interface RegistroProps {
  name: string;
  email: string;
  phone: string;
  password: string;
  rol: number;
}
export const authRegister = async (datos: RegistroProps) => {
  try {
    console.log("authRegister llamado", datos);

    const { data } = await barberApi.post("/auth/register", {
      datos,
    });

    const resp = data;

    return resp;
  } catch (error) {
    // Si es un error de Axios, saca el mensaje del backend
    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      (error as any).response?.data
    ) {
      return (error as any).response.data;
    }
    // Si no, lanza un error genérico
    console.log("Error en registro en action: ", error);
    throw new Error(`Error ${error} `);
  }
};

export const requestResetPassword = async (email: string) => {
  try {
    const { data } = await barberApi.post("/auth/reset-password-email", {
      email,
    });
    console.log("data:", data);

    if (!data.success) {
      throw new Error(data.error || "Error requesting reset password");
    }

    return data;
  } catch (error: any) {
    //El .message es el mensaje del error que lanzo arriba
    throw new Error(error.message);
  }
};

export const resetPassword = async (token: string, password: string) => {
  try {
    const { data } = await barberApi.post("/auth/reset-password", {
      token,
      password,
    });

    return data;
  } catch (error) {
    //console.error("Error resetting password:", error);
    throw new Error("Error resetting password");
  }
};

export const changePassword = async (newPassword: string) => {
  try {
    const { data } = await barberApi.patch("/auth/change-password", {
      newPassword,
    });
    return data;
  } catch (error) {
    //console.error("Error changing password:", error);
    throw new Error("Error changing password");
  }
};
