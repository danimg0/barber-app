import { updateCreateCita } from "@/core/citas/actions/create-update-cita.action";
import { deleteCita } from "@/core/citas/actions/delete-cita-by-id.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { CitaUsuarioEntitie } from "../../core/entities/cita.entitie";

export const useCita = (citaId: number) => {
  // const citaIdRef = useRef(citaId); // cuando creo el producto puede ser //new | id de verdad

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
        // idCita: citaIdRef.current,
        idCita: citaId,
      });
    },
    onSuccess(id) {
      // citaIdRef.current = id;
      queryCliente.invalidateQueries({ queryKey: ["cita", id] });
      Toast.show({
        type: "success",
        text1: "Cita guardada",
        text2: "La cita ha sido guardada correctamente",
      });
    },
    onError: (error) => {
      console.error("Error al guardar la cita:", error);
      Toast.show({
        type: "error",
        text1: "Error al guardar la cita",
        text2: "No se pudo guardar la cita, inténtalo de nuevo más tarde",
      });
    },
  });

  const deleteCitaMutation = useMutation({
    mutationFn: async (idCita: number) => {
      return deleteCita(idCita);
    },
    onSuccess: () => {
      queryCliente.invalidateQueries({ queryKey: ["citas"] });
      Toast.show({
        type: "success",
        text1: "Cita eliminada",
        text2: "La cita ha sido eliminada correctamente",
      });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Error al eliminar la cita",
        text2: "No se pudo eliminar la cita, inténtalo de nuevo más tarde",
      });
    },
  });

  return {
    // citaQuery,
    citaMutation,
    deleteCitaMutation,
  };
};
