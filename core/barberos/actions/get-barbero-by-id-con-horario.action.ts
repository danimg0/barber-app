import { barberApi } from "@/core/auth/api/barberApi";

export const getBarberoByIdConHorario = async (id: number) => {
  try {
    // const { data } = await barberApi.get(`/barbero/barbero-con-horario/${id}`);
    const { data } = await barberApi.get(
      `/barbero/barbero-con-horario?barberoId=${id}`
    );

    return data;
  } catch (error) {
    throw new Error(`Imposible cargar barbero ${error}`);
  }
};
