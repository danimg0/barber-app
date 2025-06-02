import { ApiResponse } from "@/app/api/types/responses";
import { DEFAULT_PASSWORD } from "@/constants/PasswordsDefault";
import { barberApi } from "@/core/auth/api/barberApi";
import { BarberoConHorario } from "@/core/entities/barbero.entitie";

export const createUpdateBarberoByIdAction = async (
  barbero: Partial<BarberoConHorario>
) => {
  // console.log(`Creando o actualizando barbero: ${JSON.stringify(barbero)}`);

  try {
    if (!barbero.id || barbero.id === 0) {
      return createBarbero(barbero);
    }
    return updateBarbero(barbero);
  } catch (error) {
    console.log(`Error al crear o actualizar barbero: ${error}`);

    throw new Error(`Imposible crear o actualizar barbero: ${error}`);
  }
};

const updateBarbero = async (barbero: Partial<BarberoConHorario>) => {
  const { id, ...rest } = barbero;
  try {
    const { data } = await barberApi.patch<ApiResponse>(`/barbero/${id}`, {
      name: rest.nombre,
      email: rest.email,
      phone: rest.phone,
      horario: rest.horario,
    });
    if (!data || data.success === false) {
      const msg =
        data?.message || "No se pudo crear el barbero, datos no válidos";
      console.error(`Error al crear el barbero: ${msg}`);
      throw new Error(msg);
    }
    return data;
  } catch (error) {
    throw new Error(`Error al actualizar el barbero: ${error}`);
  }
};

const createBarbero = async (barbero: Partial<BarberoConHorario>) => {
  try {
    const { id, ...rest } = barbero;

    const { data } = await barberApi.post<ApiResponse>(`/barbero`, {
      name: rest.nombre || "",
      email: rest.email || "",
      phone: rest.phone || "",
      rol: 2,
      password: DEFAULT_PASSWORD,
      horario: rest.horario || {},
      foto_perfil: rest.foto || "",
    });

    console.log(`data: ${data}`);

    if (!data || data.success === false) {
      const msg =
        data?.message || "No se pudo crear el barbero, datos no válidos";
      console.error(`Error al crear el barbero: ${msg}`);
      throw new Error(msg);
    }

    return data;
  } catch (error: any) {
    // Si el error viene del backend, intenta extraer el mensaje
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(`Error al crear el barbero: ${error.message || error}`);
  }
};
