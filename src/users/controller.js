const debug = require('debug')('app:module-users-controller');
const { Response } = require('../common/response');
const { UsersServices } = require('./services');
const createError = require('http-errors');



module.exports.UsersController = {
    getUsers: async (req, res) => {
        try {
            const users = await UsersServices.getAllUsers();
            Response.success(res, 200, 'lista de usuarios', { length: users.length, users: users });
        } catch (error) {
            Response.error(res)
            debug(error);
        }
    },
    getUser: async (req, res) => {
        try {
            const { params: { id } } = req;
            const user = await UsersServices.getUserById(id)
            if (user) {
                Response.success(res, 200, `usuario id: ${id}`, user)
            } else {
                Response.error(res, createError.NotFound())
            }
        } catch (error) {
            Response.error(res)
            debug(error);
        }
    },
    createUser: async (req, res) => {
        try {
            const dataNewUser = req.body;
            const creation = await UsersServices.createNewUser(dataNewUser)
            if (creation) {
                Response.success(res, 201, 'usuario creado correctamente', creation)

            } else {
                Response.error(res)
            }
        } catch (error) {
            Response.error(res)
            debug(error);
        }
    },
    updateUser: async (req, res) => {
        const { params: { id } } = req;
        const dataUpdate = req.body;

        try {
            const result = await UsersServices.updateUser(id, dataUpdate);
            if (result) {
                Response.success(res, 201, 'Usuario modificado correctamente', { result })
            } else {
                Response.error(res)
            }
        } catch (error) {
            Response.error(res)
            debug(error);
        }

    },
    deleteUser: async (req, res) => {
        try {
            const { params: { id } } = req;
            const deleting = UsersServices.deleteUser(id);
            if (deleting) {
                Response.success(res, 200, 'usuario eliminado correctamente', { deleting })
            } else {
                Response.error(res, createError.NotFound())
            }
        } catch (error) {
            Response.error(res)
        }

    }
}