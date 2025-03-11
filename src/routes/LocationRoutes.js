const routes = require('express').Router();
const LocationController = require('../controllers/LocationController');

routes.post('/add',LocationController.addLocations);
routes.get('/all',LocationController.getAllLocations);

module.exports =routes;