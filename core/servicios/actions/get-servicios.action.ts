import { barberApi } from "@/core/auth/api/barberApi";
import { ServicioDBResponse } from "../servicios.interface";

export const getServicios = async (): Promise<ServicioDBResponse[]> => {
  try {
    const { data } = await barberApi.get("/servicios");

    return data;
  } catch (error) {
    throw new Error(`Unable to get citas: ${error}`);
  }
};
