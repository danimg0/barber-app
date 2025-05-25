import { barberApi } from "@/core/auth/api/barberApi";
import { ServicioEntitie } from "../servicios.interface";

export const updateCreateServicio = (servicio: Partial<ServicioEntitie>) => {
  //Valida que esos campos sean numeros
  servicio.precio = isNaN(Number(servicio.precio))
    ? 0
    : Number(servicio.precio);
  servicio.duracion = isNaN(Number(servicio.duracion))
    ? 0
    : Number(servicio.duracion);

  if (servicio.id && servicio.id !== 0) {
    return updateServicio(servicio);
  }

  return createServicio(servicio);
};

const updateServicio = async (servicio: Partial<ServicioEntitie>) => {
  const { id, ...rest } = servicio;
  try {
    //El patch es para actualizar
    const { data } = await barberApi.patch<ServicioEntitie>(`/servicio/${id}`, {
      ...rest,
    });

    return data;
  } catch (error) {
    throw new Error(`Error al actualizar el producto ${error}`);
  }
};

//TODO: Aqui es entitie o DB
const createServicio = async (servicio: Partial<ServicioEntitie>) => {
  const { id, ...rest } = servicio;
  try {
    const { data } = await barberApi.post<ServicioEntitie>(`/servicio`, {
      ...rest,
    });

    return data;
  } catch (error) {
    throw new Error(`Error al actualizar el producto ${error}`);
  }
};
