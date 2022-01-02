const express = require('express');
const router = express.Router();
const { SalesController } = require('./controller');
module.exports.SalesApi = (app) => {
    //GET
    router.get('/', SalesController.getSales);
    //POST
    router.post('/', SalesController.addSale)
    //PUT
    //DELETE
    app.use('/api/sales', router);
}