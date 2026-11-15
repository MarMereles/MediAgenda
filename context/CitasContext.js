//Manual Cap. 5 - Parte 2 (Paso 9)

import React, { createContext, useContext, useState } from "react";

const CitasContext = createContext();

export function CitasProvider({ children }) {
  const [citas, setCitas] = useState([
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
  ]);

  const agregarCita = (cita) => {
    setCitas((prev) => [{ ...cita, id: Date.now().toString() }, ...prev]);
  };

  const cambiarEstado = (id, nuevoEstado) => {
    setCitas((prev) =>
      prev.map((c) => (c.id === id ? { ...c, estado: nuevoEstado } : c)),
    );
  };

  return (
    <CitasContext.Provider value={{ citas, agregarCita, cambiarEstado }}>
      {children}
    </CitasContext.Provider>
  );
}

export function useCitas() {
  return useContext(CitasContext);
}
