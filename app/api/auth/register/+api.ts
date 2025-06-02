import { encriptar } from "@/backend/utils/authHelper";
import { supabase } from "../../../../constants/supabase";
import { UsuarioDB } from "../../types/usuario.model";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const onlyBody = body.datos;

    console.log("body recibido en la api", body.datos);

    let usuarioARegistrar: UsuarioDB = {
      name: onlyBody.name,
      email: onlyBody.email,
      phone: onlyBody.phone,
      rol: onlyBody.rol ?? 3,
      password: onlyBody.password,
    };

    if (
      !usuarioARegistrar.name ||
      !usuarioARegistrar.email ||
      !usuarioARegistrar.password ||
      !usuarioARegistrar.phone
    ) {
      console.log("Error en la api por falta de campos");
      return new Response(
        JSON.stringify({
          success: false,
          message: "Faltan campos por rellenar",
        }),
        {
          status: 400,
        }
      );
    }

    let passwordEncriptada = encriptar(usuarioARegistrar.password);
    usuarioARegistrar.password = passwordEncriptada;

    console.log("Password encriptada");

    //En Supabase hay un trigger que luego guarda en empleados o cliente en funcion del rol
    const { data, error } = await supabase
      .from("usuarios")
      .insert(usuarioARegistrar)
      .select();

    let idGenerado = data;

    if (error) {
      console.log("Error en la api", error);
      // Si el error es por email duplicado
      if (error.code === "23505") {
        console.log("error con codigo 23505");

        return new Response(
          JSON.stringify({
            success: false,
            message: "El email ya está registrado",
          }),
          { status: 400 }
        );
      }
      return new Response(JSON.stringify({ success: false, message: error }), {
        status: 400,
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Usuario registrado correctamente con id ${idGenerado}`,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: `Error tocho ${error}`,
      }),
      { status: 400 }
    );
  }
}
