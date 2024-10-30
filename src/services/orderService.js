// Importa el modelo de pedido, que contiene las funciones de acceso a la base de datos
const itemsList = require("../database/modelItem");
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
    // Verifica la existencia de items y el stock
    for (const item of newOrder.items) {
        const stockItem = itemsList.getAllItems().find(i => i.id === item.id); // Busca el item en la base de datos
        
        if (!stockItem) {
            throw {
                status: 404,
                message: `El item con ID ${item.id} no existe`
            };
        }

        // Compara la cantidad solicitada con el stock disponible
        if (item.stock > stockItem.stock) {
            throw {
                status: 400,
                message: `No se puede realizar el pedido, la cantidad excede el stock disponible`
            };
        }
    }

    // Crea un objeto de pedido con un ID único utilizando uuid
    const orderToInsert = {
        id: uuid(),
        ...newOrder,
        createdAt: new Date().toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" })
        
    };

    console.log("orderToInsert", orderToInsert);

    // Llama al modelo para insertar el nuevo pedido en la base de datos
    const createdOrder = order.createNewOrder(orderToInsert);
    return createdOrder;
};


// Exporta las funciones del servicio para ser utilizadas en el controlador de pedidos
module.exports = {
    getAllOrders,
    getOneOrder,
    createOrder,
};