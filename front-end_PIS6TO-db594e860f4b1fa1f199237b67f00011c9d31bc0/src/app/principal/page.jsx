'use client'
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useAuth } from '@/context/AuthContext';
import { API_URL } from '@/constants';

Chart.register(...registerables);

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 65px;
  background: linear-gradient(135deg, #f6f8fc, #eef1f5);
  min-height: 100vh;
  animation: ${fadeIn} 0.8s ease-in-out;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
  color: #1e2a38;
  margin-bottom: 30px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 80%;
`;

const DataSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-right: 20px;
  margin-left: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const DataBox = styled.div`
  text-align: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const DataTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.color || '#333'};
  margin-bottom: 10px;
`;

const DataText = styled.p`
  font-size: 24px;
  color: ${props => props.color || '#555'};
`;

const ChartContainer = styled.div`
  flex: 1;
  margin-top: 20px;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export default function Session() {
  const { token } = useAuth();
  const [weatherData, setWeatherData] = useState({
    temperature: 0,
    humidity: 0,
    co2: 0,
    // date: new Date().toLocaleDateString(),
    status: 'Desconocido'
  });

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Temperatura',
        data: [],
        borderColor: 'rgba(255, 99, 132, 1)',
        yAxisID: 'temperature',
      },
      {
        label: 'Humedad',
        data: [],
        borderColor: 'rgba(54, 162, 235, 1)',
        yAxisID: 'humidity',
      },
      {
        label: 'CO2',
        data: [],
        borderColor: 'rgba(255, 206, 86, 1)',
        yAxisID: 'co2',
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/data/all`);
        const data = response.data.allData;
        const responseP = await axios.get(`${API_URL}/data`);
        const dataP = responseP.data.allData;
        const labels = dataP.map(d => new Date(d.timestamp).toLocaleDateString());
        const temperatureData = dataP.map(d => d.temperatura);
        const humidityData = dataP.map(d => d.humedad);
        const co2Data = dataP.map(d => d.co2);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Temperatura',
              data: temperatureData,
              borderColor: 'rgba(255, 99, 132, 1)',
              yAxisID: 'temperature',
            },
            {
              label: 'Humedad',
              data: humidityData,
              borderColor: 'rgba(54, 162, 235, 1)',
              yAxisID: 'humidity',
            },
            {
              label: 'CO2',
              data: co2Data,
              borderColor: 'rgba(255, 206, 86, 1)',
              yAxisID: 'co2',
            },
          ],
        });

        if (data.length > 0) {
          const latestData = data[data.length - 1];
          const weatherStatusResponse = await axios.get(`${API_URL}/weatherState`);
          const weatherStatus = weatherStatusResponse.data.response[weatherStatusResponse.data.response.length - 1].state;
          setWeatherData({
            temperature: latestData.temperatura,
            humidity: latestData.humedad,
            co2: latestData.co2,
            // date: new Date(latestData.timestamp).toLocaleDateString(),
            status: weatherStatus
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000); // Actualiza cada 5 segundos

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
  }, []);

  const { temperature, humidity, co2, status } = weatherData;

  const getStatusColor = (status) => {
    switch (status) {
      case 'BUENO':
        return '#32CD32';
      case 'REGULAR':
        return '#FFD700';
      case 'PELIGROSO':
        return 'red';
      default:
        return '#555';
    }
  };

  const options = {
    scales: {
      temperature: {
        type: 'linear',
        display: true,
        position: 'left',
        ticks: {
          color: 'rgba(255, 99, 132, 1)'
        },
        grid: {
          color: 'rgba(255, 99, 132, 0.2)'
        }
      },
      humidity: {
        type: 'linear',
        display: true,
        position: 'left',
        ticks: {
          color: 'rgba(54, 162, 235, 1)'
        },
        grid: {
          drawOnChartArea: false,
          color: 'rgba(54, 162, 235, 0.2)'
        },
        stack: 'humidity',
        axis: 'y'
      },
      co2: {
        type: 'linear',
        display: true,
        position: 'left',
        ticks: {
          color: 'rgba(255, 206, 86, 1)'
        },
        grid: {
          drawOnChartArea: false,
          color: 'rgba(255, 206, 86, 0.2)'
        },
        stack: 'co2',
        axis: 'y'
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#000'
        }
      }
    }
  };

  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(chartData.labels.map((label, index) => ({
      Fecha: label,
      Temperatura: chartData.datasets[0].data[index],
      Humedad: chartData.datasets[1].data[index],
      CO2: chartData.datasets[2].data[index],
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'datos.xlsx');
  };

  return (
    <Container>
      <Title>Análisis y Recolección de Datos</Title>
      <Content>
        <DataSection>
          <DataBox>
            <DataTitle color={getStatusColor(status)}>Estado</DataTitle>
            <DataText color={getStatusColor(status)}>{status}</DataText>
          </DataBox>
          <DataBox>
            <DataTitle>Temperatura</DataTitle>
            <DataText>{temperature}°</DataText>
          </DataBox>
          <DataBox>
            <DataTitle>Humedad</DataTitle>
            <DataText>{humidity}%</DataText>
          </DataBox>
          <DataBox>
            <DataTitle>CO2</DataTitle>
            <DataText>{co2}ppm</DataText>
          </DataBox>
        </DataSection>
        <ChartContainer>
          <Line data={chartData} options={options} />
          {token &&
            <Button onClick={handleDownloadExcel}>Descargar Datos Excel</Button>
          }
        </ChartContainer>
      </Content>
    </Container>
  );
}
