const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    provider: {
        type: String,
        required: true,
    },
    providerAccountId: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
    },
    accessToken: {
        type: String,
    },
    accessTokenExpires: {
        type: Date,
    },
}, { timestamps: true });

module.exports = mongoose.model('Account', AccountSchema);