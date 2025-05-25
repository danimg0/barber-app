import { getBarberosConHorario } from "@/core/barberos/actions/get-barberos-con-horario.action";
import { BarberoBackendResponse } from "@/core/barberos/interface/barberos.interface";
import { useQuery } from "@tanstack/react-query";

export const useBarberos = <T>(
  mapper?: (barbero: BarberoBackendResponse[]) => T
) => {
  const barberosConHorarioQuery = useQuery({
    queryKey: ["barberos"],
    queryFn: async () => {
      const data = await getBarberosConHorario();
      if (mapper) {
        return mapper(data);
      }
      return data;
    },
  });

  return {
    barberosConHorarioQuery,
  };
};
