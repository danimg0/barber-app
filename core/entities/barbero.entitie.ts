export interface BarberoConHorario {
  id: number;
  nombre: string;
  email: string;
  phone: string;
  password?: string; // opcional, solo si se necesita para crear o actualizar
  disponible: boolean;
  foto: string;
  rol: number;
  horario: Record<string, { hora_inicio: string; hora_fin: string }[]>;
}

export interface BarberoEleccionCard {
  id: number;
  nombre: string;
  foto: string;
  disponible: boolean;
}
