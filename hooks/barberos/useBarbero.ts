import { createUpdateBarberoByIdAction } from "@/core/barberos/actions/create-update-barbero-by-id.action";
import { deleteBarberoPorIdAction } from "@/core/barberos/actions/delete-barbero.action";
import { getBarberoByIdConHorario } from "@/core/barberos/actions/get-barbero-by-id-con-horario.action";
import { BarberoBackendResponse } from "@/core/barberos/interface/barberos.interface";
import { BarberoConHorario } from "@/core/entities/barbero.entitie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

type useBarberoProps<T> = {
  id: number;
  mapper?: (barbero: BarberoBackendResponse) => T;
};

export const useBarbero = <T = any>({ id, mapper }: useBarberoProps<T>) => {
  //Con esto puedo invalidar el cache
  const queryCliente = useQueryClient();

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
      //si no tiene id, es un nuevo barbero
      await createUpdateBarberoByIdAction(data);
      return data;
    },

    onSuccess(data: BarberoConHorario) {
      console.log("Barbero guardado:", data);

      //invalidar barberos querys e invalidar cache
      queryCliente.invalidateQueries({ queryKey: ["barberos"] });
      queryCliente.invalidateQueries({ queryKey: ["barbero", id] });
      Toast.show({
        type: "success",
        text1: "Barbero guardado",
        text2: "El barbero se ha guardado correctamente",
      });
    },
    onError(error: Error) {
      console.log("Error al guardar el barbero:", error);
      Toast.show({
        type: "error",
        text1: "Error al guardar el barbero",
        text2: error.message,
      });
    },
  });

  const deleteBarberoMutation = useMutation({
    mutationFn: async () => deleteBarberoPorIdAction(id),
    onSuccess() {
      queryCliente.invalidateQueries({ queryKey: ["barberos"] });
      queryCliente.invalidateQueries({ queryKey: ["barbero", id] });
      Toast.show({
        type: "success",
        text1: "Barbero eliminado",
        text2: "El barbero se ha eliminado correctamente",
      });
    },
    onError(error: Error) {
      console.log("Error al eliminar el barbero:", error);
      Toast.show({
        type: "error",
        text1: "Error al eliminar el barbero",
      });
    },
  });

  //mantener id  del producto en caso de ser un nuevo

  return {
    barberoConHorarioPorIdQuery,
    barberoMutation,
    deleteBarberoMutation,
  };
};
