//Funcion para calcular las horas para un dia.
import { Horario } from "@/core/barberos/interface/barberos.interface";

interface Hora {
  hora: number;
  minutos: number;
}

// Datos de prueba para el horario de un peluquero
const horarioPrueba: Horario = {
  lunes: [
    { hora_inicio: "09:00", hora_fin: "13:00" },
    {
      hora_inicio: "16:00",
      hora_fin: "20:00",
    },
  ],
  martes: [
    { hora_inicio: "09:00", hora_fin: "13:00" },
    { hora_inicio: "16:00", hora_fin: "20:00" },
  ],
  miercoles: [
    { hora_inicio: "09:00", hora_fin: "13:00" },
    {
      hora_inicio: "16:00",
      hora_fin: "20:00",
    },
  ],
  jueves: [
    {
      hora_inicio: "09:00",
      hora_fin: "13:00",
    },
    {
      hora_inicio: "16:00",
      hora_fin: "20:00",
    },
  ],
  viernes: [
    {
      hora_inicio: "09:00",
      hora_fin: "13:00",
    },
    {
      hora_inicio: "16:00",
      hora_fin: "20:00",
    },
  ],
  sabado: [
    {
      hora_inicio: "10:00",
      hora_fin: "14:00",
    },
  ],
  domingo: [],
};

// Ejemplo de citas existentes para un día y peluquero
//todo: cambiar lo que me trae cita y cambiarle el tipo anadiendo mapper
const citasPrueba = [
  {
    id: "cita1",
    peluqueroId: "peluquero1",
    dia: "2024-06-10",
    hora_inicio: "09:20",
    servicios: [
      { nombre: "Corte", duracion: 20 },
      { nombre: "Barba", duracion: 10 },
    ],
  },
  {
    id: "cita2",
    peluqueroId: "peluquero1",
    dia: "2024-06-10",
    horaInicio: "10:00",
    servicios: [{ nombre: "Tinte", duracion: 60 }],
  },
];

// Ejemplo de servicios
const serviciosPrueba = [
  { nombre: "Corte", duracion: 20 },
  { nombre: "Barba", duracion: 10 },
  { nombre: "Tinte", duracion: 60 },
];

//todo: cambiar en la pagina de reserva que primero elija fecha y servicios
//Recibo el dia, el peluquero y su horario
function calculaHorasDisponibles(
  dia: string,
  peluqueroId: string,
  horario: Horario
) {
  //Compruebo las citas que hay para ese dia (hago aqui la llamada a la BD para ver las citas?
  //    (o las traigo como param al igual que el dia, peluquero y horario)
  //Empiezo a generar horas en los tramos de horario del peluquero cada 20 minutos.
  //Si hay una cita, compruebo los servicios que tiene esa cita.
  // Cada servicio anade un tiempo de duracion a esa cita (ese tiempo esta en la tabla servicios en la BD)
  // Deberia de calcular la duracion total aqui o en el backend?
  // Corte - 20 mins, Barba - 10 mins, Tinte - 60 mins
  //Si se tiene la cita, se sumara ese tiempo para generar la cita contigua
  // Retorno un array de horas
  //return horasDisponibles; --> ['14:30','14:50','15:50','16:10']
}

calculaHorasDisponibles("2025-12-12", "1", horarioPrueba);

// export default calculaHorasDisponibles;

//TENER EN CUENTA
// Falsear datos al final cada 20 minutos? Que hago con el arreglo de barba? 20 mins tambien?
// Como minimo se ha de poner generar 20 minutos antes del cierre, pero si el servicio seleccionado
// dura mas, no se podra elegir esa hora (en funcion de los servicios)
// Tener en cuenta los tramos horarios, un peluquero puede tener manana y tarde
