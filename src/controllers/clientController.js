const clientService = require("../services/clientService.js");

const getAllClients = (req, res) => {
    try{
        const allClients = clientService.getAllClients(); 
        res.send({status: 'OK', data: allClients});
    } catch (error) {
        res
         .status(error?.status || 500)
         .send({status: "FAILED", data: {error: error?.message || error}});
        };
};

const getOneClient = (req, res) => {
    const{
        params: {clientId},
    } = req;

    if(!clientId){
        res.status(400).send({
            status: "FAILED",
            data: { error: "cliente no encontrado" },
          });
          return;
    }
    try{
        const client = clientService.getOneClient(clientId);
         res.send({status: "OK", data: client});
    } catch (error) {
        res
          .status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } });
      }
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
        res.status(400).send({ status: "FAILED", data: {error: 
            "Algun atributo falta o ya existe un cliente con ese nombre"} });
    }
    
    const newClient = {
        nombre: body.nombre,
        email: body.email,
        telefono: body.telefono,
        direccion: body.direccion
    };

    console.log("newClient",newClient);
    try{    
        const createdClient = clientService.createClient(newClient);
        res.status(201).send({status: "OK", data: createdClient}); 
    } catch (error) {
        res
         .status(error?.status || 500)
         .send({status: "FAILED", data: {error: error?.message || error}});
    }
};

const updateOneClient = (req, res) => {
    const{
        body,
        params: {clientId},
    } = req;

    if(!clientId) {
        return;
    }
    try{
     const updateClient = clientService.updateOneClient(clientId, body);
     res.send({status: "OK", data: updateClient});
    }   catch (error) {
        res
         .status(error?.status || 500)
         .send({status: "FAILED", data: {error: error?.message || error}});
    }
};

const deleteOneClient = (req, res) => {
    const{
        params: {clientId},
    } = req;

    if (!clientId) {
        return res.status(400).send({
            status: "FAILED",
            data: {error: "cliente no encontrado"}
        });
    }
    try {
        clientService.deleteOneClient(clientId);
        res.status(204).send({status: "OK"});
    } catch (error) {
        res
          .status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } });
      }
};

module.exports = {
    getAllClients,
    getOneClient,
    createClient,
    updateOneClient,
    deleteOneClient
};