// Importa el módulo de Express para crear y gestionar rutas en la aplicación
const express = require('express');
const router = express.Router();

// Importa el controlador de pedidos, que contiene las funciones para manejar cada ruta
const orderController = require("../controllers/orderController.js")

// Define las rutas para la entidad "pedidos"
router
    .get("/", orderController.getAllOrders)
    .get("/:orderId", orderController.getOneOrder)
    .post("/", orderController.createOrder)

module.exports = router;