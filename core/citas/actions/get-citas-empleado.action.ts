import { barberApi } from "@/core/auth/api/barberApi";
import { CitaEmpleadoEntitie } from "@/core/entities/cita.entitie";
import { MapperCitasEmpleadoDBToEntitie } from "@/core/mappers/cita-empleado.mapper";
import { CitaEmpleadoDBResponse } from "../interface/citas.interface";

//limit y offset para manejar paginacion
export const getCitasByEmpleado = async (
  rol?: number,
  id?: number, // si no se le manda el id, coge del que hace la peticion
  fecha?: string,
  estado?: number
  //   fechaMax?: Date,
  //   fechaMin?: Date,
  //   limit = 4, // aun no implementado
  //   offset = 0 // aun no implementado
): Promise<CitaEmpleadoEntitie[]> => {
  try {
    //endpoint
    console.log("Fecha recibida para filtrar en action:", fecha);
    console.log("Estado recibido para filtrar en action:", estado);
    const { data } = await barberApi.get<CitaEmpleadoDBResponse[]>(
      "/citas/citas-empleado",
      {
        params: {
          rol: rol,
          idBarbero: id,
          fecha: fecha,
          estado: estado,
          // limit,
          // offset,
        },
      }
    );

    console.log("Data recibida:", JSON.stringify(data, null, 2));

    //Mapear aqui
    const citasMapeada: CitaEmpleadoEntitie[] =
      MapperCitasEmpleadoDBToEntitie(data);

    return citasMapeada;
  } catch (error) {
    throw new Error(`Imposible coger citas del empleado: ${error}`);
  }
};
