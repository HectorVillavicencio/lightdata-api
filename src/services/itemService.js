// Importa el modelo de item, que contiene las funciones de acceso a la base de datos
const item = require("../database/modelItem");

// Importa la libreria uuid para generar identificadores únicos
const { v4: uuid } = require("uuid");

// Servicio para obtener todos los items
const getAllItems = () => {
    // Llama al modelo para obtener todos los items desde la base de datos
    const allItems = item.getAllItems();
    return allItems;
};

// Servicio para obtener un item específico por su ID
const getOneItem = (itemId) => {
    // Llama al modelo para obtener un item por su ID
    const i = item.getOneItem(itemId);
    return i;
};

// Servicio para crear un nuevo item
const createItem = (newItem) => {
    // Crea un objeto de item con un ID único utilizando uuid
    const itemToInsert = {
        ...newItem,
        id: Math.floor(Math.random() * 100000).toString(),
        habilitado: true
    };

    console.log("itemToInsert", itemToInsert);

    // Llama al modelo para insertar el nuevo item en la base de datos
    const createItem = item.createNewItem(itemToInsert);
    return createItem;
};

// Servicio para actualizar un item específico por su nombre y aplicar cambios
const updateOneItem = (nombre, changes) => {
    const updateItem = item.updateOneItem(nombre, changes);
    return updateItem;
};

// Servicio para eliminar un item específico por su ID
const deleteOneItem = (itemId) => {
    // Llama al modelo para eliminar el item por su ID
    item.deleteOneItem(itemId);
};

// Exporta las funciones del servicio para ser utilizadas en el controlador de items
module.exports = {
    getAllItems,
    getOneItem,
    createItem,
    updateOneItem,
    deleteOneItem,
};