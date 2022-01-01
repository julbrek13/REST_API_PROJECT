const express = require('express');
const router = express.Router();
const { UsersController } = require('./controller');

module.exports.UsersApi = (app) => {
    //add verbs to router
    //update
    router.put('/update/:id', UsersController.updateUser)
    //delete
    router.delete('/delete/:id', UsersController.deleteUser);
    router.get('/', UsersController.getUsers)
    router.get('/:id', UsersController.getUser)
    router.post('/', UsersController.createUser)

    app.use('/api/users', router)
}