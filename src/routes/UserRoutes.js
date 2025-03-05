const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get("/users", UserController.getAllUsers);
router.post("/user", UserController.addUsers);
router.post("/user", UserController.addUser1);
router.delete("/user/:id", UserController.deleteUsers);
router.get("/user/:id", UserController.getUsersById);

module.exports = router;