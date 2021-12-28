/**
 * importaciones
 */
const express = require('express');
const createError = require('http-errors');
const debug = require('debug')('app:main');
const { Config: { port } } = require('./src/config/index')
const mongo = require('mongodb');
const { MongoClient } = mongo;

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'profiles';

/**
 * constantes 
 */
const app = express();


/**
 * modificaciones a la app
 */
app.use(express.json())


const quickConnectionTest = async () => {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('profiles');

    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);
}

// quickConnectionTest();

/**ejemplo de http-errors */
// app.use(function (req, res, next) {
//     if (!req.user) return next(createError(401, 'please login'))
//     next()
// })


app.get('/', function (req, res) {
    res.send('Helloo World')
})

app.listen(port, () => {
    debug(`server listen at ${port}`)
});

