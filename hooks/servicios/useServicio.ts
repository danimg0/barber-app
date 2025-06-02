import { mapServicioDBToEntitie } from "@/core/mappers/servicio.mapper";
import { updateCreateServicio } from "@/core/servicios/actions/create-update-servicio.action";
import { deleteServicio } from "@/core/servicios/actions/delete-servicio-by-id.action";
import { getServicioById } from "@/core/servicios/actions/get-servicio-by-id";
import { ServicioEntitie } from "@/core/servicios/servicios.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

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

      Alert.alert("Servicio guardado", `${data.nombre} guardado correctamente`);
    },
    onError(error: Error) {
      Alert.alert("Error al guardar el servicio", error.message);
    },
  });

  const deleteServicioMutation = useMutation({
    mutationFn: async () => deleteServicio(servicioId),
    onSuccess() {
      queryCliente.invalidateQueries({ queryKey: ["servicios"] });
      Alert.alert(
        "Servicio eliminado",
        "El servicio se ha eliminado correctamente"
      );
    },
    onError(error: Error) {
      Alert.alert("Error al eliminar el servicio", error.message);
    },
  });

  return {
    servicioQuery,
    servicioMutation,
    deleteServicioMutation,
  };
};
