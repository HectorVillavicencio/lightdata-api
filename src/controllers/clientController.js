// Importa el servicio de clientes, que contiene la lógica para interactuar con los datos de clientes
const clientService = require("../services/clientService.js");


// Controlador para obtener todos los clientes
const getAllClients = (req, res) => {
    try{
        const{ nombre } = req.query;
        const allClients = clientService.getAllClients({ nombre }); 
        res.send({status: 'OK', data: allClients});
    } catch (error) {
        res
         .status(error?.status || 500)
         .send({status: "FAILED", 
                data: {error: error?.message || error}});
        };
};


// Controlador para obtener un cliente específico por su ID
const getOneClient = (req, res) => {
    const{
        params: {clientId},
    } = req;

    if(!clientId){
        // Revisa si el ID de cliente no fue dado
        res.status(404).send({
            status: "FAILED",
            data: { error: "cliente no encontrado" },
          });
          return;
    }
    try{
        // Llama al servicio para obtener un cliente por su ID
        const client = clientService.getOneClient(clientId);
         res.send({status: "OK", data: client});
    } catch (error) {
        res
          .status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } });
      }
};


// Controlador para crear un nuevo cliente
const createClient = (req, res) => {
    const { body } = req;

    console.log(body);

    // Valida que todos los atributos requeridos estén en la solicitud
    if (
        !body.nombre ||
        !body.email ||
        !body.telefono ||
        !body.direccion
    ) {
        res.status(404).send({ status: "FAILED", data: {error: 
            "Algun atributo falta o ya existe un cliente con ese nombre"} });
    }
    
    // Crea un nuevo objeto cliente con los datos de la solicitud
    const newClient = {
        nombre: body.nombre,
        email: body.email,
        telefono: body.telefono,
        direccion: body.direccion
    };

    console.log("newClient",newClient);
    try{
        // Llama al servicio para crear el cliente    
        const createdClient = clientService.createClient(newClient);
        res.status(201).send({status: "OK", data: createdClient}); 
    } catch (error) {
        res
         .status(error?.status || 500)
         .send({status: "FAILED", data: {error: error?.message || error}});
    }
};


// Controlador para actualizar un cliente específico por su ID
const updateOneClient = (req, res) => {
    const{
        body,
        params: {clientId},
    } = req;

    if(!clientId) {
        return res.status(404).send({
            status: "FAILED",
            data: {error: "cliente no encontrado"}
        });
    }
    try{
        // Llama al servicio para actualizar el cliente con los campos proporcionados
     const updateClient = clientService.updateOneClient(clientId, body);
     res.send({status: "OK", data: updateClient});
    }   catch (error) {
        res
         .status(error?.status || 500)
         .send({status: "FAILED", data: {error: error?.message || error}});
    }
};


// Controlador para eliminar un cliente específico por su ID
const deleteOneClient = (req, res) => {
    const{
        params: {clientId},
    } = req;

    if (!clientId) {
        return res.status(404).send({
            status: "FAILED",
            data: {error: "cliente no encontrado"}
        });
    }
    try {
        // Llama al servicio para eliminar el cliente por su ID
        clientService.deleteOneClient(clientId);
        res.status(204).send({status: "OK"});
    } catch (error) {
        res
          .status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } });
      }
};


// Exporta las funciones del controlador para ser usadas en el router de rutas
module.exports = {
    getAllClients,
    getOneClient,
    createClient,
    updateOneClient,
    deleteOneClient
};