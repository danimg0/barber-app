import { barberApi } from "@/core/auth/api/barberApi";

//limit y offset para manejar paginacion
export const getCitasByUser = async (
  rol: number,
  id?: number,
  limit = 4,
  offset = 0
) => {
  try {
    //endpoint
    const { data } = await barberApi.get("/citas/citas-cliente", {
      params: {
        rol,
        id,
        limit,
        offset,
      },
    });

    return data;
  } catch (error) {
    throw new Error(`Unable to get citas: ${error}`);
  }
};
