import {
  ServicioDBResponse,
  ServicioEntitie,
} from "../servicios/servicios.interface";

//Para mostrar la eleccion de barberos
export function mapServicioDBToEntitie(
  servicio: ServicioDBResponse
): ServicioEntitie {
  return {
    id: servicio.id,
    nombre: servicio.nombre,
    activo: servicio.activo,
    descripcion: servicio.descripcion,
    duracion: servicio.duracion,
    precio: servicio.precio,
  };
}

export function mapServiciosDBToServiciosEntitie(
  servicios: ServicioDBResponse[]
): ServicioEntitie[] {
  return servicios.map(mapServicioDBToEntitie);
}
