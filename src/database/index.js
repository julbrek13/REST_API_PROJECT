const { MongoClient } = require('mongodb'); //este es un cliente que se va a conectar con el sv de base de datos
const debug = require('debug')('app:module-database');
const { Config: { port, mongo_uri, db_name } } = require('../config/index');
console.log(port, mongo_uri, db_name);


var connection = null;
module.exports.DatabaseConnection = (collection) => new Promise(async (res, rej) => {
    try {
        if (!connection) {
            const client = new MongoClient(mongo_uri); //recibe url y retorna cliente
            //para evitar crear varias conexiones, se utiliza un patron para detectar que existan conexiones
            let connection = await client.connect();
            debug('nueva conexión realizada');
        }
        debug('conexion ya existente');
        const db = connection.db(db_name);
        resolve(db.collection(collection))

    } catch (error) {
        rej(error);
    }
})
// const quickConnectionTest = async () => {
//     await client.connect();
//     console.log('Connected successfully to server');
//     const db = client.db(dbName);
//     const collection = db.collection('profiles');

//     const findResult = await collection.find({}).toArray();
//     console.log('Found documents =>', findResult);
// }

// quickConnectionTest();
