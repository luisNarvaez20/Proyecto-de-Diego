const { generateToken } = require("../helpers/tokenGeneration");
const authService = require("../services/authServices");
const { hashPassword } = require("../helpers/hashPassword");
const { tokenValidation } = require("../helpers/validateToken");
const { generateUrlFriendlyToken } = require("../helpers");
const Account = require("../models/Account");
const bcrypt = require("bcrypt");
const Role = require("../models/Role");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'Gmail', // O el servicio que uses
    auth: {
        user: 'ronald.cuenca@unl.edu.ec', // Correo del servidor
        pass: 'tedquieromucho' // Contraseña del servidor
    }
});
// const transporter = require("../config/emailConfig");
module.exports = {
    

    loginUser: async (req, res) => {
        const { email, password } = req.body;
        // const account = await authService.login(email, password);
        const account = await Account.findOne({ email });
        if (!account) {
            return res.json({ status: 400, message: "La cuenta no fue encontrada" });
        }
        if (account.state == "BLOQUEADA") {
            return res.json({ status: 401, message: "Cuenta bloqueada" });
        }
        if (account.state == "INACTIVA") {
            return res.json({ status: 401, message: "Cuenta inactivada" });
        }
        const compare = bcrypt.compareSync(password, account.password);
        if (!compare) {
            return res.json({ status: 401, message: "Credenciales incorrectas" });
        }

        const roleName = await Role.findOne({ _id: account.role });

        const payload = { id: account.id, role: roleName.name };
        const token = await generateToken(payload);

        return res.json({ account, token });
    },

    activateAccount: async (req, res, next) => {
        const { email } = req.body;
        // const account = await authService.login(email, password);
        const account = await Account.findOne({ email });
        if (!account) {
            return res.json({ status: 400, message: "La cuenta no fue encontrada" });
        }

        account.state = "ACTIVA";
        await account.save();
        return res.json({
            message: "Cuenta activada",
            account,
        });
    },

    generatePasswordRecoveryToken: async (req, res, next) => {
        const { email } = req.body;
        const account = await Account.findOne({ email });

        if (!account) {
            return res.json({ status: 400, message: "Email incorrecto" });
        }

        const token = generateUrlFriendlyToken();
        account.token = token;
        account.tokenExpiresAt = new Date(Date.now() + 3 * 60 * 60 * 1000); // Corrección del tiempo de expiración
        await account.save();

        const mailOptions = {
            // from: 'tu-email@gmail.com', // Correo del servidor
            to: email,
            subject: "Recuperación de contraseña",
            html: `
                <b>Haga clic en el siguiente enlace o péguelo en su navegador web para la recuperación de contraseña</b>
                <a href="${FRONT_URL}/nueva_cont/${token}">${FRONT_URL}/nueva_cont/${token}</a>
            `,
        };
        await transporter.sendMail(mailOptions);

        return res.json({
            message: "El link de acceso se le envió a su email de registro",
        });
    },

    recoverPassword: async (req, res, next) => {
        const { token } = req.params;
        const { password } = req.body;
    
        if (!password) {
            return res.json({ status: 400, message: "La contraseña es requerida" });
        }
    
        try {
            const account = await Account.findOne({ token });
            console.log("Account found:", account);
            if (!account) {
                return res.json({ status: 400, message: "Token inválido" });
            }
    
            if (Date.now() > account.tokenExpiresAt) {
                return res.json({ status: 401, message: "Token ha expirado" });
            }
    
            account.password = await hashPassword(password);
            const newUser = await account.save();
            console.log("New user saved:", newUser);
    
            if (!newUser) {
                return next({
                    status: 400,
                    message: "No se ha podido recuperar la contraseña, intente más tarde",
                });
            }
    
            res.json({
                message: "Contraseña actualizada exitosamente",
            });
        } catch (error) {
            console.error("Error en recoverPassword:", error);
            next(error);
        }
    },      
};