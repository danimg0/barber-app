import { barberApi } from "@/core/auth/api/barberApi";
import { CitaUsuarioEntitie } from "@/core/entities/cita.entitie";

interface CitaParaDB {
  id_cita?: number;
  id_cliente?: number;
  id_peluquero?: number;
  fecha_cita?: Date;
  hora_inicio?: string;
  hora_fin?: string;
  estado?: string;
  servicios?: number[];
  nombreCliente?: string;
  telefono?: string;
}

export const updateCreateCita = (cita: CitaUsuarioEntitie) => {
  //Valida que esos campos sean numeros
  //   cita.precio = isNaN(Number(cita.precio)) ? 0 : Number(cita.precio);
  //   cita.duracion = isNaN(Number(cita.duracion)) ? 0 : Number(cita.duracion);
  console.log("estado", cita.tipoEstado);

  const citaMapeada: CitaParaDB = {
    id_cita: cita.idCita,
    id_cliente: cita.idCliente,
    id_peluquero: cita.idBarbero,
    fecha_cita: cita.fechaCita,
    hora_inicio: cita.horaInicio,
    hora_fin: cita.horaFin,
    estado: cita.tipoEstado,
    //@ts-expect-error
    servicios: cita.servicios,
    nombreCliente: cita.nombreCliente,
    telefono: cita.telefono,
  };

  if (cita.idCita && cita.idCita !== 0) {
    return updateCita(citaMapeada);
  }

  return createCita(citaMapeada);
};

const updateCita = async (cita: Partial<CitaParaDB>) => {
  const { id_cita, ...rest } = cita;
  try {
    //El patch es para actualizar
    const { data } = await barberApi.patch<number>(`/citas/${id_cita}`, {
      ...rest,
    });

    return data;
  } catch (error) {
    throw new Error(`Error al actualizar la cita ${error}`);
  }
};

const createCita = async (cita: Partial<CitaParaDB>) => {
  const { id_cita, ...rest } = cita;

  console.log(`Se va a crear la cita ${JSON.stringify(cita)}`);

  try {
    const { data } = await barberApi.post<number>(`/citas`, {
      ...rest,
    });

    return data;
  } catch (error) {
    throw new Error(`Error al crear la cita ${error}`);
  }
};
