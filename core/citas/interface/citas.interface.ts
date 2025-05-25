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
