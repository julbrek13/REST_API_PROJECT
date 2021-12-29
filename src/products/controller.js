const { ProductsService: { getAll, getById, createProduct } } = require('./services');
const debug = require('debug')('app:module-products-controller');
const { Response } = require('../common/response');
const createError = require('http-errors');

module.exports = {
    getProducts: async (req, res) => {
        try {
            let products = await getAll()
            //implementacion de respuestas personalizadas
            Response.success(res, 200, 'lista de productos', products);
        } catch (error) {
            Response.error(res);
            debug(error);
        }
    },
    getProduct: async (req, res) => {
        try {
            const { id } = req.params;
            let product = await getById(id);
            if (product) {
                Response.success(res, 200, `Producto id: ${id}`, product);
            } else {
                Response.error(res, createError.NotFound());
            }

        } catch (error) {
            Response.error(res);
            debug(error);
        }
    },
    createProduct: async (req, res) => {
        try {
            const { body } = req;
            if (body) {
                let result = await createProduct(body)
                if (result) {
                    Response.success(res, 201, 'producto creado correctamente', result);
                } else {
                    Response.error(res);
                }
            } else {
                Response.error(res, createError.BadRequest()); //code 400. Also may be 411
            }

        } catch (error) {
            Response.error(res);
            debug(error);
        }
    }

}