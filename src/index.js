// Importa Express y el enrutador de clientes, items y pedidos
const express = require ('express');
const cors = require('cors');
const clientRouter= require("./routes/clientRoutes");
const itemRouter = require("./routes/itemRoutes")
const itemorder = require("./routes/orderRoutes")

const app = express(); // Crea la aplicación Express
app.use(cors())

const PORT = 3000; // Define el puerto en el que correrá el servidor

// Middleware para interpretar JSON en las solicitudes
app.use(express.json());

// Ruta base para todas las rutas de cliente
app.use("/api/clients", clientRouter);

// Ruta base para todas las rutas de item
app.use("/api/items", itemRouter);

// Ruta base para todas las rutas de pedido
app.use("/api/order", itemorder);


// Inicia el servidor y escucha en el puerto especificado
app.listen(PORT, () => {
    console.log(`El server se levanto en el puerto ${PORT}`)});

