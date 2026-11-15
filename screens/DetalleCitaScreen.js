import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useCitas } from "../context/CitasContext";

export default function DetalleCitaScreen({ route, navigation }) {
  const { cita } = route.params; // Paso de parámetros (Clase 4)
  const { cambiarEstado } = useCitas();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.tarjeta}>
        <Text style={styles.etiqueta}>Paciente</Text>
        <Text style={styles.valor}>{cita.paciente}</Text>

        <Text style={styles.etiqueta}>Especialidad</Text>
        <Text style={styles.valor}>{cita.especialidad}</Text>

        <Text style={styles.etiqueta}>Fecha y Hora</Text>
        <Text style={styles.valor}>
          {cita.fecha} a las {cita.hora}
        </Text>

        <Text style={styles.etiqueta}>Estado Actual</Text>
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

      <Text style={styles.subtituloAcciones}>Acciones</Text>

      {cita.estado !== "Completada" && (
        <Pressable
          style={[styles.btn, styles.btnCompletar]}
          onPress={() => {
            cambiarEstado(cita.id, "Completada");
            navigation.goBack();
          }}
        >
          <Text style={styles.btnText}>✅ Marcar como Completada</Text>
        </Pressable>
      )}

      {cita.estado !== "Cancelada" && (
        <Pressable
          style={[styles.btn, styles.btnCancelar]}
          onPress={() => {
            cambiarEstado(cita.id, "Cancelada");
            navigation.goBack();
          }}
        >
          <Text style={styles.btnText}>❌ Cancelar Cita</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#F5F7FA", flexGrow: 1 },
  tarjeta: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  etiqueta: {
    fontSize: 14,
    color: "#757575",
    marginTop: 10,
    fontWeight: "600",
  },
  valor: { fontSize: 18, color: "#333", marginTop: 2, fontWeight: "500" },
  statusEstado: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 8,
    borderWidth: 1,
  },
  statusPendiente: { backgroundColor: "#FFF3E0", borderColor: "#FFB74D" },
  statusCompletada: { backgroundColor: "#E8F5E9", borderColor: "#4CAF50" },
  statusCancelada: { backgroundColor: "#FFEBEE", borderColor: "#F44336" },
  statusText: { fontSize: 14, fontWeight: "bold", color: "#424242" },
  subtituloAcciones: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  btn: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  btnCompletar: { backgroundColor: "#4CAF50" },
  btnCancelar: { backgroundColor: "#F44336" },
  btnText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
});
