export const parseFechaIngToEsp = (fechaDate: Date) => {
  return fechaDate.toISOString().slice(0, 10).split("-").reverse().join("-");
};

export const parseFechaStrEspToIng = (fechaString: string) => {
  return fechaString.split("-").reverse().join("-");
};
