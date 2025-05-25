import { CitaBDResponse } from "../citas/interface/citas.interface";
import { CitaUsuarioEntitie } from "../entities/cita.entitie";

//Para mostrar la eleccion de barberos
export function mapCitaDBToEntitie(cita: CitaBDResponse): CitaUsuarioEntitie {
  return {
    idCita: cita.id_cita,
    idCliente: cita.id_cliente,
    idBarbero: cita.id_peluquero,
    fechaCita: cita.fecha_cita,
    horaInicio: cita.hora_inicio,
    horaFin: cita.hora_fin,
    nombreBarbero: cita.nombre_peluquero,
    nombreCliente: cita.nombre_cliente,
    fotoPerfil: cita.foto_perfil,
    tipoEstado: cita.tipo_estado,
    servicios: cita.servicios,
    precioTotal: cita.precio_total,
    duracionTotal: cita.duracion_total,
  };
}

//Para un array de citas
export function mapCitasDBToCitasEntities(
  citas: CitaBDResponse[]
): CitaUsuarioEntitie[] {
  return citas.map(mapCitaDBToEntitie);
}
