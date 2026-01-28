'use client';
import mensajes from '@/app/components/Mensajes';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { get, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import Link from "next/link";


export default function Page() {
  const router = useRouter();

  const validationShema = Yup.object().shape({
    ip: Yup.string()
      .required('Ingrese la IP de la mota Maestro')
      .test('ip-validation', 'Ingrese una dirección IP para la placa', value =>
        isValidIPAddress(value)
      ),
    descripcion: Yup.string().required('ingrese la descripcion para la mota ingresada'),
    recurso: Yup.string().required('ingrese el recurso de la mota')
  });

  const formOptions = { resolver: yupResolver(validationShema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  //validacion IP
  function isValidIPAddress(value) {
    // Expresión regular para validar una dirección IP
    const ipAddressRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

    // Verificar si el valor coincide con la expresión regular
    return ipAddressRegex.test(value);
  }

  return (
    <div
      className="row justify-content-center"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Asegura que el contenedor ocupe el 100% de la altura de la pantalla
      }}
    >
      <div className="d-flex flex-column">
        <h1 style={{ color: '#205375', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          Registrar Mota
        </h1>
        <div
          className="container-fluid"
          style={{
            border: '4px solid #ccc',
            padding: '20px',
            borderRadius: '10px',
            width: '1000px',
            background: 'white', // Asegura que el fondo sea blanco para mejorar la legibilidad
          }}
        >
          <br />
          <form className="mota">
            <div className="row mb-4">
              <div className="col">
                <input
                  {...register('ip')}
                  name="ip"
                  id="ip"
                  className={`form-control ${errors.ip ? 'is-invalid' : ''}`}
                  placeholder="Ingrese IP para la placa"
                  autoComplete="off"
                  style={{ fontSize: '25px' }}
                />
                <label className="form-label" style={{ color: '#1b4f72' }}>
                  IP
                </label>
                <div className="alert alert-danger invalid-feedback">
                  {errors.ip?.message}
                </div>
              </div>
              <div className="col">
                <input
                  {...register('descripcion')}
                  name="descripcion"
                  id="descripcion"
                  className={`form-control ${errors.descripcion ? 'is-invalid' : ''}`}
                  placeholder="Ingrese una descripcion para la mota"
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
            <div className="col">
              <input
                {...register('recurso')}
                name="recurso"
                id="recurso"
                className={`form-control ${errors.recurso ? 'is-invalid' : ''}`}
                placeholder="Ingrese el recurso a tener la mota"
                autoComplete="off"
                style={{ fontSize: '25px' }}
              />
              <label className="form-label" style={{ color: '#1b4f72' }}>
                Recurso
              </label>
              <div className="alert alert-danger invalid-feedback">
                {errors.recurso?.message}
              </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <Link
                href="/mota"
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