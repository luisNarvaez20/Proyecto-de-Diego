const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true ["Please enter a valid email address"],
        unique: true["Email already exists"],
    },
    password: {
        type: String,
        required: true["Please enter a password"],
        trim: true,
        select: false,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        select: false,
        default: null,
    },
    verificationTokenValidation: {
        type: String,
        select: false,
        default: null,
    },
    resetPasswordToken: {
        type: String,
        select: false,
        default: null,
    },
    resetPasswordTokenValidation: {
        type: String,
        select: false,
        default: null,
    },
    oauthProvider: {
        type: String,
        default: null,
    },
    oauthId: {
        type: String,
        default: null,
    },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);