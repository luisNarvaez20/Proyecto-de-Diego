'use client';
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";

const validationSchema = object().shape({
  nombres: string().required('Ingrese los nombres'),
  apellidos: string().required('Ingrese los apellidos'),
  cedula: string().required('Ingrese un nro cedula'),
  celular: string().required('Ingrese un telefono'),
  correo: string().required('Ingrese un correo electrónico').email('Se requiere correo válido'),
  clave: string().required('Ingrese su clave'),
  rol: string().required('Seleccione un rol')
});

export default function Page() {
  const router = useRouter();

  const formOptions = { resolver: yupResolver(validationSchema), mode: "onChange" };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const roles = [
    { id: '1', name: 'Admin' },
    { id: '2', name: 'User' }
  ];

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="d-flex flex-column">
        <h1 style={{ color: '#205375', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Registrar Usuario</h1>
        <div className='container-fluid' style={{ border: '4px solid #ccc', padding: '20px', borderRadius: '10px', width: '1000px' }}>
          <form className="user">
            <div className="row mb-4">
              <div className="col">
                <input {...register('nombres')} className={`form-control ${errors.nombres ? 'is-invalid' : ''}`} placeholder='Ingrese sus nombres' style={{ fontSize: '25px' }} />
                <label className="form-label" style={{ color: '#205375' }}>Nombres</label>
                <div className='alert alert-danger invalid-feedback'>{errors.nombres?.message}</div>
              </div>
              <div className="col">
                <input {...register('apellidos')} className={`form-control ${errors.apellidos ? 'is-invalid' : ''}`} placeholder='Ingrese sus apellidos' style={{ fontSize: '25px' }} />
                <label className="form-label" style={{ color: '#205375' }}>Apellidos</label>
                <div className='alert alert-danger invalid-feedback'>{errors.apellidos?.message}</div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col">
                <input {...register('cedula')} className={`form-control ${errors.cedula ? 'is-invalid' : ''}`} placeholder='Ingrese número de cédula' autoComplete="off" style={{ fontSize: '25px' }} />
                <label className="form-label" style={{ color: '#205375' }}>Cédula</label>
                <div className='alert alert-danger invalid-feedback'>{errors.cedula?.message}</div>
              </div>
              <div className="col">
                <input {...register('celular')} className={`form-control ${errors.celular ? 'is-invalid' : ''}`} placeholder='Ingrese número de celular' autoComplete="off" style={{ fontSize: '25px' }} />
                <label className="form-label" style={{ color: '#205375' }}>Celular</label>
                <div className='alert alert-danger invalid-feedback'>{errors.celular?.message}</div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col">
                <input {...register('correo')} className={`form-control ${errors.correo ? 'is-invalid' : ''}`} placeholder='Ingrese correo electrónico' autoComplete="off" style={{ fontSize: '25px' }} />
                <label className="form-label" style={{ color: '#205375' }}>Correo</label>
                <div className='alert alert-danger invalid-feedback'>{errors.correo?.message}</div>
              </div>
              <div className="col">
                <input {...register('clave')} type="password" className={`form-control ${errors.clave ? 'is-invalid' : ''}`} placeholder='Ingrese una clave' autoComplete="off" style={{ fontSize: '25px' }} />
                <label className="form-label" style={{ color: '#205375' }}>Clave</label>
                <div className='alert alert-danger invalid-feedback'>{errors.clave?.message}</div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col">
                <select {...register('rol')} className={`form-control ${errors.rol ? 'is-invalid' : ''}`} style={{ fontSize: '25px' }}>
                  <option value="">Elija un rol</option>
                  {roles.map((aux, i) => (
                    <option key={i} value={aux.id}>
                      {aux.name}
                    </option>
                  ))}
                </select>
                <label className="form-label" style={{ color: '#205375' }}>Rol</label>
                <div className='alert alert-danger invalid-feedback'>{errors.rol?.message}</div>
              </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <Link href="/persona" className="btn btn-danger mr-3" style={{ background: 'red', fontSize: '25px' }}>
                CANCELAR
              </Link>
              <button type='submit' className="btn btn-success ml-3" style={{ background: '#205375', marginLeft: '20px', fontSize: '25px' }}>
                GUARDAR
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
