// Importa el módulo de Express para crear y gestionar rutas en la aplicación
const express = require('express');
const router = express.Router();

// Importa el controlador de items, que contiene las funciones para manejar cada ruta
const itemController = require("../controllers/itemController.js")

// Define las rutas para la entidad "items"
router
    .get("/", itemController.getAllItems)
    .get("/:itemId", itemController.getOneItem)
    .post("/", itemController.createItem)
    .patch("/:itemId", itemController.updateOneItem)
    .delete("/:itemId", itemController.deleteOneItem);

module.exports = router;