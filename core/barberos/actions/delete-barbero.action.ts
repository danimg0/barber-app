import { barberApi } from "@/core/auth/api/barberApi";

export const deleteBarberoPorIdAction = async (id: number) => {
  try {
    const { data } = await barberApi.delete(`/barbero/${id}`);

    return data;
  } catch (error) {
    //console.error(`Error al eliminar el barbero: ${error}`);
    throw new Error(`Imposible eliminar barbero ${error}`);
  }
};
