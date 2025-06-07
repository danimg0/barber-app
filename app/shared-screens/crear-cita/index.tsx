import useAuthStore from "@/app/auth/store/useAuthStore";
import ThemedButton from "@/components/ThemedComponents/ThemedButton";
import { ThemedDatePicker } from "@/components/ThemedComponents/ThemedDateInput";
import ThemedDropdown from "@/components/ThemedComponents/ThemedDropdown";
import ThemedMultiselect from "@/components/ThemedComponents/ThemedMultiselect";
import ThemedText from "@/components/ThemedComponents/ThemedText";
import ThemedTextInput from "@/components/ThemedComponents/ThemedTextInput";
import { ThemedView } from "@/components/ThemedComponents/ThemedView";
import { ROLE } from "@/constants/Rols";
import { BarberoEleccionCard } from "@/core/entities/barbero.entitie";
import { CitaUsuarioEntitie } from "@/core/entities/cita.entitie";
import { mapBarberoDBToBarberoEleccion } from "@/core/mappers/barbero.mapper";
import { ServicioEntitie } from "@/core/servicios/servicios.interface";
import { useBarbero } from "@/hooks/barberos/useBarbero";
import { useCitaHorasDisponibles } from "@/hooks/citas/useCitaHorasDisponibles";
import { useServicios } from "@/hooks/servicios/useServicios";
import { SecureStorageAdapter } from "@/utils/helpers/adapters/secure-storage.adaptar";
import { router, useLocalSearchParams } from "expo-router";
import { Formik } from "formik";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";

const CrearCitaEmpleadoScreen = () => {
  const { barberoId } = useLocalSearchParams();
  const { user } = useAuthStore();
  const barberoIdStr = Array.isArray(barberoId) ? barberoId[0] : barberoId;
  const { serviciosQuery } = useServicios();
  const { barberoConHorarioPorIdQuery } = useBarbero({
    id: Number(barberoIdStr),
    mapper: mapBarberoDBToBarberoEleccion,
  });
  const barberoData: BarberoEleccionCard = barberoConHorarioPorIdQuery.data;
  const serviciosDisponibles: ServicioEntitie[] = serviciosQuery.data ?? [];

  if (barberoConHorarioPorIdQuery.isLoading || serviciosQuery.isLoading) {
    return (
      <ThemedView className="items-center justify-center">
        <ActivityIndicator />
      </ThemedView>
    );
  }

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
    if (values.telefonoCliente.length !== 9)
      errors.telefonoCliente = "El tlf deben ser 9 numeros";
    if (!values.servicios || values.servicios.length === 0) {
      errors.servicios = ["Se requiere al menos un servicio"];
    }
    return errors;
  };

  return (
    <ThemedView className="items-center ">
      <ThemedText type="h2">Crear reserva</ThemedText>
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
          try {
            const citaCompleta: CitaUsuarioEntitie = {
              idBarbero: parseInt(barberoIdStr),
              nombreBarbero: barberoData.nombre,
              fotoPerfil: barberoData.foto,
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
              tipoEstado: "1",
              servicios: citaFinal.servicios,
              telefono: citaFinal.telefonoCliente,
            };

            // console.log(`Guardando cita en storage: ${citaCompleta}`);

            await SecureStorageAdapter.setItem(
              "citaActualEmpleado",
              JSON.stringify(citaCompleta)
            );

            if (user.rol === ROLE.ADMIN) {
              console.log("Redirigiendo a confirmacion cita admin");
              router.replace("/crear-cita-admin/confirmacion-cita-admin");
            } else if (user.rol === ROLE.EMPLEADO) {
              console.log("Redirigiendo a confirmacion cita empleado");
              router.replace("/crear-cita/confirmacion-cita");
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (error) {
            Alert.alert("Error", "No se pudo guardar la cita");
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
                    const soloNumeros = value.replace(/[^0-9]/g, "");
                    setFieldValue("telefonoCliente", soloNumeros);
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
                    setFieldValue("servicios", item);
                  }}
                  elementosDespegables={serviciosDisponibles}
                />
                {/* fecha cita */}
                <ThemedDatePicker
                  value={values.fecha}
                  onChange={(date: Date) => {
                    setFieldValue("fecha", date.toISOString().split("T")[0]);
                  }}
                  placeholder="Fecha de la cita"
                />
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
                    onChange={(item) => setFieldValue("hora", item.value)}
                    placeholder="Selecciona tu hora"
                    value={values.hora}
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
                      Elige primero la fecha y los servicios para ver las horas
                      disponibles
                    </ThemedText>
                  </View>
                )}
                <ThemedButton
                  elevation={!(isValid && dirty) ? 0 : 5}
                  icon="arrow-forward"
                  border
                  className={` absolute bottom-10 ${
                    !(isValid && dirty) ? "bg-gray-500" : "bg-light-primary"
                  }`}
                  disabled={!(isValid && dirty)}
                  onPress={() => {
                    if (isValid && dirty) handleSubmit();
                  }}
                >
                  <ThemedText>Continuar</ThemedText>
                </ThemedButton>
              </View>
            </KeyboardAvoidingView>
          );
        }}
      </Formik>
    </ThemedView>
  );
};

export default CrearCitaEmpleadoScreen;
