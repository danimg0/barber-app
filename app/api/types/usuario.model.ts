export interface UsuarioDB {
  id?: number; // se autogenera en supabase
  name: string;
  email: string;
  phone: string;
  rol: number;
  password: string;
  notificaciones_actividas?: boolean;
}

export interface ClienteUsuarioDB {
  usuario: UsuarioDB;
  fecha_nacimiento: Date;
}

export interface EmpleadoUsuarioDB {
  disponible: boolean;
  foto_perfil: string;
}
