const mongoose = require("mongoose");
const manageExtenalId = require("../plugins/manageExtenalId");
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

roleSchema.plugin(manageExtenalId);
const Role = mongoose.model("role", roleSchema);

module.exports = Role;