const router = require("express").Router();
const AdminController = require("../controllers/AdminController");

// Public routes
router.post("/login", AdminController.adminLogin);
router.post("/logout", AdminController.adminLogout);

// Protected route - for creating admin (should be secured in production)
router.post("/create", AdminController.createAdmin);

module.exports = router;