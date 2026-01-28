'use client';

import { API_URL } from '@/constants';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './Placas.module.css';

const Placas = () => {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedPlaca, setSelectedPlaca] = useState(null);
  const [Placa, setPlaca] = useState({ identificador: '', estado: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [placas, setPlacas] = useState([]);

  useEffect(() => {
    const fetchPlacas = async () => {
      try {
        const response = await fetch(`${API_URL}/Placa`);
        if (response.ok) {
          const data = await response.json();
          setPlacas(data);
        } else {
          console.error('Error al recuperar las placas');
        }
      } catch (error) {
        console.error('Error al conectar con la base de datos', error);
      }
    };

    fetchPlacas();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlaca({ ...Placa, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Placa.identificador || !Placa.estado) {
      setError('Identificador y estado son requeridos');
      return;
    }

    try {
      const response = editMode
        ? await fetch(`${API_URL}/Placa/${selectedPlaca._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              identificador: Placa.identificador,
              estado: Placa.estado,
            }),
          })
        : await fetch(`${API_URL}/Placa`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              identificador: Placa.identificador,
              estado: Placa.estado,
            }),
          });

      if (response.ok) {
        const updatedPlaca = await response.json();
        setPlacas(
          editMode
            ? placas.map((placa) => (placa._id === updatedPlaca._id ? updatedPlaca : placa))
            : [...placas, updatedPlaca]
        );
        setShowModal(false);
        setPlaca({ identificador: '', estado: '' });
        setError(null);
        setSuccess('Placa guardada exitosamente');
        setEditMode(false);
      } else {
        console.error('Error al guardar la Placa');
        setError('Error al guardar la Placa');
      }
    } catch (error) {
      console.error('Error al conectar con la base de datos', error);
      setError('Error al conectar con la base de datos');
    }
  };

  const handleEdit = (placa) => {
    setSelectedPlaca(placa);
    setPlaca({ identificador: placa.identificador, estado: placa.estado });
    setShowModal(true);
    setEditMode(true);
  };

  const handleDelete = async (placaId) => {
    try {
      const response = await fetch(`${API_URL}/Placa/${placaId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setPlacas(placas.filter((placa) => placa._id !== placaId));
        setSuccess('Placa eliminada exitosamente');
      } else {
        console.error('Error al eliminar la Placa');
      }
    } catch (error) {
      console.error('Error al conectar con la base de datos', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Placas</h1>
        <div className={styles.header}>
          <div>Identificador</div>
          <div>Estado</div>
          <div>Acciones</div>
        </div>
        {placas.length === 0 ? (
          <p>No hay placas disponibles</p>
        ) : (
          placas.map((placa) => (
            <div key={placa._id} className={styles.row}>
              <div className={styles.identificador}>{placa.identificador}</div>
              <div className={styles.estado}>
                <div className={placa.estado === 'Activa' ? styles.active : styles.inactive}>
                  {placa.estado}
                </div>
              </div>
              <div className={styles.actions}>
                <button onClick={() => handleEdit(placa)} className={styles.iconButton}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => handleDelete(placa._id)} className={styles.iconButton}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))
        )}
        <button onClick={() => setShowModal(true)} className={styles.addButton}>
          Agregar Nueva Placa
        </button>
        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h2>{editMode ? 'Editar Placa' : 'Registrar Nueva Placa'}</h2>
              {error && <p className={styles.error}>{error}</p>}
              {success && <p className={styles.success}>{success}</p>}
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label>Identificador</label>
                  <input
                    type="text"
                    name="identificador"
                    value={Placa.identificador}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Estado</label>
                  <select name="estado" value={Placa.estado} onChange={handleInputChange} required>
                    <option value="">Selecciona el estado</option>
                    <option value="Activa">Activa</option>
                    <option value="Inactiva">Inactiva</option>
                  </select>
                </div>
                <button type="submit" className={styles.submitButton}>
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setEditMode(false); }}
                  className={styles.cancelButton}
                >
                  Cancelar
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Placas;
