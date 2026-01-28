const mongoose = require("mongoose");
const manageExtenalId = require("../plugins/manageExtenalId");
const Schema = mongoose.Schema;

const weatherStateSchema = new Schema({
    state: {
        type: String,
        required: true,
        maxLength: 30,
        isIn: ["BUENO", "REGULAR", "PELIGROSO"],
        default: "BUENO",
    },
    temperatura: {
        type: Number,
        required: true
    },
    humedad: {
        type: Number,
        required: true
    },
    co2: {
        type: Number,
        required: true
    }
});

weatherStateSchema.plugin(manageExtenalId);
const WeatherState = mongoose.model("weatherState", weatherStateSchema);

module.exports = WeatherState;