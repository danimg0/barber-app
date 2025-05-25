import { mapServicioDBToEntitie } from "@/core/mappers/servicio.mapper";
import { updateCreateServicio } from "@/core/servicios/actions/create-update-servicio.action";
import { getServicioById } from "@/core/servicios/actions/get-servicio-by-id";
import { ServicioEntitie } from "@/core/servicios/servicios.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Alert } from "react-native";

export const useServicio = (servicioId: number) => {
  const servicioIdRef = useRef(servicioId); // cuando creo el producto puede ser //new | id de verdad

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
        id: servicioIdRef.current,
      }),
    onSuccess(data: ServicioEntitie) {
      servicioIdRef.current = data.id;
      queryCliente.invalidateQueries({
        queryKey: ["servicio", data.id],
      });
      //Tambien podria invalidar aqui mismo lo de los getServicios

      Alert.alert("Producto guardado", `${data.nombre} guardado correctamente`);
    },
  });

  return {
    servicioQuery,
    servicioMutation,
  };
};
