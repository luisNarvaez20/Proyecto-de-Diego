'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import fileDownload from 'js-file-download';
import { API_URL } from '@/constants';

export default function Page() {
  const router = useRouter();

  // Validación con Yup
  const validationSchema = Yup.object().shape({
    startDate: Yup.date().required('Seleccione una fecha inicial').typeError('Fecha inválida'),
    endDate: Yup.date().required('Seleccione una fecha final').typeError('Fecha inválida')
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  // Envío del formulario
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${API_URL}/data/export`,
        {
          startDate: new Date(data.startDate).toISOString(),
          endDate: new Date(data.endDate).toISOString()
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          },
          responseType: 'blob' // Asegura que la respuesta sea tratada como un blob
        }
      );
      fileDownload(response.data, 'exported_data.xlsx'); // Cambia el nombre del archivo con la extensión .xlsx
    } catch (error) {
      console.error('Error al exportar los datos', error);
    }
  };

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
      <div className="d-flex flex-column center-elements">
        <h1 style={{ color: '#205375', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          Exportar Datos
        </h1>
        <div className="container-fluid form-container">
          <br />
          <form onSubmit={handleSubmit(onSubmit)} className="center-elements">
            <div className="row mb-4 center-elements">
              <div className="col">
                <input
                  {...register('startDate')}
                  type="date"
                  className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
                  placeholder="Seleccione la fecha inicial"
                  autoComplete="off"
                  style={{ fontSize: '25px' }}
                />
                <label className="form-label" style={{ color: '#1b4f72' }}>
                  Fecha Inicial
                </label>
                <div className="alert alert-danger invalid-feedback">
                  {errors.startDate?.message}
                </div>
              </div>
              <div className="col">
                <input
                  {...register('endDate')}
                  type="date"
                  className={`form-control ${errors.endDate ? 'is-invalid' : ''}`}
                  placeholder="Seleccione la fecha final"
                  autoComplete="off"
                  style={{ fontSize: '25px' }}
                />
                <label className="form-label" style={{ color: '#1b4f72' }}>
                  Fecha Final
                </label>
                <div className="alert alert-danger invalid-feedback">
                  {errors.endDate?.message}
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <button
                type="submit"
                className="btn btn-success"
                style={{
                  background: '#205375',
                  fontSize: '25px',
                }}
              >
                EXPORTAR
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
