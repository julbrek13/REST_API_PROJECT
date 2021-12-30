const express = require('express');
const router = express.Router();
const { getProducts, getProduct, createProduct, generateReport, deleteProduct } = require('./controller');

module.exports.ProductsApi = (app) => {
    router.get('/report', generateReport)
    router.get('/', getProducts)
    router.get('/:id', getProduct)
    router.post('/', createProduct)
    //delete
    router.get('/delete/:id', deleteProduct);

    app.use('/api/products', router);
}