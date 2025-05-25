import { getUserFromRequest } from "@/backend/utils/authHelper";
import { supabase } from "@/constants/supabase";

export async function GET(request: Request): Promise<Response> {
  try {
    const { user, status, error } = await getUserFromRequest(request);

    if (error) {
      return new Response(JSON.stringify({ succes: false, message: error }), {
        status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { data, error: newError } = await supabase
      .from("servicios")
      .select("*")
      .order("precio");

    if (newError)
      return new Response(JSON.stringify({ error: error }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Error interno del servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
