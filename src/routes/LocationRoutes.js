// const routes = require('express').Router();
// const LocationController = require('../controllers/LocationController');

// routes.post('/add',LocationController.addLocations);
// routes.get('/all',LocationController.getAllLocations);
// routes.get('/all/:id',LocationController.getAllLocationsById);
// routes.post('/locationwithfile',LocationController.addLocationWithFile);


// module.exports =routes;

const routes = require('express').Router();
const LocationController = require('../controllers/LocationController');

routes.post('/add', LocationController.addLocations);
routes.get('/all', LocationController.getAllLocations);
// Change this line - use the correct function name
routes.get('/all/:id', LocationController.getAllLocationByUserId);
routes.post('/locationwithfile', LocationController.addLocationWithFile);

module.exports = routes;