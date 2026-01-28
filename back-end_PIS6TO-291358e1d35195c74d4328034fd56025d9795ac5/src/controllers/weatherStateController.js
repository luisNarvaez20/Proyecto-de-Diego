const WeatherState = require("../models/WeatherState");
const { createState } = require("../services/weatherStateService");

module.exports = {
    createState: async (req, res) => {
        const { temperatura, humedad, co2 } = req.body;

        if(!temperatura) {
            return res.status(400).json({ status: 400, message: "Se requiere la temperatura" });
        }
        if(!humedad) {
            return res.status(400).json({ status: 400, message: "Se requiere la humedad" });
        }
        if(!co2) {
            return res.status(400).json({ status: 400, message: "Se requiere el co2" });
        }

        const response = await createState(temperatura, humedad, co2);

        return res.status(200).json({ status: 200, message: "OK", response });
    },
    
    getStates: async (req, res) => {
        const response = await WeatherState.where({});

        return res.status(200).json({ status: 200, message: "OK", response: response });
    }
}