import React from 'react';

const UpdatePasswordForm = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundImage: 'url("c.jpg")', backgroundSize: 'cover' }}>
      <div style={{ position: 'absolute', top: '20px', left: '20px', padding: '10px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '5px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)', textAlign: 'center' }}>
        <p style={{ margin: '50' }}>Recuperar Contraseña</p>
      </div>
      <div style={{ width: '300px', padding: '20px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', textAlign: 'center' }}>
        <h1>Actualizar Contraseña</h1>
        <form>
          <div style={{ marginBottom: '10px' }}>
            <label>Contraseña Antigua:</label>
            <input type="password" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Nueva Contraseña:</label>
            <input type="password" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Confirmar Nueva Contraseña:</label>
            <input type="password" />
          </div>
          <button type="submit">Actualizar</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;