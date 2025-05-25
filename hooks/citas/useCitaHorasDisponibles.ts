import { getHorasDisponibles } from "@/core/citas/actions/get-horas-disponibles.action";
import { useQuery } from "@tanstack/react-query";

export const useCitaHorasDisponibles = (
  idBarbero: number,
  servicios: number[],
  dia: Date
) => {
  console.log("Servicios en useCitaHoras", servicios);

  const horasCitaDisponiblesQuery = useQuery({
    queryKey: ["cita", "horas", idBarbero, servicios, dia], // al poner esos params se relanza la query
    queryFn: () => getHorasDisponibles(idBarbero, servicios, dia),
    enabled: !!idBarbero && servicios.length > 0 && !!dia,
  });

  //   const citaQuery = useQuery({
  //     queryKey: ["cita", citaId],
  //     querfn
  //     queryFn: () => getServicioById(servicioId).then(mapServicioDBToEntitie),
  //   });
  //   console.log("Reserva en curso:", data);

  return {
    // citaQuery,
    horasCitaDisponiblesQuery,
  };
};
