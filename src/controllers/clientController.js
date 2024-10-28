const clientService = require("../services/clientService.js");

const getAllClients = (req, res) => {
    const allClients = clientService.getAllClients(); 
    res.send({status: 'OK', data: allClients});
};

const getOneClient = (req, res) => {
    const{
        params: {clientId},
    } = req;

    if(!clientId){
        return;
    }

    const client = clientService.getOneClient(clientId);
    res.send({status: "OK", data: client});
};

const createClient = (req, res) => {
    const { body } = req;

    console.log(body);
    if (
        !body.nombre ||
        !body.email ||
        !body.telefono ||
        !body.direccion
    ) {
        return res.status(400).send({ status: "FAILED", message: "Missing fields" });
    }
    
    const newClient = {
        nombre: body.nombre,
        email: body.email,
        telefono: body.telefono,
        direccion: body.direccion
    };

    console.log("newClient",newClient);
            
    const createdClient = clientService.createClient(newClient);
    res.status(201).send({status: "OK", data: createdClient}); 
};

const updateOneClient = (req, res) => {
    const{
        body,
        params: {clientId},
    } = req;

    if(!clientId) {
        return res.status(400).send({ status: "FAILED", message: "No se encuentra el nombre" });
    }

    const updateClient = clientService.updateOneClient(clientId, body);
    res.send({status: "OK", data: updateClient});
    
};

const deleteOneClient = (req, res) => {
    const{
        params: {clientId},
    } = req;

    if (!clientId) {
        return res.status(400).send({ status: "FAILED", message: "No se encuentra el cliente" });
    }

    clientService.deleteOneClient(clientId);
    res.status(204).send({status: "OK"});
   
};

module.exports = {
    getAllClients,
    getOneClient,
    createClient,
    updateOneClient,
    deleteOneClient
};