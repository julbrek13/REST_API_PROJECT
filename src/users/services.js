const { DatabaseConnection } = require('../database/index');
const { ObjectId } = require('mongodb');

const COLLECTION = 'users';

module.exports.UsersServices = {
    getAllUsers: async () => {
        const collection = await DatabaseConnection(COLLECTION);
        const users = await collection.find({}).toArray();
        return users
    },
    getUserById: async (id) => {
        const collection = await DatabaseConnection(COLLECTION);
        const user = await collection.findOne({
            _id: new ObjectId(id)
        })
        return user
    },
    createNewUser: async (newUser) => {
        const collection = await DatabaseConnection(COLLECTION);
        //en lugar de pasarle {...newUser} como param, podría pasar directamente newUser
        const creation = await collection.insertOne({
            ...newUser
        })
        return creation
    },
    updateUser: async (id, dataUpdate) => {
        const collection = await DatabaseConnection(COLLECTION);
        const update = await collection.updateOne({
            _id: new ObjectId(id)
        }, {
            $set: {
                ...dataUpdate
            },
            $unset: {
                createtime: "",
                modifiedAt: ''
            },
            $currentDate: {
                lastModified: true,
                "fecha": { $type: "timestamp" }
            }
        })
        return update
    },
    deleteUser: async (id) => {
        const collection = await DatabaseConnection(COLLECTION);
        const deleting = await collection.deleteOne({
            _id: new ObjectId(id)
        })
        return deleting
    }
}