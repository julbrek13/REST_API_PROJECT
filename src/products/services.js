const { DatabaseConnection } = require('../database/index');
const { ObjectId } = require('mongodb');
const { excelGenerator } = require('./utils');

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

const generateReportService = async (res) => {
    let products = await getAll();
    excelGenerator(products, res);
}

const deleteProductById = async (idToDelete) => {
    const collection = await DatabaseConnection(COLLECTION);
    return await collection.deleteOne({
        _id: new ObjectId(idToDelete)
    })
}

const updateProductById = async (idToUpdate, newUser) => {
    const collection = await DatabaseConnection(COLLECTION);
    const actualization = await collection.updateOne({
        _id: new ObjectId(idToUpdate)
    }, {
        $set: {
            ...newUser
        }
    })
    return actualization
}

module.exports.ProductsService = {
    getAll: getAll,
    getById: getById,
    createProduct: createProduct,
    generateReportService: generateReportService,
    deleteProductById: deleteProductById,
    updateProductById: updateProductById
}