// Importa el servicio de pedidos, que contiene la lógica para interactuar con los datos de pedidos
const orderService = require("../services/orderService.js");


// Controlador para obtener todos los pedidos
const getAllOrders = (req, res) => {
    try {
        const allOrders = orderService.getAllOrders(); 
        res.send({ status: 'OK', data: allOrders });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};


// Controlador para obtener un pedido específico por su ID
const getOneOrder = (req, res) => {
    const {
        params: { orderId },
    } = req;

    if (!orderId) {
        // Revisa si el ID de pedido no fue dado
        res.status(400).send({
            status: "FAILED",
            data: { error: "pedido no encontrado" },
        });
        return;
    }
    try {
        // Llama al servicio para obtener un pedido por su ID
        const order = orderService.getOneOrder(orderId);
        res.send({ status: "OK", data: order });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};


// Controlador para crear un nuevo pedido
const createOrder = (req, res) => {
    const { body } = req;

    console.log(body);

    // Valida que todos los atributos requeridos estén en la solicitud
    if (
        !body.cliente ||
        !body.items || 
        !body.cantidad
    ) {
        res.status(400).send({ status: "FAILED", data: { error: "Algún atributo falta o ya existe un pedido con ese cliente" } });
    }
    
    // Crea un nuevo objeto pedido con los datos de la solicitud
    const newOrder = {
        cliente: body.cliente,
        items: body.items,
        cantidad: body.cantidad
    };

    console.log("newOrder", newOrder);
    try {
        // Llama al servicio para crear el pedido    
        const createdOrder = orderService.createOrder(newOrder);
        res.status(201).send({ status: "OK", data: createdOrder }); 
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};


// Controlador para actualizar un pedido específico por su ID
const updateOneOrder = (req, res) => {
    const {
        body,
        params: { orderId },
    } = req;

    if (!orderId) {
        return;
    }
    try {
        // Llama al servicio para actualizar el pedido con los campos proporcionados
        const updateOrder = orderService.updateOneOrder(orderId, body);
        res.send({ status: "OK", data: updateOrder });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};


// Controlador para eliminar un pedido específico por su ID
const deleteOneOrder = (req, res) => {
    const {
        params: { orderId },
    } = req;

    if (!orderId) {
        return res.status(400).send({
            status: "FAILED",
            data: { error: "pedido no encontrado" }
        });
    }
    try {
        // Llama al servicio para eliminar el pedido por su ID
        orderService.deleteOneOrder(orderId);
        res.status(204).send({ status: "OK" });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};


// Exporta las funciones del controlador para ser usadas en el router de rutas
module.exports = {
    getAllOrders,
    getOneOrder,
    createOrder,
    updateOneOrder,
    deleteOneOrder
};