const cuentaService = require("../services/accountService");
const Cuenta = require("../models/Account");
const { hashPassword } = require("../helpers/hashPassword");
const Role = require("../models/Role");
const uuidv4 = require("uuid").v4;

module.exports = {
  getAllAcounts: async (req, res) => {
    const { skip = 0, limit = 10, ...where } = req.query;
    const allAccounts = await Cuenta.find(where).skip(skip).limit(limit);
    where.deletedAt = null;
    const numberAccounts = await Cuenta.countDocuments(where);
    res.json({ numberAccounts, allAccounts });
  },

  getCuentaByExternalId: async (req, res, next) => {
    const external_id = req.params.external;
    const cuentaA = await Cuenta.findOne({ external_id });
    if (!cuentaA) {
      return res.json({ status: 400, message: "La cuenta no fue encontrada" });
    }
    return res.json(cuentaA);
  },

  updateCuenta: async (req, res, next) => {
    try {
      const external = req.params.external;
      console.log(external);
  
      let cuenta = await Cuenta.findOne({ external });
      console.log(cuenta);
  
      if (!cuenta) {
        return res.status(400).json({ status: 400, message: "La cuenta no fue encontrada" });
      }
  
      if (req.body.password) {
        req.body.password = await hashPassword(req.body.password);
      }
  
      // No generar un nuevo external_id a menos que sea necesario
      // req.body.external_id = uuidv4(); // Esto puede no ser necesario
  
      cuenta = await Cuenta.findOneAndUpdate({ external }, req.body, {
        new: true,
      });
  
      return res.json(cuenta);
    } catch (error) {
      console.error('Error al actualizar la cuenta:', error);
      return res.status(500).json({ status: 500, message: "Error interno del servidor" });
    }
  },

  createCuenta: async (req, res) => {
    // if (req.body.role == null) {
    //   const rolUsuario = await Role.findOne({ name: "Usuario" });
    //   req.body.role = rolUsuario._id;
    // }else 
    if(req.body.role == 'Analista'){
      const rolUsuario = await Role.findOne({ name: req.body.role });
      req.body.role = rolUsuario._id;
    }else if(req.body.role == 'Administrador'){
      const rolUsuario = await Role.findOne({ name: req.body.role });
      req.body.role = rolUsuario._id;
    }else {
      return res.json({ status: 400, message: "El rol no existe"});
    }

    const cuenta = await cuentaService.createCuenta(req.body);
    return res.json(cuenta);
  },

  deleteCuenta: async (req, res) => {
    const external_id = req.params.external;
    let cuenta = await Cuenta.findOne({ external_id });
    if (!cuenta) {
      return res.json({ status: 400, message: "La cuenta no existe" });
    }
    const deletedCuenta = await Cuenta.findOneAndUpdate(
      { external_id },
      {
        email: null,
        external_id: uuidv4(),
        deletedAt: new Date(),
        state: "INACTIVA",
      },
      { new: true }
    );
    // const deletedCuenta = await cuentaService.deleteCuenta(req.params.external);
    return res.json(deletedCuenta);
  },
};