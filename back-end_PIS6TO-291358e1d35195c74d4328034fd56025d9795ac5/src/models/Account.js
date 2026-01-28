const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const manageExternalId = require("../plugins/manageExtenalId");

const accountSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 25,
    },
    lastname: {
      type: String,
      required: true,
      min: 3,
      max: 25,
    },
    email: {
      type: String,
      required: true,
      min: 5,
      max: 40,
    },
    password: {
      type: String,
      required: true,
      min: 5,
      max: 61,
    },
    state: {
      type: String,
      maxLength: 30,
      isIn: ["ACTIVA", "BLOQUEADA", "INACTIVA"],
      default: "ACTIVA",
    },
    token: {
      type: String,
      required: false,
    },
    tokenExpiresAt: {
      type: Date,
      required: false,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Rol",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

accountSchema.plugin(manageExternalId);
const Account = mongoose.model("accounts", accountSchema);

module.exports = Account;