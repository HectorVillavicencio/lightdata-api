const fs = require('fs');

const saveToDatabase = (DB) => {
    fs.writeFileSync("./src/database/db.json", JSON.stringify(DB, null ,2),{  
        encoding: "utf8",     
    });
    console.log("Base de datos guardada exitosamente.");
};

module.exports= {saveToDatabase}