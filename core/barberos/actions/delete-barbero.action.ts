import { barberApi } from "@/core/auth/api/barberApi";

export const deleteBarberoPorIdAction = async (id: number) => {
  console.log(`Eliminando barbero con id: ${id}`);

  try {
    const { data } = await barberApi.delete(`/barbero/${id}`);

    console.log("data delete barbero:", data);

    if (!data.success) {
      throw new Error(data.message || "No se pudo eliminar el barbero");
    }

    return data;
  } catch (error: any) {
    const backendErr = error?.response?.data?.message;
    throw new Error(backendErr);
  }
};
