const { DatabaseConnection } = require('../database/index');
const { ObjectId } = require('mongodb');

const COLLECTION = 'products';
/***
 * DatabaseConnection es la funcion que comprueba si existe conexion y la crea en caso necesario
 */
const getAll = async () => {
    const collection = await DatabaseConnection(COLLECTION);
    return await collection.find({}).toArray();
}

const getById = async (idToFind) => {

    const collection = await DatabaseConnection(COLLECTION);
    return await collection.findOne({
        _id: new ObjectId(idToFind)
    })
}

const createProduct = async (product) => {
    const collection = await DatabaseConnection(COLLECTION);
    let result = await collection.insertOne(product)
    return result.insertedId
}

module.exports.ProductsService = {
    getAll: getAll,
    getById: getById,
    createProduct: createProduct
}