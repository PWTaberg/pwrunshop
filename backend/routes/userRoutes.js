const express = require('express');
const router = express.Router();
const { protect } = require('../Middleware/authMiddleware.js');

// import {authUser} from '../controllers/userController.js';
const {
	authUser,
	getUserProfile,
	registerUser,
} = require('../controllers/userController.js');

router.route('/').post(registerUser);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);

// export default Router;
module.exports = router;
