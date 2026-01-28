const ValidationError = require("../errors/ValidationError");
const WeatherState = require("../models/WeatherState");

const createState = async (temperatura, humedad, co2) => {
    if(!temperatura) throw new ValidationError("Se requiere una temperatura");
    if(!humedad) throw new ValidationError("Se requiere una humedad");
    if(!co2) throw new ValidationError("Se requiere un dato co2");

    var state = "BUENO";

    if(temperatura < 24 && humedad < 70 && co2 < 800){
        state = "BUENO";
    }

    if(temperatura > 24 && temperatura < 40 && humedad > 70 && humedad < 90 && (co2 > 800 || co2 < 2000)){
        state = "REGULAR";
    }

    if(temperatura > 40 && humedad > 90 || co2 > 2000){
        state = "PELIGROSO";
    }

    const data = await WeatherState.create({temperatura, humedad, co2, state});

    return data;
};

module.exports = {
    createState
}