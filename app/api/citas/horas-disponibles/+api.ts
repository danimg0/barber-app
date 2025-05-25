import { supabase } from "@/constants/supabase";

interface citaDia {
  id_cita: number;
  hora_inicio: string;
  duracion_total: number;
  tipo_estado: string;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id_barbero = Number(url.searchParams.get("id_barbero"));
  const servicios = url.searchParams.get("servicios");
  const dia = url.searchParams.get("dia");

  console.log("servicios recibidos", servicios);

  if (!id_barbero || !servicios || !dia) {
    return new Response(
      JSON.stringify({ success: false, error: "Faltan parámetros" }),
      { status: 400 }
    );
  }

  console.log("servicios en api antes de split", servicios);
  const arrServicios = servicios.split(",").map((ser) => Number(ser));
  console.log("servicios en api despues de split", servicios);

  console.log("servicios:", servicios);

  const { data: duracionServicios, error: errorDuracion } = await supabase
    .from("servicios")
    .select("duracion")
    .in("id", arrServicios);

  if (errorDuracion) {
    console.error("Error en consulta de servicios:", errorDuracion);
    return new Response(
      JSON.stringify({ success: false, error: errorDuracion.message }),
      { status: 500 }
    );
  }

  const { data: horarioPeluquero } = await supabase
    .from("barberos_con_horarios")
    .select("horario");

  console.log(horarioPeluquero);

  const duracionTotal =
    //DuracionServicios es el array de objetos duracion ([{duracion: 20}, {duracion: 30}])
    //Reduce es un metodo de arrays para reducir el array a un solo valor
    //El acumulador empieza en 0, servicio es cada elemento del array
    //Si existe duracion,
    duracionServicios?.reduce(
      (acumulador, servicio) => acumulador + servicio.duracion, // Se va sumando cada elemento al acumulador
      0 // Este es el valor inicial del acumulador
    );

  const { data: citas, error: errorCitas } = await supabase
    .from("citas_con_servicios")
    .select("*")
    .eq("fecha_cita", dia)
    .eq("id_peluquero", id_barbero);

  if (errorCitas) {
    console.error("Error en consulta de citas:", errorCitas);
    return new Response(
      JSON.stringify({ success: false, error: errorCitas.message }),
      { status: 500 }
    );
  }
  const citasDelDia = citas?.map((cita): citaDia => {
    return {
      id_cita: cita.id_cita,
      tipo_estado: cita.tipo_estado,
      hora_inicio: cita.hora_inicio,
      duracion_total: cita.duracion_total,
    };
  });

  const diasSemana = [
    "domingo",
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
  ];

  const fechaObj = new Date(dia);
  const diaSemana = diasSemana[fechaObj.getDay()];

  const horarioObj = horarioPeluquero?.[0]?.horario ?? {};
  const tramos = horarioObj[diaSemana] ?? [];

  if (!tramos.length) {
    return new Response(
      JSON.stringify({ success: true, horasDisponibles: [] }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
  let horasDisponibles: string[] = [];
  for (const tramo of tramos) {
    horasDisponibles = horasDisponibles.concat(
      calculaHorasDisponibles(
        duracionTotal ?? 20,
        citasDelDia ?? [],
        tramo.hora_inicio,
        tramo.hora_fin
      )
    );
  }

  return new Response(
    JSON.stringify({
      success: true,
      horasDisponibles,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

//todo: cambiar en la pagina de reserva que primero elija fecha y servicios
function calculaHorasDisponibles(
  duracionServicios: number,
  citasCogidas: citaDia[],
  inicioTramo: string,
  finTramo: string
) {
  console.log("Calculando horas en el tramo", inicioTramo, finTramo);

  // Convierte una hora "HH:mm:ss" a minutos desde medianoche
  function horaToMinutos(hora: string): number {
    const [h, m, s] = hora.split(":").map(Number);
    return h * 60 + m + Math.floor((s || 0) / 60);
  }
  function minutosToHora(minutos: number): string {
    const h = Math.floor(minutos / 60)
      .toString()
      .padStart(2, "0");
    const m = (minutos % 60).toString().padStart(2, "0");
    return `${h}:${m}`;
  }
  const inicioMin = horaToMinutos(inicioTramo);
  const finMin = horaToMinutos(finTramo);

  const citasOrdenadas = [...citasCogidas].sort(
    (a, b) => horaToMinutos(a.hora_inicio) - horaToMinutos(b.hora_inicio)
  );

  const horasDisponibles: string[] = [];
  let actual = inicioMin;

  for (; actual + duracionServicios <= finMin; ) {
    const citaSolapada = citasOrdenadas.find((cita) => {
      const citaInicio = horaToMinutos(cita.hora_inicio);
      const citaFin = citaInicio + cita.duracion_total;
      const intervaloFin = actual + duracionServicios;
      return actual < citaFin && intervaloFin > citaInicio;
    });

    if (citaSolapada) {
      const citaFin =
        horaToMinutos(citaSolapada.hora_inicio) + citaSolapada.duracion_total;
      actual = citaFin;
    } else {
      horasDisponibles.push(minutosToHora(actual));
      actual += duracionServicios;
    }
  }
  return horasDisponibles;
}
