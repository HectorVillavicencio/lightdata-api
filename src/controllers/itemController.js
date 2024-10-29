// Importa el servicio de items, que contiene la lógica para interactuar con los datos de items
const itemService = require("../services/itemService.js");

// Controlador para obtener todos los items
const getAllItems = (req, res) => {
    try {
        const allItems = itemService.getAllItems(); 
        res.send({ status: 'OK', data: allItems });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    };
};

// Controlador para obtener un item específico por su ID
const getOneItem = (req, res) => {
    const {
        params: { itemId },
    } = req;

    if (!itemId) {
        // Revisa si el ID de item no fue dado
        res.status(400).send({
            status: "FAILED",
            data: { error: "item no encontrado" },
        });
        return;
    }
    try {
        // Llama al servicio para obtener un item por su ID
        const item = itemService.getOneItem(itemId);
        res.send({ status: "OK", data: item });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

// Controlador para crear un nuevo item
const createItem = (req, res) => {
    const { body } = req;

    console.log(body);

    // Valida que todos los atributos requeridos estén en la solicitud
    if (
        !body.Código ||
        !body.Descripción ||
        !body.Precio ||
        typeof body.habilitado !== "boolean" ||
        typeof body.Stock !== "number"
    ) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "Faltan algunos atributos o ya existe un item con ese código" }
        });
        return;
    }

    // Crea un nuevo objeto item con los datos de la solicitud
    const newItem = {
        Código: body.Código,
        Descripción: body.Descripción,
        Precio: body.Precio,
        habilitado: body.habilitado,
        Stock: body.Stock
    };

    console.log("newItem", newItem);
    try {
        // Llama al servicio para crear el item
        const createdItem = itemService.createItem(newItem);
        res.status(201).send({ status: "OK", data: createdItem });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

// Controlador para actualizar un item específico por su ID
const updateOneItem = (req, res) => {
    const {
        body,
        params: { itemId },
    } = req;

    if (!itemId) {
        return;
    }
    try {
        // Llama al servicio para actualizar el item con los campos proporcionados
        const updateItem = itemService.updateOneItem(itemId, body);
        res.send({ status: "OK", data: updateItem });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

// Controlador para eliminar un item específico por su ID
const deleteOneItem = (req, res) => {
    const {
        params: { itemId },
    } = req;

    if (!itemId) {
        return res.status(400).send({
            status: "FAILED",
            data: { error: "item no encontrado" }
        });
    }
    try {
        // Llama al servicio para eliminar el item por su ID
        itemService.deleteOneItem(itemId);
        res.status(204).send({ status: "OK" });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

// Exporta las funciones del controlador para ser usadas en el router de rutas
module.exports = {
    getAllItems,
    getOneItem,
    createItem,
    updateOneItem,
    deleteOneItem
};