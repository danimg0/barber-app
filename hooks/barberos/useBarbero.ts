import { getBarberoByIdConHorario } from "@/core/barberos/actions/get-barbero-by-id-con-horario.action";
import { BarberoBackendResponse } from "@/core/barberos/interface/barberos.interface";
import { BarberoConHorario } from "@/core/entities/barbero.entitie";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert } from "react-native";

type useBarberoProps<T> = {
  id: number;
  mapper?: (barbero: BarberoBackendResponse) => T;
};

export const useBarbero = <T = any>({ id, mapper }: useBarberoProps<T>) => {
  const barberoConHorarioPorIdQuery = useQuery({
    queryKey: ["barbero", id],
    queryFn: async () => {
      const data = await getBarberoByIdConHorario(id);
      if (mapper) {
        return mapper(data[0]);
      }

      return data;
    },
    // staleTime: 1000 * 60 * 60, //1 hora
  });

  //todo
  //mutacion
  const barberoMutation = useMutation({
    mutationFn: async (data: BarberoConHorario) => {
      //todo: disparar la accion de guardar
      console.log({ data });

      return data;
    },

    onSuccess(data: BarberoConHorario) {
      //invalidar barberos querys e invalidar cache

      Alert.alert("Barbero guardado", `${data.nombre} guardado to perfe`);
    },
  });

  //mantener id  del producto en caso de ser un nuevo

  return {
    barberoConHorarioPorIdQuery,
    barberoMutation,
  };
};
