const express = require("express");
const rolRouter = require("./role.routes");
const accountRouter = require("./account.routes");
const authRouter = require("./auth.routes");
const datosRouter = require("./datos.routes");
const weatherRouter = require("./weatherState.routes");
const placaRoutes = require('./Placa');

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

router.use("/auth", authRouter);
router.use("/role", rolRouter);
router.use("/account", accountRouter);
router.use("/data", datosRouter);
router.use("/weatherState", weatherRouter);
router.use("/Placa", placaRoutes);

module.exports = router;