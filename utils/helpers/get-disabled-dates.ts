const diasSemana = [
  "domingo",
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado",
];

/**
 * Devuelve un array con los nombres de los días (en minúsculas) donde el barbero trabaja.
 * Solo cuenta los días con al menos un rango horario válido.
 */
export function getDiasTrabaja(horario: Record<string, any[]>): string[] {
  return Object.entries(horario)
    .filter(
      ([, horas]) =>
        Array.isArray(horas) &&
        horas.some(
          (h) =>
            h &&
            h.hora_inicio &&
            h.hora_fin &&
            h.hora_inicio !== null &&
            h.hora_fin !== null &&
            h.hora_inicio !== "" &&
            h.hora_fin !== ""
        )
    )
    .map(([dia]) => dia.toLowerCase());
}

/**
 * Devuelve un array de fechas (Date) deshabilitadas para el picker,
 * es decir, los días en los que el barbero NO trabaja en los próximos `diasAdelante` días.
 */
export function getDisabledDates(
  diasTrabaja: string[],
  diasAdelante: number = 31
): Date[] {
  const disabledDates: Date[] = [];
  const today = new Date();
  for (let i = 0; i < diasAdelante; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dia = diasSemana[date.getDay()];
    if (!diasTrabaja.includes(dia)) {
      disabledDates.push(new Date(date));
    }
  }
  return disabledDates;
}
