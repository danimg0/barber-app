import { getCitasByUser } from "@/core/citas/actions/get-citas.actions";
import { CitaBDResponse } from "@/core/citas/interface/citas.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

type useCitasProps<T> = {
  rol: number;
  id?: number;
  pageSize?: number;
  mapper?: (cita: CitaBDResponse[]) => T; //la t es un generico
};

export const useCitas = <T = any>({
  rol,
  id,
  pageSize = 20,
  mapper,
}: useCitasProps<T>) => {
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

  return {
    citasQuery,

    //Metodos
    loadNextPage: citasQuery.fetchNextPage,
  };
};
