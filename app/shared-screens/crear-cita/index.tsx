import useAuthStore from "@/app/auth/store/useAuthStore";
import ThemedButton from "@/components/ThemedComponents/ThemedButton";
import { ThemedDatePicker } from "@/components/ThemedComponents/ThemedDateInput";
import ThemedDropdown from "@/components/ThemedComponents/ThemedDropdown";
import ThemedMultiselect from "@/components/ThemedComponents/ThemedMultiselect";
import ThemedText from "@/components/ThemedComponents/ThemedText";
import ThemedTextInput from "@/components/ThemedComponents/ThemedTextInput";
import { ThemedView } from "@/components/ThemedComponents/ThemedView";
import { ROLE } from "@/constants/Rols";
import { BarberoConHorario } from "@/core/entities/barbero.entitie";
import { CitaUsuarioEntitie } from "@/core/entities/cita.entitie";
import { ServicioEntitie } from "@/core/servicios/servicios.interface";
import { useBarbero } from "@/hooks/barberos/useBarbero";
import { useCitaHorasDisponibles } from "@/hooks/citas/useCitaHorasDisponibles";
import { useServicios } from "@/hooks/servicios/useServicios";
import { SecureStorageAdapter } from "@/utils/helpers/adapters/secure-storage.adaptar";
import {
  getDiasTrabaja,
  getDisabledDates,
} from "@/utils/helpers/get-disabled-dates";
import { router, useLocalSearchParams } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const CrearCitaEmpleadoScreen = () => {
  const { barberoId } = useLocalSearchParams();
  const { user } = useAuthStore();
  const [fechaValida, setFechaValida] = useState(false);
  const barberoIdStr = Array.isArray(barberoId) ? barberoId[0] : barberoId;
  const { serviciosQuery } = useServicios();
  const { barberoConHorarioPorIdQuery } = useBarbero({
    id: Number(barberoIdStr),
  });
  const barberoData: BarberoConHorario = barberoConHorarioPorIdQuery.data;
  const serviciosDisponibles: ServicioEntitie[] = serviciosQuery.data ?? [];

  if (barberoConHorarioPorIdQuery.isLoading || serviciosQuery.isLoading) {
    return (
      <ThemedView className="items-center justify-center">
        <ActivityIndicator />
      </ThemedView>
    );
  }
  //@ts-expect-error
  const diasTrabaja = getDiasTrabaja(barberoData[0].horario);
  const disabledDates = getDisabledDates(diasTrabaja);

  if (user?.rol !== ROLE.ADMIN && user?.rol !== ROLE.EMPLEADO) {
    console.log("rol:", user?.rol);
    return (
      <ThemedView>
        <Text>Rol no admitido</Text>
      </ThemedView>
    );
  }

  const validate = (values: {
    nombreCliente: string;
    telefonoCliente: string;
    fecha: string;
    hora: string;
    servicios: string[];
  }) => {
    const errors: Partial<typeof values> = {};
    if (!values.nombreCliente)
      errors.nombreCliente = "Se requiere nombre cliente";
    if (!values.telefonoCliente)
      errors.telefonoCliente = "Se requiere telefono del cliente";
    if (!values.fecha) errors.fecha = "Se requiere fecha";
    if (!values.hora) errors.hora = "Se requiere hora";
    if (!/^\+\d{6,15}$/.test(values.telefonoCliente)) {
      errors.telefonoCliente =
        "El teléfono debe tener el formato +XXXXXXXXX (6-15 dígitos)";
    }
    if (!values.servicios || values.servicios.length === 0) {
      errors.servicios = ["Se requiere al menos un servicio"];
    }
    return errors;
  };

  return (
    <ThemedView className="items-center ">
      <ScrollView className="h-full w-full">
        <ThemedText type="h2" className="text-center text-white">
          Crear reserva
        </ThemedText>
        <Formik
          initialValues={{
            nombreCliente: "",
            telefonoCliente: "",
            fecha: "",
            hora: "",
            servicios: [],
          }}
          onSubmit={async (citaFinal) => {
            // console.log("anadiendo fecha", citaFinal.fecha);

            //info barbero

            try {
              const citaCompleta: CitaUsuarioEntitie = {
                idBarbero: parseInt(barberoIdStr),
                //@ts-expect-error
                nombreBarbero: barberoData[0].name,
                //@ts-expect-error
                fotoPerfil: barberoData[0].foto_perfil,
                duracionTotal: 0,
                //NO CONVERTIR A FECHA QUE SE ME JODE EL CITACARD
                //@ts-expect-error
                fechaCita: citaFinal.fecha,
                horaFin: citaFinal.hora,
                horaInicio: citaFinal.hora,
                idCita: 0,
                idCliente: -1,
                nombreCliente: citaFinal.nombreCliente,
                precioTotal: 0,
                tipoEstado: 1,
                servicios: citaFinal.servicios,
                telefono: citaFinal.telefonoCliente,
              };

              // console.log(
              //   `Guardando cita en storage: ${JSON.stringify(citaCompleta)}`
              // );

              await SecureStorageAdapter.setItem(
                "citaActualEmpleado",
                JSON.stringify(citaCompleta)
              );

              if (user.rol === ROLE.ADMIN) {
                // console.log("Redirigiendo a confirmacion cita admin");
                router.replace("/crear-cita-admin/confirmacion-cita-admin");
              } else if (user.rol === ROLE.EMPLEADO) {
                // console.log("Redirigiendo a confirmacion cita empleado");
                router.replace("/crear-cita/confirmacion-cita");
              }

              // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
              Toast.show({
                type: "error",
                text1: "Error al crear la cita",
                text2:
                  "No se pudo crear la cita. Por favor, inténtelo de nuevo.",
              });
              // console.error(error);
            }
          }}
          validate={validate}
        >
          {({
            values,
            handleSubmit,
            handleChange,
            setFieldValue,
            isValid,
            dirty,
            errors,
          }) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { horasCitaDisponiblesQuery } = useCitaHorasDisponibles(
              Number(barberoId),
              values.servicios,
              new Date(values.fecha)
            );

            return (
              <KeyboardAvoidingView className="w-full items-center flex-1 ">
                <View
                  className={`flex-1 items-center gap-y-5 mt-8 ${
                    Platform.OS === "web" ? "w-[90%] md:w-[40%]" : "w-[90%]"
                  }  `}
                >
                  {/* nombre cliente */}
                  <ThemedTextInput
                    classNameView={Platform.OS === "web" ? "p-3" : ""}
                    value={values.nombreCliente}
                    maxLength={50}
                    onChangeText={(value) =>
                      setFieldValue("nombreCliente", value)
                    }
                    icon="person-outline"
                    placeholder="Nombre y apellidos del cliente"
                  />
                  {/* telefono cliente */}
                  <ThemedTextInput
                    classNameView={Platform.OS === "web" ? "p-3" : ""}
                    icon="call-outline"
                    maxLength={9}
                    keyboardType="phone-pad"
                    value={values.telefonoCliente}
                    onChangeText={(value) => {
                      //Busca todo lo que no sea un num y lo reemplaza por nada
                      // const soloNumeros = value.replace(/[^0-9]/g, "");
                      setFieldValue("telefonoCliente", value);
                    }}
                    placeholder="Telefono del cliente"
                  />

                  {/* servicios cita */}
                  <ThemedMultiselect
                    value={values.servicios}
                    placeholder="Selecciona uno o más servicios"
                    labelField="nombre"
                    valueField="id"
                    icon={"cut-outline"}
                    renderItem={(item, selected) => (
                      <View
                        key={item.id}
                        className={`my-1 overflow-hidden flex flex-row justify-between items-center p-4 mx-2 rounded-lg ${
                          selected && "bg-dark-secondary"
                        }`}
                      >
                        <ThemedText
                          className={!selected ? "text-black" : undefined}
                        >
                          {item.nombre}
                        </ThemedText>
                        <ThemedText
                          className={!selected ? "text-black" : undefined}
                        >
                          {item.precio}€
                        </ThemedText>
                      </View>
                    )}
                    onChange={(item) => {
                      setFieldValue("hora", "");
                      setFechaValida(() => false);
                      setFieldValue("servicios", item);
                    }}
                    elementosDespegables={serviciosDisponibles}
                  />
                  {/* fecha cita */}
                  <Pressable
                    onPress={() => {
                      console.log("hola");
                    }}
                  >
                    <ThemedDatePicker
                      value={values.fecha}
                      disabledDates={disabledDates}
                      onChange={(date: Date) => {
                        setFieldValue("hora", "");
                        setFechaValida(() => false);
                        setFieldValue(
                          "fecha",
                          date.toISOString().split("T")[0]
                        );
                      }}
                      placeholder="Fecha de la cita"
                    />
                  </Pressable>
                  {/* hora cita */}
                  {values.fecha !== "" && values.servicios[0] != null ? (
                    <ThemedDropdown
                      elementosDespegables={
                        (horasCitaDisponiblesQuery.data?.horasDisponibles ?? [])
                          .length > 0
                          ? horasCitaDisponiblesQuery.data.horasDisponibles.map(
                              (hora: any) => ({
                                label: hora,
                                value: hora,
                              })
                            )
                          : [{ label: "No hay horas", value: "" }]
                      }
                      position="bottom"
                      icon="time-outline"
                      labelField="label"
                      valueField="value"
                      onChange={(item) => {
                        setFechaValida(() => true);
                        setFieldValue("hora", item.value);
                      }}
                      placeholder="Selecciona tu hora"
                      value={values.hora ?? ""}
                      renderItem={(item, selected) => (
                        <View
                          key={item.value}
                          className={`my-1 overflow-hidden flex flex-row justify-start items-center p-4 mx-2 rounded-lg ${
                            selected && "bg-dark-secondary"
                          }`}
                        >
                          <ThemedText
                            className={!selected ? "text-black" : undefined}
                          >
                            {item.label}
                          </ThemedText>
                        </View>
                      )}
                      data={[]}
                    />
                  ) : (
                    <View>
                      <ThemedText>
                        Elige primero la fecha y los servicios para ver las
                        horas disponibles
                      </ThemedText>
                    </View>
                  )}
                </View>

                <ThemedButton
                  elevation={!(isValid && dirty) ? 0 : 5}
                  icon="arrow-forward"
                  border
                  className={`mb-10 ${
                    !(isValid && dirty && fechaValida)
                      ? "bg-gray-500"
                      : "bg-light-primary"
                  }`}
                  // disabled={!(isValid && dirty)}
                  onPress={() => {
                    if (isValid && dirty && fechaValida) {
                      handleSubmit();
                    } else {
                      if (errors.nombreCliente) {
                        Toast.show({
                          type: "error",
                          text1: errors.nombreCliente,
                        });
                      } else if (errors.telefonoCliente) {
                        Toast.show({
                          type: "error",
                          text1: errors.telefonoCliente,
                        });
                      } else if (errors.servicios) {
                        Toast.show({
                          type: "error",
                          text1: Array.isArray(errors.servicios)
                            ? errors.servicios.join(", ")
                            : errors.servicios,
                        });
                      } else if (errors.fecha) {
                        Toast.show({ type: "error", text1: errors.fecha });
                      } else if (errors.hora) {
                        Toast.show({ type: "error", text1: errors.hora });
                      } else if (!fechaValida) {
                        Toast.show({
                          type: "error",
                          text1: "Por favor, selecciona una hora",
                        });
                      }
                    }
                  }}
                >
                  <ThemedText>Continuar</ThemedText>
                </ThemedButton>
              </KeyboardAvoidingView>
            );
          }}
        </Formik>
      </ScrollView>
    </ThemedView>
  );
};

export default CrearCitaEmpleadoScreen;
