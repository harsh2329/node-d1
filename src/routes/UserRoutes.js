const express = require('express');
const routes = require("express").Router();
const UserController = require('../controllers/UserController');

routes.get("/users", UserController.getAllUsers);
routes.post("/user", UserController.signup);
routes.delete("/user/:id", UserController.deleteUsers);
routes.get("/user/:id", UserController.getUsersById);
routes.post("/user/login", UserController.Login);
// routes.post("/user/signup", UserController.signup);

module.exports = routes;