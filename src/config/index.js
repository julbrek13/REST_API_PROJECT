/**
 * en este archivo se guarda la config de dotenv, y en caso de necesitarse, se importa este archivo
 */
require('dotenv').config();

module.exports.Config = {
    port: process.env.PORT,
}