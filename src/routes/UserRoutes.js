const express = require('express');
const routes = require("express").Router();
const UserController = require('../controllers/UserController');

routes.get("/users", UserController.getAllUsers);
routes.post("/user", UserController.signup);
routes.delete("/user/:id", UserController.deleteUsers);
routes.get("/user/:id", UserController.getUsersById);
routes.post("/user/login", UserController.Login);
routes.post("/addwithfile", UserController.addSignupWithFile); 
routes.post("/user/forgotpassword",UserController.forgotPassword);
routes.post("/user/resetpassword",UserController.resetpassword);

module.exports = routes;