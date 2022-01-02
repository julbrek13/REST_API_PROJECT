const { DatabaseConnection } = require('../database/index');
const { ObjectId } = require('mongodb');
const res = require('express/lib/response');
const debug = require('debug')('app:module-sales-services');


const MAIN_COLLECTION = 'sales';
const USERS = 'users';
const PRODUCTS = 'products';


module.exports.SalesService = {
    getSales: async () => {
        const collection = await DatabaseConnection(MAIN_COLLECTION);
        const sales = await collection.find({}).toArray();
        return sales ? sales : null
    },
    /**
     * 
     * @param {*id de usuario para comprobar su existencia} userId 
     * @param {*array de ids de productos ""} productsId 
     */
    createSale: async (userId, array_products, dataSale) => {
        const main_collection = await DatabaseConnection(MAIN_COLLECTION);
        const users_collection = await DatabaseConnection(USERS);
        const products_collection = await DatabaseConnection(PRODUCTS);

        const user = await users_collection.findOne({ _id: new ObjectId(userId) })

        // let productsId = array_products.map((product) => product._id);
        var products = [];

        const check_product = (id) => new Promise(async (resolve, reject) => {
            try {
                const result = await products_collection.findOne({ _id: new ObjectId(id) })
                resolve(result)
            } catch (error) {
                reject(error)
                debug(error);
            }
        })

        const pushing_products = () => new Promise((resolve, reject) => {
            try {
                let i = 0;

                array_products.forEach(async (product) => {
                    const nuevo_producto = await check_product(product._id)
                    if (nuevo_producto && nuevo_producto.cantidad >= product.cantidad) {
                        nuevo_producto.cantidad_pedida = product.cantidad
                        products.push(nuevo_producto);
                    }
                    i++;
                    if (i == array_products.length) {
                        resolve(products);
                    }
                })
            } catch (error) {
                reject(error);
                debug(error);
            }
        })

        products = await pushing_products()

        if (user && products.length == array_products.length) {
            var precio_final = 0;
            products.forEach((product) => {
                //product.precio debe multiplicar a cantidad llevada
                precio_final += (product.precio * product.cantidad_pedida);

            });
            debug('el precio final es', precio_final);

            const venta = await main_collection.insertOne({
                user: user,
                products: products
            });

            if (venta) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }

    }
}