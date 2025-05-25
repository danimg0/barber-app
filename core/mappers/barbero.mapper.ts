import { BarberoBackendResponse } from "../barberos/interface/barberos.interface";
import { BarberoEleccionCard } from "../entities/barbero.entitie";

//Para mostrar la eleccion de barberos
export function mapBarberoDBToBarberoEleccion(
  barbero: BarberoBackendResponse
): BarberoEleccionCard {
  return {
    id: barbero.id,
    nombre: barbero.name,
    foto: barbero.foto_perfil,
    disponible: barbero.disponible,
  };
}

export function mapBarberosDBToBarberoEleccion(
  barberos: BarberoBackendResponse[]
): BarberoEleccionCard[] {
  return barberos.map(mapBarberoDBToBarberoEleccion);
}
