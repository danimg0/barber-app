import { barberApi } from "@/core/auth/api/barberApi";

export const deleteServicio = async (servicioId: number) => {
  try {
    const { data } = await barberApi.delete(`/servicios/${servicioId}`);

    return data;
  } catch (error: any) {
    //Lanzar el error para que lo coja el useCita, si no no detecta el error
    const backendErr =
      error?.response?.data?.message || "Error al eliminar el servicio";
    throw new Error(backendErr);
  }
};
