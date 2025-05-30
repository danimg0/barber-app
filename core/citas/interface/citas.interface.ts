import { ServicioDBResponse } from "@/core/servicios/servicios.interface";

export interface CitaBDResponse {
  id_cita: number;
  id_cliente: number;
  id_peluquero: number;
  fecha_cita: Date;
  hora_inicio: string;
  hora_fin: string;
  nombre_peluquero: string;
  nombre_cliente: string;
  foto_perfil: string;
  tipo_estado?: string;
  servicios: ServicioDBResponse[];
  precio_total: number;
  duracion_total: number;
}

export interface CitaEmpleadoDBResponse {
  id: number;
  id_peluquero: number;
  fecha_cita: Date;
  hora_inicio: string;
  estado: Estado;
  cliente: Cliente;
  servicios: ServicioElement[];
}

export interface Cliente {
  id: number;
  usuario: Usuario;
}

export interface Usuario {
  id: number;
  name: string;
  phone: null;
}

export interface Estado {
  id: number;
  tipo_estado: string;
}

export interface ServicioElement {
  servicio: ServicioServicio;
}

export interface ServicioServicio {
  id: number;
  nombre: string;
  precio: number;
  duracion: number;
}
