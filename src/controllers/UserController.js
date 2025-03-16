const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { sendingMail } = require("../Utils/MailUtil");

const Login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const foundUserFromEmail = await userModel.findOne({ email: email })
        console.log(foundUserFromEmail);

        if (foundUserFromEmail != null) {
            const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);
            if (isMatch == true) {
                res.status(200).json({
                    message: "login success",
                    data: foundUserFromEmail,
                });
            } else {
                res.status(404).json({
                    message: "invalid credentials",
                });
            }
        } else {
            res.status(404).json({
                message: "Email not found",
            });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
};

const signup = async (req, res) => {
    console.log(req.body)
    try {
        const password = req.body.password;
        if (!password) {
            throw new Error("Password is required");
        }
        console.log("Password:", password); // Debugging statement
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        req.body.password = hashedPassword;
        const createdUser = await userModel.create(req.body);


        // console.log("MailUtil Object:", mailUtil);
        // mail bhejhneke liye user ko 
        await sendingMail(createdUser.email, "Welcome to Bhookbusters", "Thank you for signing up!");


        res.status(201).json({
            message: "user created..",
            data: createdUser,
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "error",
            data: err.message,
        });
    }
};

const addUser1 = async (req, res) => {
    try {
        const createdUser = await userModel.create(req.body);
        res.status(201).json({
            message: "user created..",
            data: createdUser
        });
    } catch (err) {
        res.status(500).json({
            message: "error",
            data: err
        });
    }
};

const getAllUsers = async (req, res) => {
    const users = await userModel.find().populate("roleId");

    res.json({
        message: "users fetched successfully",
        data: users
    });
};

const addUsers = async (req, res) => {
    const savedUsers = await userModel.create(req.body);
    console.log("request body....", req.body);

    res.json({
        message: "user added successfully",
        data: savedUsers
    });
};

const deleteUsers = async (req, res) => {
    const deleteUsers = await userModel.findByIdAndDelete(req.params.id);

    res.json({
        message: "user deleted successfully",
        data: deleteUsers
    });
};

const getUsersById = async (req, res) => {
    const getUsersById = await userModel.findById(req.params.id);

    res.json({
        message: "user found successfully...",
        data: getUsersById
    });
};

module.exports = {
    getAllUsers, addUsers, deleteUsers, getUsersById, addUser1, Login, signup
};