const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); 
const { identification } = require('../middleware/identification');

// Rutas para administración de usuarios

// Registrar un usuario
router.post('/register', userController.registerUser);

// Obtener todos los usuarios
router.get('/users', userController.getAllUsers);

router.get('/roles', userController.getAllRoles);

// Obtener un usuario por ID
router.get('/users/:id', identification, userController.getUserById);

// Editar un usuario
router.put('/users/:id', identification, userController.editUser);

// Eliminar un usuario
//router.delete('/users/:id', identification, userController.deleteUser);

module.exports = router;
