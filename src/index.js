// Importa Express y el enrutador de clientes
const express = require ('express');
const clientRouter= require("./routes/clientRoutes");


const app = express(); // Crea la aplicación Express

const PORT = 3000; // Define el puerto en el que correrá el servidor

// Middleware para interpretar JSON en las solicitudes
app.use(express.json());

// Ruta base para todas las rutas de cliente
app.use("/api/clients", clientRouter);


// Inicia el servidor y escucha en el puerto especificado
app.listen(PORT, () => {
    console.log(`El server se levanto en el puerto ${PORT}`)});

