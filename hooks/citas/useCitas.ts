import { supabase } from "@/constants/supabase";
import { getCitasByEmpleado } from "@/core/citas/actions/get-citas-empleado.action";
import { getCitasByUser } from "@/core/citas/actions/get-citas.actions";
import { CitaBDResponse } from "@/core/citas/interface/citas.interface";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import Toast from "react-native-toast-message";

type useCitasProps<T> = {
  rol?: number;
  id?: number;
  pageSize?: number;
  mapper?: (cita: CitaBDResponse[]) => T; //la t es un generico
  // fechaMax: Date,
  // fechaMin:Date,
  fecha?: string;
  estado?: number;
};

export const useCitas = <T = any>({
  rol,
  id,
  pageSize = 20,
  mapper,
  estado,
  fecha,
}: useCitasProps<T>) => {
  const queryClient = useQueryClient();
  //Solo funciona en web
  useFocusEffect(
    useCallback(() => {
      // console.log("Suscribiendo al canal de citas");
      const channel = supabase
        .channel("citas-all")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "citas_r_cliente_empleado",
          },
          (payload) => {
            // console.log("Nueva cita:", payload);
            Toast.show({
              type: "success",
              text1: "Nueva cita",
              text2: `Se ha creado una nueva cita`,
            });
            queryClient.invalidateQueries({
              queryKey: ["citas"],
            });
            queryClient.invalidateQueries({
              queryKey: ["citas", "infinite", rol, id],
            });
            queryClient.invalidateQueries({
              queryKey: [
                "citas",
                "infinite",
                "empleado",
                id,
                estado,
                rol,
                fecha,
              ],
            });
          }
        )
        .subscribe();

      return () => {
        console.log("Canal eliminado");
        supabase.removeChannel(channel);
      };
    }, [rol, id, queryClient])
  );

  const citasQuery = useInfiniteQuery({
    //Identificador por si acaso en otro componente requiere traer la misma informacion de ese query, y asi ayudamos a trabajar con el cache
    queryKey: ["citas", "infinite", rol, id],
    //Estos params tienen varias opciones utiles, como el nextPage, o cancelar una peticion
    queryFn: async ({ pageParam }) => {
      const data = await getCitasByUser(
        rol,
        id,
        pageSize,
        pageParam * pageSize
      );
      if (mapper) {
        return mapper(data);
      }
      return data;
    },

    initialPageParam: 0,
    //Por cuanto tiempo quiero que la data este fresca y que no vuelva a hacer la peticion
    // staleTime: 1000 * 60 * 60, //1 hora
    //el allPages es un arreglo de arreglos, ya que son arreglos de las paginas con los arreglos de las citas de dentro
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });
  // console.log("Estado recibido para filtrar en useCitas:", estado);
  const citasQueryEmpleado = useInfiniteQuery({
    queryKey: ["citas", "infinite", "empleado", id, estado, rol, fecha],
    queryFn: async ({ pageParam }) => {
      return await getCitasByEmpleado(
        rol ?? undefined,
        id ?? undefined,
        fecha ?? undefined,
        estado ?? undefined
      );
    },

    //Implementar cuando se este
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });

  return {
    citasQuery,
    citasQueryEmpleado,

    //Metodos
    loadNextPage: citasQuery.fetchNextPage,
    loadNextPageEmpleado: citasQueryEmpleado.fetchNextPage,
  };
};
