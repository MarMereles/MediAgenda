import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";

const citasDePrueba = [
  {
    id: "1",
    paciente: "Juan Pérez",
    especialidad: "Cardiología",
    fecha: "02/12/2026",
    hora: "19:00",
    estado: "Pendiente",
  },
  {
    id: "2",
    paciente: "María Gómez",
    especialidad: "Pediatría",
    fecha: "03/12/2026",
    hora: "10:30",
    estado: "Completada",
  },
  {
    id: "3",
    paciente: "Carlos López",
    especialidad: "Dermatología",
    fecha: "04/12/2026",
    hora: "15:00",
    estado: "Pendiente",
  },
  {
    id: "4",
    paciente: "Ana Martínez",
    especialidad: "Clínica Médica",
    fecha: "05/12/2026",
    hora: "08:00",
    estado: "Cancelada",
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.titulo}>MediAgenda</Text>
        <Text style={styles.subtitulo}>Próximas consultas</Text>
      </View>

      {/* Lista desplazable de citas */}
      <ScrollView contentContainerStyle={styles.listaContainer}>
        {citasDePrueba.map((cita) => (
          <Pressable
            key={cita.id}
            style={({ pressed }) => [
              styles.tarjeta,
              pressed && styles.tarjetaPresionada, // Efecto visual al presionar
            ]}
            onPress={() => alert(`Seleccionaste la cita de: ${cita.paciente}`)}
          >
            <View style={styles.tarjetaHeader}>
              <Text style={styles.nombrePaciente}>{cita.paciente}</Text>
            </View>

            <View style={styles.especialidadEstadoContainer}>
              <Text style={styles.especialidad}>{cita.especialidad}</Text>

              <View
                style={[
                  styles.statusEstado,
                  cita.estado === "Pendiente"
                    ? styles.statusPendiente
                    : cita.estado === "Completada"
                      ? styles.statusCompletada
                      : styles.statusCancelada,
                ]}
              >
                <Text style={styles.statusText}>{cita.estado}</Text>
              </View>
            </View>

            <View style={styles.fechaHoraContainer}>
              <Text style={styles.fechaHora}>📅 {cita.fecha}</Text>
              <Text style={styles.fechaHora}>🕒 {cita.hora}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA", // Un fondo gris claro para que resalten las tarjetas
  },
  header: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A237E",
  },
  subtitulo: {
    fontSize: 16,
    color: "#757575",
    marginTop: 4,
  },
  listaContainer: {
    padding: 16,
    gap: 20, // Espacio entre tarjetas
  },
  tarjeta: {
    backgroundColor: "#eeebf5",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tarjetaPresionada: {
    backgroundColor: "#E3F2FD", // Cambia a azul claro al tocar
  },
  tarjetaHeader: {
    flexDirection: "row",
    justifyContent: "space-between", // Visto en Flexbox
    alignItems: "center",
    marginBottom: 8,
  },
  nombrePaciente: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    backgroundColor: "#ffffff", // Fondo azul claro para el nombre
    borderRadius: 300,
    padding: 8,
    paddingHorizontal: 16,

  },

  especialidadEstadoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  especialidad: {
    fontSize: 15,
    color: "#616161",
    fontWeight: "600",
  },

  fechaHoraContainer: {
    flexDirection: "row",
    gap: 16,
  },
  fechaHora: {
    fontSize: 14,
    color: "#848484",
    fontWeight: "500",
  },
  // Estilos para las etiquetas de estado
  statusEstado: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 2,
  },
  statusPendiente: {
    backgroundColor: "#FFF3E0", // Naranja claro
    borderColor: "#FFB74D",
  },
  statusCompletada: {
    backgroundColor: "#E8F5E9", // Verde claro

    borderColor: "#4CAF50",
  },
  statusCancelada: {
    backgroundColor: "#FFEBEE", // Rojo claro
    borderColor: "#F44336",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#424242",
  },
});
