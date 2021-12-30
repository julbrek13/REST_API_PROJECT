const express = require('express');
const router = express.Router();
const { getProducts, getProduct, createProduct, generateReport, deleteProduct, updateProduct, updateMany } = require('./controller');

module.exports.ProductsApi = (app) => {
    router.get('/report', generateReport)
    router.get('/', getProducts)
    router.get('/:id', getProduct)
    router.post('/', createProduct)
    //delete
    router.get('/delete/:id', deleteProduct);
    //update
    router.post('/update/:id', updateProduct);
    router.get('/updateMany/precio', updateMany);
    app.use('/api/products', router);
}