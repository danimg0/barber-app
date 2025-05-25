export const ESTADO_CITA = {
  PENDIENTE: 1,
  EN_PROCESO: 2,
  CANCELADA: 3,
  NO_PRESENTADO: 4,
  COMPLETADA: 5,
  CONFIRMADA: 6,
};

export const mapEstadoCita = (estadoStr: string): number => {
  switch (estadoStr) {
    case "pendiente":
      return ESTADO_CITA.PENDIENTE;
    case "en proceso":
      return ESTADO_CITA.EN_PROCESO;
    case "cancelada":
      return ESTADO_CITA.CANCELADA;
    case "no presentado":
      return ESTADO_CITA.NO_PRESENTADO;
    case "completada":
      return ESTADO_CITA.COMPLETADA;
    case "confirmada":
      return ESTADO_CITA.CONFIRMADA;
    default:
      return -1; // or any default number indicating unknown state
  }
};
