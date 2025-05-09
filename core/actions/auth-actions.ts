import { User } from "../auth/interface/user";

export interface AuthResponse {
  id: number;
  email: string;
  name: string;
  roles: number[];
  token: string;
}

// TODAS ESTAS FUNCIONES SE LLAMAN DESDE useAuthStore.ts (estado desde donde manejamos autentifacion)

/**
 * Retorna el usuario y el token, los desglosa.
 * @param data
 * @returns
 */
const returnUserToken = async (data: AuthResponse) => {
  const { id, email, name, roles, token } = data;

  const user: User = {
    id,
    email,
    name,
    roles,
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
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return returnUserToken(data);
  } catch (error) {
    console.error("Error during auth login:", error);
    throw error;
  }
};

/**
 * Hace el check del estado de autentifacion
 * @returns
 */
//TODO: hacer el checkStatus
export const authCheckStatus = async () => {
  try {
    const response = await fetch("api/auth/check-status", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: AuthResponse = await response.json();

    return returnUserToken(data);
  } catch (error) {
    console.error("Error checking auth status:", error);
    return null;
  }
};

//TODO: Logout

//TODO: Registro
