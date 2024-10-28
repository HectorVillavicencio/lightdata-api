const express = require ('express');
const clientRouter= require("./routes/clientRoutes");

const app = express();

const PORT = 3000;

app.use(express.json());
app.use("/api/clients", clientRouter);

app.get("/", (req, res) =>{
    res.send("<h1>Holitas<h1>");
});

app.listen(PORT, () => {console.log(`El server se levanto en el puerto ${PORT}`)});