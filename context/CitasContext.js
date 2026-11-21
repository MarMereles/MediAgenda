import React, { createContext, useContext, useState, useEffect } from "react";

const CitasContext = createContext();

const API_URL = "https://jsonplaceholder.typicode.com/users";

// Especialidades y estados posibles (para simular datos médicos)
const especialidades = [
  "Cardiología",
  "Pediatría",
  "Dermatología",
  "Clínica Médica",
  "Traumatología",
];
const estados = ["Pendiente", "Completada", "Cancelada"];

export function CitasProvider({ children }) {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para cargar las citas desde la API
  const cargarCitas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Error HTTP " + response.status);
      }
      const data = await response.json();

      // Adaptamos los datos de la API a nuestro formato de "cita médica"
      const citasAdaptadas = data.slice(0, 8).map((usuario, index) => ({
        id: usuario.id.toString(),
        paciente: usuario.name,
        especialidad: especialidades[index % especialidades.length],
        fecha: `0${(index % 9) + 1}/12/2026`,
        hora: `${(index % 12) + 8}:00`,
        estado: estados[index % estados.length],
      }));

      setCitas(citasAdaptadas);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect para cargar al montar la app (Clase 5)
  useEffect(() => {
    cargarCitas();
  }, []);

  // Funciones para agregar y cambiar estado (se mantienen de la Semana 4)
  const agregarCita = (cita) => {
    setCitas((prev) => [{ ...cita, id: Date.now().toString() }, ...prev]);
  };

  const cambiarEstado = (id, nuevoEstado) => {
    setCitas((prev) =>
      prev.map((c) => (c.id === id ? { ...c, estado: nuevoEstado } : c)),
    );
  };

  return (
    <CitasContext.Provider
      value={{ citas, loading, error, cargarCitas, agregarCita, cambiarEstado }}
    >
      {children}
    </CitasContext.Provider>
  );
}

export function useCitas() {
  return useContext(CitasContext);
}
