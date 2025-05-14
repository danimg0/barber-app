import { authCheckStatus, authLogin } from "@/core/actions/auth-actions";
import { User } from "@/core/auth/interface/user";
import { SecureStorageAdapter } from "@/utils/helpers/adapters/secure-storage.adaptar";
import { create } from "zustand";

export type AuthStatus =
  | "unauthenticated"
  | "authenticated"
  | "checking"
  | "error";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  //Se va a usar zunstand para el manejo de estados

  // Regresa un booleano si el login fue bien
  login: (email: string, password: string) => Promise<boolean>;
  //Determina el estado de la autenticacion en el json o en el token
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;

  //Le tengo que poner lo de promise cuando la funcion es async
  changeStatus: (token?: string, user?: User) => Promise<boolean>;
}

// El get nos da acceso a todo el state
const useAuthStore = create<AuthState>()((set, get) => ({
  // Propoerties
  //Cuando la aplicacion se monta, el estado siempre sera checking, luego se llama al checkStatus
  // y ya se cambia al que sea el estado
  status: "checking",
  token: undefined,
  user: undefined,

  //Para usar esta funcion en el checkStatus y en el login, llamamos a changeStatus
  changeStatus: async (token?: string, user?: User) => {
    if (!token || !user) {
      console.log("Deslogeandose por token:", token, " o user:", user);
      //Si la respuesta es nula, no esta autenticado. Hacemos limpieza de valores
      console.log("Usuario NO autenticado");
      set({ status: "unauthenticated", token: undefined, user: undefined });
      await SecureStorageAdapter.deleteItem("token");
      return false;
    }
    //Si la respuesta no es nula, llamamos al set para cambiar el estado, nuestra funcion dispatcher
    console.log("Usuario autenticado");
    set({
      status: "authenticated",
      token: token,
      user: user,
    });

    await SecureStorageAdapter.setItem("token", token);
    console.log("token actualizado:", token);

    return true;
  },

  //En los gestores de estado es donde normalmente llamaremos a las actions
  //Metodos (en verda en zunstand se les llama acciones)
  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);
    return get().changeStatus(resp?.token, resp?.user);
  },

  checkStatus: async () => {
    console.log("Checkeando status");
    const resp = await authCheckStatus();
    console.log("Resp en el checkStatus:", resp);
    await get().changeStatus(resp?.token, resp?.user);
  },

  logout: async () => {
    console.log("Deslogeandose");
    await SecureStorageAdapter.deleteItem("token");
    set({ status: "unauthenticated", token: undefined, user: undefined });
  },
}));

export default useAuthStore;
