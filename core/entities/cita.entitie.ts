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

export interface CitaEmpleadoEntitie {
  id: number;
  barberoId: number;
  fecha: Date;
  horaInicio: string;
  estado: Estado;
  cliente: Cliente;
  servicios: Servicio[];
}

export interface InvitadoEntitie {
  nombreInv: string;
  telefonoInv: string;
}

export interface Cliente {
  id: number | null;
  nombre: string;
  telefono: string;
}

export interface Estado {
  id: number;
  tipo: string;
}

export interface Servicio {
  id: number;
  nombre: string;
  precio: number;
  duracion: number;
}
