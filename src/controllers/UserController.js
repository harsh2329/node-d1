const userModel = require("../models/UserModel")

const getAllUsers = async (req, res) => {
    const users = await userModel.find()

    res.json({
        message: "users fetched successfully",
        data: users
    });
}

const addUsers = async (req, res) => {
    const savedUsers = await userModel.create(req.body)
    console.log("request body....", req.body)

    res.json({
        message: "user added successfully",
        data: savedUsers
    });
}

const deleteUsers = async (req, res) => {
    const deleteUsers = await userModel.findByIdAndDelete(req.params.id)

    res.json({
        message: "user deleted successfully",
        data: deleteUsers
    });
}

const getUsersById = async (req, res) => {
    const getUsersById = await userModel.findById(req.params.id)
      
    res.json({
        message: "user found successfully...",
        data: getUsersById
    });
}

module.exports = {
    getAllUsers, addUsers, deleteUsers, getUsersById
};