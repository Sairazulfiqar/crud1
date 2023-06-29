const mysql = require('mysql');
connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'root',
    database: 'cruddb'
});

connection.connect((error) => {
    if (error){
        console.error('Error de conexión'+error.stack);
        return;
    }
    console.log('Conectado a la CRUDDB')
});