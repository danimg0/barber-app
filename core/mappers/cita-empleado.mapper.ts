import { CitaEmpleadoDBResponse } from "../citas/interface/citas.interface";
import { CitaEmpleadoEntitie } from "../entities/cita.entitie";

export const MapperCitaEmpleadoDBToEntitie = (
  citaDB: CitaEmpleadoDBResponse
): CitaEmpleadoEntitie => {
  const citaMapeada: CitaEmpleadoEntitie = {
    id: citaDB.id,
    barberoId: citaDB.id_peluquero,
    cliente: {
      id: citaDB.cliente.id,
      nombre: citaDB.cliente.usuario.name,
      telefono: citaDB.cliente.usuario.phone,
    },
    estado: { id: citaDB.estado.id, tipo: citaDB.estado.tipo_estado },
    fecha: citaDB.fecha_cita,
    horaInicio: citaDB.hora_inicio,
    servicios: citaDB.servicios.map((ser) => ({
      id: ser.servicio.id,
      nombre: ser.servicio.nombre,
      precio: ser.servicio.precio,
      duracion: ser.servicio.duracion,
    })),
  };

  return citaMapeada;
};

export const MapperCitasEmpleadoDBToEntitie = (
  citas: CitaEmpleadoDBResponse[]
) => {
  return citas.map((cita) => MapperCitaEmpleadoDBToEntitie(cita));
};
