const mongoose = require('mongoose');

// Definir el esquema para la colección 'Placa'
const PlacaSchema = new mongoose.Schema({
  identificador: { type: String, required: true },
  estado: { type: String, required: true }
});

// Exportar el modelo basado en el esquema
module.exports = mongoose.model('Placa', PlacaSchema);
