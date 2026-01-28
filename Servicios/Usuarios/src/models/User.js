const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, "Please enter a valid email address"],
        unique: [true, "Email already exists"],
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        trim: true,
        select: false,
    },
    cedula: {
        type: String,
        required: [true, "Please enter a valid cédula"],
        unique: [true, "Cédula already exists"],
    },
    phoneNumber: {
        type: String,
        required: [true, "Please enter a phone number"],
        validate: {
            validator: function(v) {
                // Simple regex to validate phone numbers
                return /^\d{10}$/.test(v); // Assuming 10-digit phone numbers
            },
            message: props => `${props.value} is not a valid phone number!`
        },
    },
    role: {
        type: mongoose.Schema.Types.ObjectId, // Use mongoose.Schema.Types.ObjectId instead
        ref: "Rol",
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
