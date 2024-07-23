
const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');

const UserController = require('../controllers/UserController');

// User Routes
router.post("/user/register", UserController.Register)
router.post("/user/login", UserController.Login)
router.get("/user/logout", auth, UserController.Logout)


// TODO: Add Auth Refresh Token Endpoint here



module.exports = router;