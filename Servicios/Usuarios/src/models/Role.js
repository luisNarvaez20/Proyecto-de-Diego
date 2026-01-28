//COMENTARIO COMMIT
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25,
    unique: true,
  }
});

module.exports = mongoose.model('Role', roleSchema);
