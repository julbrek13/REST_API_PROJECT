const { ProductsService: { getAll, getById, createProduct } } = require('./services');
const debug = require('debug')('app:module-products-controller');


module.exports = {
    getProducts: async (req, res) => {
        try {
            let products = await getAll()
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: 'internal server error' })
            debug(error);
        }
    },
    getProduct: async (req, res) => {
        try {
            const { id } = req.params;
            let product = await getById(id);
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: 'internal server error' })
            debug(error);
        }
    },
    createProduct: async (req, res) => {
        try {
            const { body } = req;
            let result = await createProduct(body)
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: 'internal server error' })
            debug(error);
        }
    }

}