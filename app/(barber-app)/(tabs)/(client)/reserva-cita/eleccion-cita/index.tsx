import useAuthStore from "@/app/auth/store/useAuthStore";
import BarberoCard from "@/components/BarberoCard";
import ThemedButton from "@/components/ThemedComponents/ThemedButton";
import ThemedMultiselect from "@/components/ThemedComponents/ThemedMultiselect";
import ThemedText from "@/components/ThemedComponents/ThemedText";
import { ThemedView } from "@/components/ThemedComponents/ThemedView";
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
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { ThemedDatePicker } from "../../../../../../components/ThemedComponents/ThemedDateInput";
import ThemedDropdown from "../../../../../../components/ThemedComponents/ThemedDropdown";

const SeleccionCitaScreen = () => {
  const { barberoId } = useLocalSearchParams();
  const { user } = useAuthStore();
  const [showCalendar, setShowCalendar] = useState(false);
  const barberoIdStr = Array.isArray(barberoId) ? barberoId[0] : barberoId;
  const inputRef = useRef<TextInput>(null);
  const { serviciosQuery } = useServicios();
  const { barberoConHorarioPorIdQuery } = useBarbero({
    id: parseInt(barberoIdStr),
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

  const validate = (values: {
    fecha: string;
    hora: string;
    servicios: string[];
  }) => {
    const errors: Partial<typeof values> = {};
    if (!values.fecha) errors.fecha = "Se requiere fecha";
    if (!values.hora) errors.hora = "Se requiere hora";
    if (!values.servicios || values.servicios.length === 0) {
      errors.servicios = ["Se requiere al menos un servicio"];
    }
    return errors;
  };

  return (
    <ThemedView className="items-center">
      <ThemedText type="h2">Selecciona tu cita</ThemedText>
      <BarberoCard
        disponible={barberoData.disponible}
        foto={barberoData.foto}
        nombre={barberoData.nombre}
        onPress={() => {}}
        seleccionado
        className={"w-[90%]"}
      />
      <ThemedText className="my-4" type="h3">
        Fecha
      </ThemedText>
      <Formik
        initialValues={{
          idBarbero: "",
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
              fechaCita: citaFinal.fecha,
              horaFin: citaFinal.hora,
              horaInicio: citaFinal.hora,
              idCita: 0,
              idCliente: user?.id || -1,
              nombreCliente: user?.name || "",
              precioTotal: 0,
              tipoEstado: "",
              servicios: citaFinal.servicios,
            };

            // console.log(`Guardando cita en storage: ${citaCompleta}`);

            await SecureStorageAdapter.setItem(
              "citaActual",
              JSON.stringify(citaCompleta)
            );

            router.replace("/reserva-cita/confirmacion-reserva");
          } catch (error) {
            Alert.alert("Error", "No se pudo guardar la cita");
            // console.error(error);
          }
        }}
        validate={validate}
      >
        {/* Propiedades de formik para el formulario */}
        {({
          values,
          handleSubmit,
          handleChange,
          setFieldValue,
          //La combinacion de los 2 sirve para validar que todo este bien y para que el form no se envie vacio o sin cambios
          isValid, // cuando todos los campos pasan las reglas de validacion
          dirty, // es true si el usuario ha cambiado algo de los valores iniciales, si no es false
        }) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const { horasCitaDisponiblesQuery } = useCitaHorasDisponibles(
            Number(barberoId),
            values.servicios,
            new Date(values.fecha)
          );
          return (
            <KeyboardAvoidingView className="flex-1">
              <View className="flex-1 w-[80%] items-center">
                <View className="mt-4">
                  <ThemedDatePicker
                    value={values.fecha}
                    onChange={(date: Date) => {
                      setFieldValue("fecha", date.toISOString().split("T")[0]);
                    }}
                    placeholder="Elige una fecha"
                    inputRef={inputRef}
                  />
                </View>

                {/* servicios */}
                <ThemedText type="h3" className="mt-4">
                  Servicios
                </ThemedText>
                <View className="mt-4 min-w-[113%]">
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
                </View>
                {/* hora */}
                <ThemedText type="h3" className="mt-4">
                  Hora
                </ThemedText>
                {values.fecha != "" && values.servicios[0] != null ? (
                  <View className="mt-4 min-w-[113%]">
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
                      icon="time-outline"
                      labelField="label"
                      valueField="value"
                      dropdownPosition="top"
                      onChange={(item) => setFieldValue("hora", item.value)}
                      placeholder="Selecciona tu hora"
                      value={values.hora}
                      renderItem={(item, selected) => (
                        <View
                          key={item.value}
                          className={`my-1 overflow-hidden flex flex-row justify-between items-center p-4 mx-2 rounded-lg ${
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
                  </View>
                ) : (
                  <ThemedText className="text-center text-white mt-3">
                    Elige la fecha y los servicios para ver las horas
                    disponibles
                  </ThemedText>
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
                    router.replace("/reserva-cita/confirmacion-reserva");
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

export default SeleccionCitaScreen;
