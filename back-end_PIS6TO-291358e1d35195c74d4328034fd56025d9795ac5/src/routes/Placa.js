const express = require('express');
const router = express.Router();
const Placa = require('../models/Placa');

// Ruta para obtener todas las placas
router.get('/', async (req, res) => {
  try {
    const placas = await Placa.find();
    res.status(200).json(placas);
  } catch (error) {
    console.error('Error al obtener las placas:', error);
    res.status(500).json({ error: 'Error al obtener las placas' });
  }
});

// Ruta para crear una nueva placa
router.post('/', async (req, res) => {
  try {
    const { identificador, estado } = req.body;

    if (!identificador || !estado) {
      return res.status(400).json({ error: 'Identificador y estado son requeridos' });
    }

    const nuevaPlaca = new Placa({ identificador, estado });
    await nuevaPlaca.save();

    res.status(201).json(nuevaPlaca);
  } catch (err) {
    console.error('Error al crear la placa:', err);
    res.status(500).json({ error: 'Error al crear la placa' });
  }
});

// Ruta para actualizar una placa existente
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { identificador, estado } = req.body;

    if (!identificador || !estado) {
      return res.status(400).json({ error: 'Identificador y estado son requeridos' });
    }

    const placaActualizada = await Placa.findByIdAndUpdate(id, { identificador, estado }, { new: true });

    if (!placaActualizada) {
      return res.status(404).json({ error: 'Placa no encontrada' });
    }

    res.status(200).json(placaActualizada);
  } catch (err) {
    console.error('Error al actualizar la placa:', err);
    res.status(500).json({ error: 'Error al actualizar la placa' });
  }
});

// Ruta para eliminar una placa existente
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const placaEliminada = await Placa.findByIdAndDelete(id);

    if (!placaEliminada) {
      return res.status(404).json({ error: 'Placa no encontrada' });
    }

    res.status(200).json({ message: 'Placa eliminada correctamente' });
  } catch (err) {
    console.error('Error al eliminar la placa:', err);
    res.status(500).json({ error: 'Error al eliminar la placa' });
  }
});

module.exports = router;
