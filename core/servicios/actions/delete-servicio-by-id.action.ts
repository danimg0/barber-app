import { barberApi } from "@/core/auth/api/barberApi";

export const deleteServicio = async (servicioId: number) => {
  try {
    const { data } = await barberApi.delete(`/servicios/${servicioId}`);

    return data;
  } catch (error) {
    //Lanzar el error para que lo coja el useCita, si no no detecta el error
    throw new Error(`Error al borrar la cita: ${error}`);
  }
};
