import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useCitas } from "../context/CitasContext";

export default function HomeScreen({ navigation }) {
  const { citas } = useCitas();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>MediAgenda</Text>
        <Text style={styles.subtitulo}>Listado de Pacientes</Text>
      </View>

      <ScrollView contentContainerStyle={styles.listaContainer}>
        {citas.map((cita) => (
          <Pressable
            key={cita.id}
            style={({ pressed }) => [
              styles.tarjeta,
              pressed && styles.tarjetaPresionada,
            ]}
            onPress={() => navigation.navigate("DetalleCita", { cita })}
          >
            <Text style={styles.nombrePaciente}>{cita.paciente}</Text>

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
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  header: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  titulo: { fontSize: 28, fontWeight: "bold", color: "#1A237E" },
  subtitulo: { fontSize: 16, color: "#757575", marginTop: 4 },
  listaContainer: { padding: 16, gap: 12 },
  tarjeta: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    elevation: 3,
  },
  tarjetaPresionada: { backgroundColor: "#E3F2FD" },
  nombrePaciente: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
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
    flexShrink: 1,
    marginRight: 10,
  },
  fechaHoraContainer: { flexDirection: "row", gap: 16 },
  fechaHora: { fontSize: 14, color: "#9E9E9E", fontWeight: "500" },
  statusEstado: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  statusPendiente: { backgroundColor: "#FFF3E0", borderColor: "#FFB74D" },
  statusCompletada: { backgroundColor: "#E8F5E9", borderColor: "#4CAF50" },
  statusCancelada: { backgroundColor: "#FFEBEE", borderColor: "#F44336" },
  statusText: { fontSize: 12, fontWeight: "bold", color: "#424242" },
});
