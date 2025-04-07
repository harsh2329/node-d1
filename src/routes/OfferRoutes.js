const express = require('express');
const { 
    addOffer, 
    getAllOffers, 
    getOfferById, 
    updateOffer, 
    deleteOffer, 
    addOfferWithFile,
    getCategories
} = require('../controllers/OfferController');


const router = express.Router();

// Category route
router.get('/categories', getCategories);

// Define routes
router.post('/add', addOffer);
router.post('/add-with-file', addOfferWithFile);
router.get('/', getAllOffers);
router.get('/:id', getOfferById);
router.put('/:id', updateOffer);
router.delete('/:id', deleteOffer);

module.exports = router;