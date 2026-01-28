const dotenv = require('dotenv');

// ##Load environment variables from .env file (only for debugging)
//dotenv.config({path: '../../.env'});

// ##Load environment variables from global environment variables
dotenv.config();

const config = {
    port: process.env.PORT || 3000,
//    mongoUri: process.env.MONGO_URI || 'mongodb://root:example@localhost:27017/?directConnection=true',
    mongoUri: "mongodb://"+process.env.MONGO_INITDB_ROOT_USERNAME+":"+process.env.MONGO_INITDB_ROOT_PASSWORD+"@"+process.env.MONGO_HOST+":27017/",
    jwtSecret: process.env.JWT_SECRET,
    sendingEmailAddress: process.env.NODE_SENDING_EMAIL_ADDRESS,
    sendingEmailPassword: process.env.NODE_SENDING_EMAIL_PASSWORD,
    //jwtExpiration: process.env.JWT_EXPIRATION || '24h',
    nodeEnv: process.env.NODE_ENV || 'development',
    hmacVerificationCodeSecret: process.env.HMAC_VERIFICATION_CODE_SECRET,
};

module.exports = config;