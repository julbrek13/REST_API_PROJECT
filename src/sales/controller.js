const debug = require('debug')('app:module-sales-controller');
const { Response } = require('../common/response');
const createError = require('http-errors');
const { SalesService } = require('./services');

module.exports.SalesController = {
    getSales: async (req, res) => {
        try {
            const sales = await SalesService.getSales();
            if (sales) {

                Response.success(res, 200, 'lista de ventas', sales);
            } else {
                Response.error(res);
            }
        } catch (error) {
            Response.error(res);
            debug(error);
        }
    },
    addSale: async (req, res) => {
        try {
            const dataSale = req.body;
            // const array_products = dataSale.products.map((product) => product._id);

            const test = await SalesService.createSale(dataSale.user._id, dataSale.products, dataSale);
            if (test) {
                Response.success(res, 201, 'venta creada', test)
            } else {
                Response.success(res, 404, 'los datos probablemente sean incorrectos. Comprueba haber introducido correctamente el id del usuario y de los productos. Tambien comprueba que exista tal cantidad de algun producto que desees adquirir', test)
                debug('los datos probablemente sean incorrectos.')
            }

        } catch (error) {
            Response.error(res)
            debug(error);
        }
    }
}