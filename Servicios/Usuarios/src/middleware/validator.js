const Joi = require('joi');

// Validación para crear un usuario

exports.createUserSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.base': 'El nombre debe ser un texto.',
            'string.min': 'El nombre debe tener al menos 3 caracteres.',
            'string.max': 'El nombre no debe exceder 50 caracteres.',
            'any.required': 'El nombre es obligatorio.',
        }),
    email: Joi.string()
        .min(3)
        .max(60)
        .required()
        .email({
            tlds: { allow: ['com', 'net', 'ec', 'edu'] },
        })
        .messages({
            'string.email': 'Por favor ingrese un correo electrónico válido.',
            'any.required': 'El correo electrónico es obligatorio.',
        }),
    password: Joi.string()
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .messages({
            'string.pattern.base': 'La contraseña debe contener entre 3 y 30 caracteres alfanuméricos.',
            'any.required': 'La contraseña es obligatoria.',
        }),
    cedula: Joi.string()
        .required()
        .pattern(/^\d{10}$/)
        .messages({
            'string.pattern.base': 'La cédula debe contener exactamente 10 dígitos.',
            'any.required': 'La cédula es obligatoria.',
        }),
    phoneNumber: Joi.string()
        .required()
        .pattern(/^\d{10}$/)
        .messages({
            'string.pattern.base': 'El número de teléfono debe contener exactamente 10 dígitos.',
            'any.required': 'El número de teléfono es obligatorio.',
        }),
    role: Joi.string()
        .required()
        .messages({
            'string.base': 'El rol debe ser un ID válido.',
            'any.required': 'El rol es obligatorio.',
        }),
    isAdmin: Joi.boolean().default(false), // Opcional, define si el usuario es administrador
});


// Validación para actualizar un usuario
exports.updateUserSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string()
        .min(3)
        .max(60)
        .optional()
        .email({
            tlds: { allow: ['com', 'net', 'ec', 'edu'] },
        }),
    password: Joi.string()
        .optional()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        cedula: Joi.string()
        .required()
        .pattern(/^\d{10}$/)
        .messages({
            'string.pattern.base': 'La cédula debe contener exactamente 10 dígitos.',
            'any.required': 'La cédula es obligatoria.',
        }),
    phoneNumber: Joi.string()
        .required()
        .pattern(/^\d{10}$/)
        .messages({
            'string.pattern.base': 'El número de teléfono debe contener exactamente 10 dígitos.',
            'any.required': 'El número de teléfono es obligatorio.',
        }),
    isAdmin: Joi.boolean().optional(), // Permite cambiar el rol de administrador
}).min(1); // Asegura que al menos un campo se esté actualizando

// Validación para eliminar un usuario (por ID)
exports.deleteUserSchema = Joi.object({
    userId: Joi.string()
        .required()
        .regex(/^[a-fA-F0-9]{24}$/), // Verifica si es un ID de MongoDB válido
});

// Validación para listar usuarios con filtros opcionales
exports.listUsersSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string()
        .optional()
        .email({
            tlds: { allow: ['com', 'net', 'ec', 'edu'] },
        }),
    isAdmin: Joi.boolean().optional(),
    page: Joi.number().integer().min(1).optional(), // Para paginación
    limit: Joi.number().integer().min(1).max(100).optional(), // Límite de usuarios por página
});
