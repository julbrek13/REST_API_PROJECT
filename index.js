/**
 * importaciones
 */
const express = require('express');
const createError = require('http-errors');
const debug = require('debug')('app:main');
const { Config: { port } } = require('./src/config/index')
const { ProductsApi } = require('./src/products/index');
const { UsersApi } = require('./src/users/index');
/**
 * constantes 
 */
const app = express();


/**
 * modificaciones a la app
 */
app.use(express.json())
ProductsApi(app);
UsersApi(app);

/**ejemplo de http-errors */
// app.use(function (req, res, next) {
//     if (!req.user) return next(createError(401, 'please login'))
//     next()
// })


app.get('/', function (req, res) {
    res.send('Helloo World')
})

app.listen(port, () => {
    debug(`server listen at ${port}`)
});

