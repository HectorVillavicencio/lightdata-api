const client = require("../database/modelClient");

const getAllClients = () => { 
    const allClients = client.getAllClients();
    return allClients;
};

const getOneClient = () => { 
    return; 
};

const createClient = () => { 
    return;
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