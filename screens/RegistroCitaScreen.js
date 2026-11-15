import React, { useState } from "react";
import {View,Text,TextInput,StyleSheet,Pressable,ScrollView,Alert,} from "react-native";
import { useCitas } from "../context/CitasContext";

export default function RegistroCitaScreen({ navigation }) {
  const { agregarCita } = useCitas();
  const [paciente, setPaciente] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  const manejarGuardado = () => {
    // Validación (Clase 3)
    if (!paciente.trim() ||!especialidad.trim() ||!fecha.trim() ||!hora.trim()) {
      Alert.alert("Campos incompletos","Completá todos los campos del formulario.",);
      return;
    }

    agregarCita({ paciente, especialidad, fecha, hora, estado: "Pendiente" });
    Alert.alert("Éxito", "Cita registrada correctamente");
    navigation.goBack(); // Vuelve a Home (Stack)
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Registrar Nueva Cita</Text>
        <Text style={styles.subtitulo}>Listado de Pacientes</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Registrar Nueva Cita</Text>
        <Text style={styles.subtitulo}>Ingresa los datos del paciente</Text>

        <Text style={styles.label}>Nombre del Paciente</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Juan Pérez"
          value={paciente}
          onChangeText={setPaciente}
        />

        <Text style={styles.label}>Especialidad</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Cardiología"
          value={especialidad}
          onChangeText={setEspecialidad}
        />

        <Text style={styles.label}>Fecha (DD/MM/AAAA)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: 02/12/2026"
          value={fecha}
          onChangeText={setFecha}
        />

        <Text style={styles.label}>Hora (HH:MM)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: 19:00"
          value={hora}
          onChangeText={setHora}
        />

        <Pressable style={styles.btnGuardar} onPress={manejarGuardado}>
          <Text style={styles.btnText}>Guardar Cita</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#F5F7FA", flexGrow: 1 },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A237E",
    marginBottom: 4,
  },
  subtitulo: { fontSize: 16, color: "#757575", marginBottom: 20 },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#424242",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  btnGuardar: {
    backgroundColor: "#1A237E",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },
  btnText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
});
