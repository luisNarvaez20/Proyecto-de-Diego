const weatherStateController = require("../controllers/weatherStateController");
var express = require("express");
var router = express.Router();

/**
 * @route GET /
 * @desc Obtener todos los estados
 * @access Public
 */
router.get(
    '/', 
    weatherStateController.getStates
);

/**
 * @route POST /
 * @desc Crear nuevo estado
 * @access Public
 */
router.post(
    '/', 
    weatherStateController.createState
);

module.exports = router;