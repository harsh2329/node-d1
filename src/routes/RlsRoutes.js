const express = require('express');
const router = express.Router();
const RlsController = require('../controllers/RlsController');

router.post('/rregister', RlsController.register);
router.post('/rlogin', RlsController.login);

module.exports = router;