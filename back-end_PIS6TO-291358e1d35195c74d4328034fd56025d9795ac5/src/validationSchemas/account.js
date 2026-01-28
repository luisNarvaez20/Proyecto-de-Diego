const Joi = require("joi");
const { isValidObjectId } = require("mongoose");

const createAccountSchema = Joi.object({
  name: Joi.string().required().min(3).max(25).messages({
    "*": "El campo nombre es requerido y debe tener entre 3 y 25 caracteres",
  }),
  lastname: Joi.string().required().min(3).max(25).messages({
    "*": "El campo apellido es requerido y debe tener entre 3 y 25 caracteres",
  }),
  email: Joi.string().required().min(5).max(30).messages({
    "*": "El campo email es requerido y debe tener entre 5 y 30 caracteres",
  }),
  password: Joi.string().required().min(5).max(30).messages({
    "*": "El campo contraseña es requerido y debe tener entre 5 y 30 caracteres",
  }),
  role: Joi.string().required(),
  state: Joi.string()
    .valid("ACTIVA", "BLOQUEADA", "INACTIVA")
    .optional()
    .messages({
      "*": "El campo estado es requerido y debe ser uno de: 'ACTIVA', 'BLOQUEADA', 'INACTIVA'",
    }),
});

const editAccountSchema = Joi.object({
  id: Joi.string().optional().custom(isValidObjectId).messages({
    "*": "Id no válido",
  }),
  name: Joi.string().optional().min(3).max(25).messages({
    "*": "El campo nombre es requerido y debe tener entre 3 y 25 caracteres",
  }),
  lastname: Joi.string().optional().min(3).max(25).messages({
    "*": "El campo apellido es requerido y debe tener entre 3 y 25 caracteres",
  }),
  email: Joi.string().email().optional().messages({
    "*": "El campo email debe ser un email válido",
  }),
  password: Joi.string().optional().min(8).alphanum().max(30).messages({
    "*": "El campo contraseña es requerido y debe tener entre 8 y 30 caracteres alfanuméricos",
  }),
  role: Joi.string().optional(),
  state: Joi.string()
    .valid("ACTIVA", "BLOQUEADA", "INACTIVA")
    .optional()
    .messages({
      "*": "El campo estado es requerido y debe ser uno de: 'ACTIVA', 'BLOQUEADA', 'INACTIVA'",
    }),
});

module.exports = { createAccountSchema, editAccountSchema };