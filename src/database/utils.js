const fs = require('fs');

const savetoDatabase = (DB) => {
    fs.writeFileSync("./src/database/db.json", JSON.stringify(DB, null ,2),{        
    });
    console.log("Base de datos guardada exitosamente.");
};

module.exports= {savetoDatabase}