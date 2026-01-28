const mongoose = require('mongoose');
const config = require("../config");
const connectDB = async () => {
    console.log("mongoDB URI: ", config.mongoUri);
    try {
        await mongoose.connect(config.mongoUri, {
            tlsAllowInvalidCertificates: true
            //useNewUrlParser: true,
            //useUnifiedTopology: true,
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err);
        //end execution
        process.exit(1);
    }
};

module.exports = connectDB;