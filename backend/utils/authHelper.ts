import { supabase } from "@/constants/supabase";
import jwt from "jsonwebtoken";
// Funciones de autenticacion y helpers

export async function getUserFromRequest(request: Request) {
  const authHeader = request.headers.get("Authorization");

  console.log("authHeader: ", authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { error: "Token no proporcionado", status: 401 };
  }

  const token = authHeader.split(" ")[1];

  if (!process.env.JWT_SECRET) {
    return { error: "JWT_SECRET not defined", status: 500 };
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string };
  } catch (error) {
    return { error: `Token inválido o expirado: ${error}`, status: 401 };
  }

  const { data: user, error: userError } = await supabase
    .from("usuarios")
    .select("id,email,name,rol")
    .eq("id", decoded.userId)
    .single();

  if (userError || !user) {
    return { error: "Usuario no encontrado", status: 404 };
  }

  return { user };
}
