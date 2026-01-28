const e = require('express');
const Joi = require('joi');

exports.signupSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
        .min(3)
        .max(30)
        .required()
        .email({
            tlds: { allow: ['com','net','ec','edu'] }
        }),
    password: Joi.string()
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

exports.signinSchema = Joi.object({
    email: Joi.string()
        .min(3)
        .max(30)
        .required()
        .email({
            tlds: { allow: ['com','net'] }
        }),
    password: Joi.string()
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

exports.verifySchema = Joi.object({
    email: Joi.string()
        .min(6)
        .max(60)
        .required()
        .email({
            tlds: { allow: ['com','net'] }
        }),
    verificationCode: Joi.string()
        .min(6)
        .max(6)
        .required()
        .pattern(new RegExp('^[0-9]{6}$')),
});

exports.resetPasswordSchema = Joi.object({
    newPassword: Joi.string()
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    oldPassword: Joi.string()
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

exports.ResetPasswordRequestSchema = Joi.object({
    email: Joi.string()
    .min(6)
    .max(60)
    .required()
    .email({
        tlds: { allow: ['com','net'] }
    }),
    password: Joi.string()
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
});
