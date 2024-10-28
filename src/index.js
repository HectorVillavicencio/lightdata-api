const express = require ('express');
const clientRouter= require("./routes/clientRoutes");


const app = express();

const PORT = 3000;

app.use(express.json());
app.use("/api/clients", clientRouter);



app.listen(PORT, () => {
    console.log(`El server se levanto en el puerto ${PORT}`)});

