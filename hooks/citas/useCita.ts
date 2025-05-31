import { updateCreateCita } from "@/core/citas/actions/create-update-cita.action";
import { deleteCita } from "@/core/citas/actions/delete-cita-by-id.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Alert } from "react-native";
import { CitaUsuarioEntitie } from "../../core/entities/cita.entitie";

export const useCita = (citaId: number) => {
  const citaIdRef = useRef(citaId); // cuando creo el producto puede ser //new | id de verdad

  const queryCliente = useQueryClient();

  //   const citaQuery = useQuery({
  //     queryKey: ["cita", citaId],
  //     querfn
  //     queryFn: () => getServicioById(servicioId).then(mapServicioDBToEntitie),
  //   });
  //   console.log("Reserva en curso:", data);

  const citaMutation = useMutation<number, Error, CitaUsuarioEntitie>({
    mutationFn: async (data) => {
      // console.log(`data recibida en mutation: ${JSON.stringify(data)}`);
      return updateCreateCita({
        ...data,
        idCita: citaIdRef.current,
      });
    },
    onSuccess(id) {
      citaIdRef.current = id;
      queryCliente.invalidateQueries({ queryKey: ["cita", id] });
      // Alert.alert("Cita guardada", `${id} guardado correctamente`);
    },
    onError: (error) => {
      Alert.alert("Error", error.message ?? "No se pudo guardar la cita");
    },
  });

  const deleteCitaMutation = useMutation({
    mutationFn: async (idCita: number) => {
      return deleteCita(idCita);
    },
    onSuccess: () => {
      queryCliente.invalidateQueries({ queryKey: ["citas"] });
      Alert.alert("Cita eliminada", "Cita eliminada correctamente");
    },
    onError: () => {
      Alert.alert("Error al eliminar", "Error al eliminar la cita");
    },
  });

  return {
    // citaQuery,
    citaMutation,
    deleteCitaMutation,
  };
};
