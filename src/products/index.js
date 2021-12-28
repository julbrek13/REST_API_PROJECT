const express = require('express');
const router = express.Router();
const { getProducts, getProduct, createProduct } = require('./controller');

module.exports.ProductsApi = (app) => {

    router.get('/', getProducts)
    router.get('/:id', getProduct)
    router.post('/', createProduct)

    app.use('/api/products', router);
}