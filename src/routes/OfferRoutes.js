const routes = require('express').Router();
const OfferController = require('../controllers/OfferController');

routes.post('/add', OfferController.addOffer);
routes.get('/alloffer', OfferController.getAllOffers);
routes.get('alloffer/:id', OfferController.getOfferById);
routes.put('alloffer/:id', OfferController.updateOffer);
routes.delete('alloffer/:id', OfferController.deleteOffer);
// routes.post('addOfferWithFile' , OfferController.addOfferWithFile);
routes.post('/addOfferWithFile', OfferController.addOfferWithFile);

module.exports = routes;
