const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/RlsController'); // Make sure this path is correct

// Restaurant owner registration
router.post('/rregister', restaurantController.register);

// Restaurant owner login
router.post('/rlogin', restaurantController.login);

module.exports = router;