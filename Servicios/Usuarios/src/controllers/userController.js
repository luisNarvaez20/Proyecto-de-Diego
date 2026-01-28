const { 
    createUserSchema, 
    updateUserSchema 
} = require('../middleware/validator');
const { doHash } = require('../utils/hashing');
const User = require('../models/User');
const Role = require('../models/Role');
const jwt = require('jsonwebtoken');
const config = require('../config');

// Registrar un nuevo usuario
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, cedula, role } = req.body;
        const { error } = createUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                error: 'El usuario ya existe'
            });
        }

        const hashedPassword = await doHash(password, 12);


        const newUser = new User({ 
            name, 
            email, 
            password: hashedPassword, 
            phoneNumber,
            cedula,
            role
        });

        await newUser.save();
        res.status(201).json({
            message: 'Usuario registrado exitosamente. Por favor verifica tu correo.',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
};

// Editar información de un usuario existente
exports.editUser = async (req, res) => {
    try {
        const { id } = req.params; // ID del usuario a actualizar
        const { name, email, password, phoneNumber, cedula} = req.body;

        const { error } = updateUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                error: 'Usuario no encontrado'
            });
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = await doHash(password, 12);
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (cedula) user.cedula = cedula;

        await user.save();
        res.status(200).json({
            message: 'Usuario actualizado exitosamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
};

// Listar todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-name -phoneNumber -email -cedula');
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
};

// Obtener un usuario específico por ID
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('-name -phoneNumber -email -cedula');
        if (!user) {
            return res.status(404).json({
                error: 'Usuario no encontrado'
            });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
};



exports.createRole = async (roleName) => {
    try {
      // Validar si el rol ya existe
      const existingRole = await Role.findOne({ name: roleName });
      if (existingRole) {
        throw new Error("El rol ya existe.");
      }
  
      // Crear el nuevo rol
      const newRole = new Role({ name: roleName });
      await newRole.save();
  
      return {
        success: true,
        message: "Rol creado exitosamente.",
        data: newRole,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Error al crear el rol.",
      };
    }
  };

  exports.initializeRoles = async () => {
    const roles = ["admin", "usuario"];
  
    for (const roleName of roles) {
      try {
        const result = await this.createRole(roleName);
        if (result.success) {
          console.log(`Rol "${roleName}" creado exitosamente.`);
        } else {
          console.log(`No se pudo crear el rol "${roleName}": ${result.message}`);
        }
      } catch (error) {
        console.error(`Error al crear el rol "${roleName}":`, error.message);
      }
    }
  };

  exports.getAllRoles = async (req, res) => {
    try {
        const users = await Role.find().select('-name');
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
};
  