import { mapServicioDBToEntitie } from "@/core/mappers/servicio.mapper";
import { updateCreateServicio } from "@/core/servicios/actions/create-update-servicio.action";
import { deleteServicio } from "@/core/servicios/actions/delete-servicio-by-id.action";
import { getServicioById } from "@/core/servicios/actions/get-servicio-by-id";
import { ServicioEntitie } from "@/core/servicios/servicios.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export const useServicio = (servicioId: number) => {
  //new | id de verdad

  const queryCliente = useQueryClient();

  const servicioQuery = useQuery({
    queryKey: ["servicio", servicioId],
    queryFn: () => getServicioById(servicioId).then(mapServicioDBToEntitie),
  });

  const servicioMutation = useMutation({
    // EL problema es que al disparar la mutacion la data va a ir con el id new
    mutationFn: async (data: ServicioEntitie) =>
      updateCreateServicio({
        ...data,
        //Ya con esto siempre tengo bien el id
        id: servicioId,
      }),
    onSuccess(data: ServicioEntitie) {
      console.log("Servicio guardado correctamente", data.id);
      queryCliente.invalidateQueries({
        queryKey: ["servicios"],
      });
      queryCliente.invalidateQueries({
        queryKey: ["servicio", data.id],
      });
      //Tambien podria invalidar aqui mismo lo de los getServicios
      Toast.show({
        type: "success",
        text1: `Servicio '${data.nombre}' añadido correctamente`,
        position: "top",
        visibilityTime: 3000,
      });
    },
    onError(error: Error) {
      console.log("Error al guardar el servicio", error);

      Toast.show({
        type: "error",
        text1: "Error al guardar el servicio",
        position: "top",
        visibilityTime: 3000,
      });
    },
  });

  const deleteServicioMutation = useMutation({
    mutationFn: async () => deleteServicio(servicioId),
    onSuccess() {
      queryCliente.invalidateQueries({ queryKey: ["servicios"] });
      Toast.show({
        type: "success",
        text1: "Servicio eliminado correctamente",
        position: "top",
        visibilityTime: 3000,
      });
    },
    onError(error: Error) {
      console.log("Error al eliminar el servicio", error);
      Toast.show({
        type: "error",
        text1: error.message || "Error al eliminar el servicio",
        position: "bottom",
        visibilityTime: 3000,
      });
    },
  });

  return {
    servicioQuery,
    servicioMutation,
    deleteServicioMutation,
  };
};
