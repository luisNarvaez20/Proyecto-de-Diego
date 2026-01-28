const dotenv = require('dotenv');
const initializeRoles = require("../controllers/userController");

// ##Load environment variables from .env file (only for debugging)
//dotenv.config({path: '../../.env'});

// ##Load environment variables from global environment variables
dotenv.config();

initializeRoles.createRole();

const config = {
    port: process.env.PORT || 3001,
//    mongoUri: process.env.MONGO_URI || 'mongodb://root:example@localhost:27017/?directConnection=true',
    mongoUri: "mongodb://"+process.env.MONGO_INITDB_ROOT_USERNAME+":"+process.env.MONGO_INITDB_ROOT_PASSWORD+"@"+process.env.MONGO_HOST+":27017/",
    jwtSecret: process.env.JWT_SECRET,
    //jwtExpiration: process.env.JWT_EXPIRATION || '24h',
    nodeEnv: process.env.NODE_ENV || 'development',
    hmacVerificationCodeSecret: process.env.HMAC_VERIFICATION_CODE_SECRET,
};

module.exports = config;