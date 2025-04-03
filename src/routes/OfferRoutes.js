// const routes = require('express').Router();
// const OfferController = require('../controllers/OfferController');

// routes.post('/add', OfferController.addOffer);
// routes.get('/alloffer', OfferController.getAllOffers);
// // routes.get('alloffer/:id', OfferController.getOfferById);
// routes.get('/alloffer/:id', OfferController.getOfferById);
// routes.put('alloffer/:id', OfferController.updateOffer);
// routes.delete('alloffer/:id', OfferController.deleteOffer);
// // routes.post('addOfferWithFile' , OfferController.addOfferWithFile);
// routes.post('/addOfferWithFile', OfferController.addOfferWithFile);

// module.exports = routes;
const express = require('express');
const router = express.Router();
const { 
    addOffer, 
    getAllOffers, 
    getOfferById, 
    updateOffer, 
    deleteOffer, 
    addOfferWithFile,
    getCategories
} = require('../controllers/OfferController');

// Category route
router.get('/categories', getCategories);

// Existing routes
router.post('/add', addOffer);
router.post('/addOfferWithFile', addOfferWithFile);
router.get('/all', getAllOffers);
router.get('/:id', getOfferById);
router.put('/:id', updateOffer);
router.delete('/:id', deleteOffer);

module.exports = router;