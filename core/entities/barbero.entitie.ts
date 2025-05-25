export interface BarberoConHorario {
  id: number;
  nombre: string;
  email: string;
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
