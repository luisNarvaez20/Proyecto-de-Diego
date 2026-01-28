const { Router } = require("express");
const isLoggedIn = require("../policies/isLoggedIn");
const rolController = require("../controllers/roleController");
const { createRoleSchema } = require("../validationSchemas/role");
const middleware = require("../middlewares");

const rolRouter = Router();

/**
 * @route GET /
 * @desc Obtener rol por ID
 */
rolRouter.get(
    "/:id",
    rolController.getRoleById
);

/**
 * @route GET /
 * @desc Obtener todos los roles
 */
rolRouter.get(
    "/",
    rolController.getAllRoles
);

/**
 * @route POST /
 * @desc Crear un rol
 */
rolRouter.post(
    "/",
    isLoggedIn,
    middleware.validateRequestBody(createRoleSchema),
    rolController.createRole
);

/**
 * @route PUT /
 * @desc Actualizar un rol
 */
rolRouter.put(
    "/",
    isLoggedIn,
    rolController.updateRole
);

module.exports = rolRouter;