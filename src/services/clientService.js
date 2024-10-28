const client = require("../database/modelClient");
const { v4: uuid} = require("uuid");

const getAllClients = () => { 
    const allClients = client.getAllClients();
    return allClients;
};

const getOneClient = (clientId) => { 
     const c = client.getOneClient(clientId);
     return c;
};

const createClient = (newClient) => { 
    const clientToInsert = {
        ...newClient,
        id: uuid(),
    };

    console.log("clientToInsert",clientToInsert);

    const createClient = client.createNewClient(clientToInsert);
    return createClient;
};

const updateOneClient = (nombre, changes) => { 
    const updateClient = client.updateOneClient(nombre, changes);
    return updateClient;
};

const deleteOneClient = (nombre) => { 
    client.deleteOneClient(nombre);
};

module.exports = {
    getAllClients,
    getOneClient,
    createClient,
    updateOneClient,
    deleteOneClient
};