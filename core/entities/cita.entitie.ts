import { ServicioEntitie } from "../servicios/servicios.interface";

export interface CitaUsuarioEntitie {
  idCita: number;
  idCliente: number;
  idBarbero: number;
  fechaCita: Date;
  horaInicio: string;
  horaFin: string;
  nombreBarbero: string;
  nombreCliente: string;
  fotoPerfil: string;
  tipoEstado?: string;
  servicios: ServicioEntitie[];
  precioTotal: number;
  duracionTotal: number;
}
