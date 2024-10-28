const client = require("../database/modelClient");
const { v4: uuid} = require("uuid");

const getAllClients = () => { 
    const allClients = client.getAllClients();
    return allClients;
};

const getOneClient = () => { 
    return; 
};

const createClient = (newClient) => { 
    const clientToInsert = {
        ...newClient,
        id: uuid()
    };

    console.log("clientToInsert",clientToInsert);

    const createClient = client.createNewClient(clientToInsert);
    return createClient;
};

const updateOneClient = () => { 
    return;
};

const deleteOneClient = () => { 
    return;
};

module.exports = {
    getAllClients,
    getOneClient,
    createClient,
    updateOneClient,
    deleteOneClient
};