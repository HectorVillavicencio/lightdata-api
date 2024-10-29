// Importa el módulo de Express para crear y gestionar rutas en la aplicación
const express = require('express');
const router = express.Router();

// Importa el controlador de clientes, que contiene las funciones para manejar cada ruta
const clientController = require("../controllers/clientController.js")


// Define las rutas para la entidad "clientes"
router
    .get("/", clientController.getAllClients)
    .get("/:clientId", clientController.getOneClient)
    .post("/", clientController.createClient)
    .patch("/:clientId", clientController.updateOneClient)
    .delete("/:clientId", clientController.deleteOneClient),

    module.exports = router;