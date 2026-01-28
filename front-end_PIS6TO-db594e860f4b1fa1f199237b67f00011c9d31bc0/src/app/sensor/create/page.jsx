'use client';
import mensajes from '@/app/components/Mensajes';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { get, useForm } from 'react-hook-form';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const [mota, setMotas] = useState([]);
  const [obt, setObt] = useState(false);

  const validationShema = Yup.object().shape({
    nombre: Yup.string().required('Ingrese el nombre del sensor'),
    descripcion: Yup.string().required('Ingrese la descripcion para el sensor'),
    tipo_sensor: Yup.string().required('Ingrese el tipo de sensor'),
    mota: Yup.string().required('Seleccione una mota'),
  });

  const formOptions = { resolver: yupResolver(validationShema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const roles = [
    { id: '1', name: 'ESP32', ip:'192.0.0.0' },
    { id: '2', name: 'ESP32W', ip:'172.16.0.0' }
  ];


  return (
    <div
      className="row justify-content-center"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', 
      }}
    >
      <div className="d-flex flex-column">
        <h1
          style={{
            color: '#205375',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Registrar Sensor
        </h1>
        <div
          className="container-fluid"
          style={{
            border: '4px solid #ccc',
            padding: '20px',
            borderRadius: '10px',
            width: '1000px',
            background: 'white', 
          }}
        >
          <br />
          <form className="mota">
            <div className="row mb-4">
              <div className="col">
                <input
                  {...register('nombre')}
                  name="nombre"
                  id="nombre"
                  className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                  placeholder="Ingrese un nombre para el sensor"
                  autoComplete="off"
                  style={{ fontSize: '25px' }}
                />
                <label className="form-label" style={{ color: '#1b4f72' }}>
                  Nombre
                </label>
                <div className="alert alert-danger invalid-feedback">
                  {errors.nombre?.message}
                </div>
              </div>
              <div className="col">
                <input
                  {...register('descripcion')}
                  name="descripcion"
                  id="descripcion"
                  className={`form-control ${errors.descripcion ? 'is-invalid' : ''}`}
                  placeholder="Ingrese descripcion para el sensor"
                  autoComplete="off"
                  style={{ fontSize: '25px' }}
                />
                <label className="form-label" style={{ color: '#1b4f72' }}>
                  Descripcion
                </label>
                <div className="alert alert-danger invalid-feedback">
                  {errors.descripcion?.message}
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col">
                <select
                  {...register('tipo_sensor')}
                  name="tipo_sensor"
                  id="tipo_sensor"
                  className={`form-control ${errors.tipo_sensor ? 'is-invalid' : ''}`}
                  style={{ fontSize: '25px' }}
                >
                  <option value="">Elija el tipo del sensor</option>
                  <option value="TEMPERATURA/HUMEDAD">TEMPERATURA/HUMEDAD</option>
                  <option value="C02">C02</option>
                </select>
                <label className="form-label" style={{ color: '#1b4f72' }}>
                  Tipo de Sensor
                </label>
                <div className="alert alert-danger invalid-feedback">
                  {errors.sensor?.message}
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col">
                <select
                  {...register('mota')}
                  name="mota"
                  id="mota"
                  className={`form-control ${errors.mota ? 'is-invalid' : ''}`}
                  style={{ fontSize: '25px' }}
                >
                  <option value="">Elija a que mota pertenecera</option>
                  {roles.map((aux, i) => (
                    <option key={i} value={aux.id}>
                      {`${aux.ip} ${aux.name}`}
                    </option>
                  ))}
                </select>
                <label className="form-label" style={{ color: '#1b4f72' }}>
                  Mota
                </label>
                <div className="alert alert-danger invalid-feedback">
                  {errors.sensor?.message}
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <Link
                href="/sensor"
                className="btn btn-danger mr-3"
                style={{ background: 'red', fontSize: '25px' }}
              >
                CANCELAR
              </Link>
              <button
                type="submit"
                className="btn btn-success ml-3"
                style={{
                  background: '#205375',
                  marginLeft: '20px',
                  fontSize: '25px',
                }}
              >
                GUARDAR
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );  
};