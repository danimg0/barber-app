import {
  changePassword,
  requestResetPassword,
  resetPassword,
} from "@/core/auth/actions/auth-actions";
import { useMutation } from "@tanstack/react-query";

export function useUsuario() {
  //Mutacion para solicitar el restablecimiento de contraseña
  const requestResetMutation = useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      return requestResetPassword(email);
    },
  });

  // Mutacion para restablecer la contraseña
  const resetPasswordMutation = useMutation({
    mutationFn: async ({
      token,
      password,
    }: {
      token: string;
      password: string;
    }) => {
      console.log(
        "ResetPasswordMutation called con token:",
        token + " y password:",
        password
      );
      return resetPassword(token, password);
    },
  });

  //Mutacion para cambiar contraseña
  const changePasswordMutation = useMutation({
    mutationFn: async ({ newPassword }: { newPassword: string }) => {
      // Aquí podrías implementar la lógica para cambiar la contraseña
      // Por ejemplo, llamar a una API que maneje el cambio de contraseña

      return changePassword(newPassword);
    },
  });

  return {
    requestResetMutation,
    resetPasswordMutation,
    changePasswordMutation,
  };
}
