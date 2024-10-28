const clientService = require("../services/clientService.js");

const getAllClients = (req, res) => {
    const allClients = clientService.getAllClients(); 
    res.send({status: 'OK', data: allClients});
};

const getOneClient = (req, res) => {
    const oneClient = clientService.getOneClient(req.params.clientId);
    res.send(`Get Client ${req.params.clientId}`);
};

const createClient = (req, res) => {
    const { body } = req;

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
            
    const createdClient = clientService.createClient(newClient);
    res.status(201).send({status: "OK", data: createdClient}); 
};

const updateOneClient = (req, res) => {
    const updatedClient = clientService.updateOneClient(req.params.clientId);
    res.send(`Update Client ${req.params.clientId}`);
};

const deleteOneClient = (req, res) => {
    clientService.deleteOneClient(req.params.clientId);
    res.send(`Delete Client ${req.params.clientId}`);
};

module.exports = {
    getAllClients,
    getOneClient,
    createClient,
    updateOneClient,
    deleteOneClient
};