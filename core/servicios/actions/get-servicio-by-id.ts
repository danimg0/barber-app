import { barberApi } from "@/core/auth/api/barberApi";
import { ServicioDBResponse, ServicioEntitie } from "../servicios.interface";

const servicioVacio: ServicioEntitie = {
  id: 0,
  nombre: "",
  activo: true,
  descripcion: "",
  duracion: 20,
  precio: 10,
};

export const getServicioById = async (servicioId: number) => {
  if (servicioId === 0) return servicioVacio;

  try {
    const { data } = await barberApi.get<ServicioDBResponse>(
      `/servicios/get-servicio/${servicioId}`
    );

    return data;
  } catch (error) {
    throw new Error(`Error al traer el producto ${error}`);
  }
};
