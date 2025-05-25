import { mapServiciosDBToServiciosEntitie } from "@/core/mappers/servicio.mapper";
import { getServicios } from "@/core/servicios/actions/get-servicios.action";
import { useQuery } from "@tanstack/react-query";

export const useServicios = () => {
  const serviciosQuery = useQuery({
    queryKey: ["servicios"],
    queryFn: () => getServicios().then(mapServiciosDBToServiciosEntitie),
  });

  return {
    serviciosQuery,
  };
};
