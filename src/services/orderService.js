// Importa el modelo de pedido, que contiene las funciones de acceso a la base de datos
const order = require("../database/modelOrder");

// Importa la librería uuid para generar identificadores únicos
const { v4: uuid } = require("uuid");

// Servicio para obtener todos los pedidos
const getAllOrders = () => { 
    // Llama al modelo para obtener todos los pedidos desde la base de datos
    const allOrders = order.getAllOrders();
    return allOrders;
};

// Servicio para obtener un pedido específico por su ID
const getOneOrder = (orderId) => { 
    // Llama al modelo para obtener un pedido por su ID
    const o = order.getOneOrder(orderId);
    return o;
};

// Servicio para crear un nuevo pedido
const createOrder = (newOrder) => { 
    // Crea un objeto de pedido con un ID único utilizando uuid
    const orderToInsert = {
        ...newOrder,
        id: uuid(),
    };

    console.log("orderToInsert", orderToInsert);

    // Llama al modelo para insertar el nuevo pedido en la base de datos
    const createdOrder = order.createNewOrder(orderToInsert);
    return createdOrder;
};

// Servicio para actualizar un pedido específico por su ID y aplicar cambios
const updateOneOrder = (orderId, changes) => { 
    const updatedOrder = order.updateOneOrder(orderId, changes);
    return updatedOrder;
};

// Servicio para eliminar un pedido específico por su ID
const deleteOneOrder = (orderId) => {
    // Llama al modelo para eliminar el pedido por su ID 
    order.deleteOneOrder(orderId);
};

// Exporta las funciones del servicio para ser utilizadas en el controlador de pedidos
module.exports = {
    getAllOrders,
    getOneOrder,
    createOrder,
    updateOneOrder,
    deleteOneOrder,
};