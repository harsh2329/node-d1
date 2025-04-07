const routes = require('express').Router();
const categoryController = require('../controllers/CategoryController');

routes.post("/addcategory", categoryController.addCategory);
routes.get("/getallcategories", categoryController.getAllCategories);

module.exports = routes;