const express = require('express');
const router = express.Router();
const clientController = require("../controllers/clientController.js")

router
    .get("/", clientController.getAllClients)
    .get("/:clientId", clientController.getOneClient)
    .post("/", clientController.createClient)
    .patch("/:clientId", clientController.updateOneClient)
    .delete("/:clientId", clientController.deleteOneClient),

    module.exports = router;