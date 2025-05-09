import { authCheckStatus, authLogin } from "@/core/actions/auth-actions";
import { User } from "@/core/auth/interface/user";
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

  changeStatus: (token?: string, user?: User) => boolean;
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
  changeStatus: (token?: string, user?: User) => {
    if (!token || !user) {
      //Si la respuesta es nula, no esta autenticado. Hacemos limpieza de valores
      set({ status: "unauthenticated", token: undefined, user: undefined });
      //TODO: llamar logout (para limpiar)
      return false;
    }
    //Si la respuesta no es nula, llamamos al set para cambiar el estado, nuestra funcion dispatcher
    set({
      status: "authenticated",
      token: token,
      user: user,
    });

    //TODO: guardar el token en secure storage

    return true;
  },

  //En los gestores de estado es donde normalmente llamaremos a las actions
  //Metodos (en verda en zunstand se les llama acciones)
  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);
    //Gracias al changestatus no hace falta todo lo de abajo
    return get().changeStatus(resp?.token, resp?.user);

    // if (!resp) {
    //   //Si la respuesta es nula, no esta autenticado. Hacemos limpieza de valores
    //   set({ status: "authenticated", token: undefined, user: undefined });
    //   return false;
    // }
    // //Si la respuesta no es nula, llamamos al set para cambiar el estado, nuestra funcion dispatcher
    // set({ status: "authenticated", token: resp.token, user: resp.user });

    // //TODO: guardar el token en secure storage

    // return true;
  },

  checkStatus: async () => {
    const resp = await authCheckStatus();
    get().changeStatus(resp?.token, resp?.user);
    // if (!resp) {
    //   set({ status: "authenticated", token: undefined, user: undefined });
    //   return;
    // }
    // set({ status: "authenticated", token: resp.token, user: resp.user });

    // //TODO: guardar el token en secure storage

    // return;
  },

  logout: async () => {
    //TODO: limpiar el token del secure storage
    set({ status: "unauthenticated", token: undefined, user: undefined });
  },
}));

export default useAuthStore;
