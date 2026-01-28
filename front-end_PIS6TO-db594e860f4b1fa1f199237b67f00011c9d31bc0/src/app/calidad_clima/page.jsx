"use client";
import mensajes from "../components/Mensajes";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Datos de ejemplo (placeholder)
const placeholderData = [
  { id: 1, fecha: "2023-05-01", temperatura: 25, presion: 1013, humedad: 60, co2: 400, id_mota: "Mota1" },
  { id: 2, fecha: "2023-05-02", temperatura: 22, presion: 1011, humedad: 55, co2: 420, id_mota: "Mota2" },
  { id: 3, fecha: "2023-05-03", temperatura: 20, presion: 1012, humedad: 70, co2: 430, id_mota: "Mota3" },
  // Agrega más datos si es necesario
];

export default function Page() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [datoClimatico, setDatoClimatico] = useState([]);
  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const [obt, setObt] = useState(false);

  useEffect(() => {
    if (!obt) {
      // Simulando la obtención de datos desde una API
      setDatoClimatico(placeholderData);
      setDatosFiltrados(placeholderData);
      setObt(true);
    }
  }, [obt]);

  const buscarDatos = () => {
    const datosPorFecha = datoClimatico.filter(dato => {
      const fechaDato = new Date(dato.fecha);
      return fechaDato.toDateString() === fechaSeleccionada.toDateString();
    });
    if (datosPorFecha.length > 0) {
      setDatosFiltrados(datosPorFecha);
    } else {
      mensajes("La fecha seleccionada no se encuentra en los datos", "Información", "info");
    }
  };

  const datosCompletos = () => {
    setDatosFiltrados(datoClimatico);
  };

  // Calcular promedios
  const promedio = (key) => {
    if (datosFiltrados.length === 0) return 0;
    const total = datosFiltrados.reduce((acc, curr) => acc + curr[key], 0);
    return (total / datosFiltrados.length).toFixed(2);
  };

  const dataPromedios = [
    { name: "Humedad", value: promedio("humedad") },
    { name: "Temperatura", value: promedio("temperatura") },
    { name: "CO2", value: promedio("co2") },
  ];

  return (
    <div className="row">
      <h1 style={{ textAlign: "center" }}>Datos Climaticos Registrados</h1>
      <div className="container-fluid">
        <div className="input-group mb-3">
          <DatePicker
            selected={fechaSeleccionada}
            onChange={(date) => setFechaSeleccionada(date)}
            className="form-control"
            placeholderText="Buscar dato"
          />
          <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={buscarDatos}>
            Buscar
          </button>
          <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={datosCompletos}>
            Datos Totales
          </button>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dataPromedios}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
