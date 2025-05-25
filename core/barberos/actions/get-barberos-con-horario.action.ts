import { barberApi } from "@/core/auth/api/barberApi";

export const getBarberosConHorario = async () => {
  try {
    const { data } = await barberApi.get(`/barbero/barbero-con-horario`);

    return data;
  } catch (error) {
    throw new Error(`Imposible cargar barberos ${error}`);
  }
};
