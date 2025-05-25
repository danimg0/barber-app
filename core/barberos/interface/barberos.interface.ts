//repuesta backend

export interface BarberoBackendResponse {
  id: number;
  name: string;
  email: string;
  disponible: boolean;
  foto_perfil: string;
  rol: number;
  horario: Horario;
}

export interface Horario {
  [dia: string]: Horas[]; // "lunes", "martes", etc. (puede haber cualquier día o ninguno)
}

export interface Horas {
  hora_fin: string;
  hora_inicio: string;
}
