const { ProductsService } = require('./services');
const debug = require('debug')('app:module-products-controller');
const { Response } = require('../common/response');
const createError = require('http-errors');

module.exports = {
    getProducts: async (req, res) => {
        try {
            let products = await ProductsService.getAll()
            //implementacion de respuestas personalizadas
            Response.success(res, 200, 'lista de productos', { products: products });
        } catch (error) {
            Response.error(res);
            debug(error);
        }
    },
    getProduct: async (req, res) => {
        try {
            const { id } = req.params;
            let product = await ProductsService.getById(id);
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
                let result = await ProductsService.createProduct(body)
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
    },
    generateReport: (req, res) => {
        try {
            //cuando se retorna de esta forma, al acceder a la url se descarga el excel
            ProductsService.generateReportService(res);

        } catch (error) {
            Response.error(res);
            debug(error);
        }
    },
    deleteProduct: async (req, res) => {
        const { params: { id } } = req;
        try {
            const eliminacion = await ProductsService.deleteProductById(id);
            Response.success(res, 200, 'Eliminado correctamente', { operation: eliminacion })
        } catch (error) {
            Response.error(res);
            debug(error);
        }
    },
    updateProduct: async (req, res) => {
        try {
            const dataUpdate = req.body;
            const { params: { id } } = req;
            const result = await ProductsService.updateProductById(id, dataUpdate);
            //llamar a function de services que actualice en la d
            if (result) {
                Response.success(res, 200, 'actualizado correctamente', { result });
            } else {
                Response.error(res, createError.InternalServerError())
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }


    },
    updateMany: async (req, res) => {
        try {
            const result = await ProductsService.updateManyProducts();
            if (result) {
                Response.success(res, 200, 'varios modificados correctamente', { result })
            } else {
                Response.error(res);
            }
            Response.success(res, 200, 'varios modificados correctamente', { result })
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    }
}