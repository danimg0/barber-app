import { CitaEmpleadoEntitie } from "@/core/entities/cita.entitie";

//Group by fecha para el section list
export const agruparCitas = (citas: CitaEmpleadoEntitie[]) => {
  console.log("Citas recibidas:", citas);

  // Un record es como un dict de python o el map de java
  const citasAgrupadas: Record<string, CitaEmpleadoEntitie[]> = {};

  citas.map((cita) => {
    console.log("Revisando cita", JSON.stringify(cita));

    const fechaEsp = new Date(cita.fecha).toLocaleDateString("es-ES");

    if (!citasAgrupadas[fechaEsp]) {
      //Si no existe esa clave, la tengo que crear con el array vacio
      citasAgrupadas[fechaEsp] = [];
    }
    //Anado la cita a esa fecha
    citasAgrupadas[fechaEsp].push(cita);
  });

  // console.log("Citas agrupadas:", citasAgrupadas);

  /* Object.entries devuelve un array de clave / valor
          Es decir si el objeto es:
            const citasAgrupadas = {
              "2025-05-28": [cita1, cita2],
              "2025-05-29": [cita3],
            };
          Lo convierte a:
            [
              ["2025-05-28": [cita1, cita2]],
              ["2025-05-29": [cita3]],
            ]

     */
  const resultado: { title: string; data: CitaEmpleadoEntitie[] }[] =
    Object.entries(citasAgrupadas).map(([fecha, citas]) => ({
      title: fecha,
      data: citas,
    }));
  return resultado;
};
