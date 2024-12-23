const order = require("../database/modelOrder");

// Importa el modelo de cliente, que contiene las funciones de acceso a la base de datos
const client = require("../database/modelClient");

// Importa la libreria uuid para generar identificadores únicos
const { v4: uuid} = require("uuid");

// Servicio para obtener todos los clientes
const getAllClients = (filterParams) => { 
    try {    
         // Llama al modelo para obtener todos los clientes desde la base de datos
        const allClients = client.getAllClients(filterParams);
        return allClients;
    }catch (error){
        throw { status: 500, 
            message: "No se pudo obtener la lista de clientes" };

    }
};

// Servicio para obtener un cliente específico por su ID
const getOneClient = async (clientId) => {
    try {
        // Llama al modelo para obtener un cliente por su ID
        const clientData = await client.getOneClient(clientId);
        console.log("cliente:", clientData);
        if (!clientData) {
            throw { status: 404, message: "Cliente no encontrado" };
        }

        // Obtiene todos los pedidos relacionados
        const allOrders = await order.getAllOrders(); // Cambia esto según tu modelo para obtener los pedidos.

        if (!Array.isArray(allOrders)) {
            throw { status: 500, message: "'allOrders' no es un arreglo válido" };
        }

        // Filtra los pedidos completados del cliente
        const completedOrders = allOrders.filter(pedido => pedido.clienteId === clientId);
        console.log("Pedidos del cliente:", completedOrders);

        return {
            ...clientData,
            nroPedidos: completedOrders.length
            
        };
    } catch (error) {
        console.error("Error en getOneClient:", error);
        throw {
            status: error.status || 500,
            message: error.message || "No se pudo obtener el cliente solicitado"
        };
    }
};

// Servicio para crear un nuevo cliente
const createClient = (newClient) => { 
    try{
        // Crea un objeto de cliente con un ID único utilizando uuid
        const clientToInsert = {
            ...newClient,
            id: Math.floor(Math.random() * 100000).toString()
        };

    console.log("clientToInsert",clientToInsert);

    // Llama al modelo para insertar el nuevo cliente en la base de datos
    const createClient = client.createNewClient(clientToInsert);
    return createClient;
    } catch(error){
        throw { status: 500, 
                message: "No se pudo crear el cliente" };

    }
};

//Servicio para actualizar un cliente específico por su nombre y aplicar cambios
const updateOneClient = (nombre, changes) => { 
    try{
        const updateClient = client.updateOneClient(nombre, changes);
        return updateClient;
    } catch(error){
        throw{ status: 500,
            message: "No se pudo actualizar el cliente"
        };
    }
};


// Servicio para eliminar un cliente específico por su ID
const deleteOneClient = (clientId) => {
    try {
        // Llama al modelo para eliminar el cliente por su ID 
        client.deleteOneClient(clientId);
    } catch(error){
        throw{ status: 500,
                message: "no se pudo eliminar el cliente"
        }
    }
};

// Exporta las funciones del servicio para ser utilizadas en el controlador de clientes
module.exports = {
    getAllClients,
    getOneClient,
    createClient,
    updateOneClient,
    deleteOneClient,
};