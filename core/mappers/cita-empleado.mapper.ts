import { CitaEmpleadoDBResponse } from "../citas/interface/citas.interface";
import {
  CitaEmpleadoEntitie,
  Cliente as ClienteEntitie,
} from "../entities/cita.entitie";

export const MapperCitaEmpleadoDBToEntitie = (
  citaDB: CitaEmpleadoDBResponse
): CitaEmpleadoEntitie => {
  // console.log("Mapeando cita:", citaDB);
  let cliente: ClienteEntitie;

  if (citaDB.cliente && citaDB.cliente.usuario) {
    cliente = {
      id: citaDB.cliente.id,
      nombre: citaDB.cliente.usuario.name,
      telefono: citaDB.cliente.usuario.phone ?? "",
    };
  } else if (citaDB.invitado) {
    cliente = {
      id: null,
      nombre: citaDB.invitado.nombreInv,
      telefono: citaDB.invitado.telefonoInv,
    };
  } else {
    cliente = {
      id: null,
      nombre: "",
      telefono: "",
    };
  }

  const citaMapeada: CitaEmpleadoEntitie = {
    id: citaDB.id,
    barberoId: citaDB.id_peluquero,
    cliente,
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

  // console.log("Cita mapeada", citaMapeada);

  return citaMapeada;
};

export const MapperCitasEmpleadoDBToEntitie = (
  citas: CitaEmpleadoDBResponse[]
) => {
  return citas.map((cita) => MapperCitaEmpleadoDBToEntitie(cita));
};
