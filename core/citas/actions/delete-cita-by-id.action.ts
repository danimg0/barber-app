import { barberApi } from "@/core/auth/api/barberApi";

export const deleteCita = async (citaId: number) => {
  try {
    console.log("Llamado a la action de borrar cita");
    const { data } = await barberApi.delete(`/citas/cita-cliente/${citaId}`);

    return data;
  } catch (error) {
    //Lanzar el error para que lo coja el useCita, si no no detecta el error
    throw new Error(`Error al borrar la cita: ${error}`);
  }
};
