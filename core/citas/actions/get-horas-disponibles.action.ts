import { barberApi } from "@/core/auth/api/barberApi";

export const getHorasDisponibles = async (
  id_barbero: number,
  servicios: number[],
  dia: Date
) => {
  console.log("Servicios en el action", servicios);
  let serviciosStr = "";
  servicios.map((ser) => {
    serviciosStr += ser + ",";
  });
  console.log("servicio a str", serviciosStr);

  try {
    const { data } = await barberApi.get("/citas/horas-disponibles", {
      params: {
        id_barbero,
        servicios: serviciosStr,
        dia: dia.toISOString().split("T")[0],
      },
    });

    return data;
  } catch (error) {
    throw new Error(`Ha ocurrido un error ${error}`);
  }
};
