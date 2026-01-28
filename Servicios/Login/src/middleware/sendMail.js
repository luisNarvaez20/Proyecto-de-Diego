const nodemailer = require('nodemailer');
const config = require('../config');

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user:config.sendingEmailAddress,
        pass:config.sendingEmailPassword,
    }
});

module.exports = transport;