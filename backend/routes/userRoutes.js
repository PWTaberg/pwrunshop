const express = require('express');
const router = express.Router();
const { protect } = require('../Middleware/authMiddleware.js');

// import {authUser} from '../controllers/userController.js';
const {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
} = require('../controllers/userController.js');

router.route('/').post(registerUser);
router.post('/login', authUser);
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);

// export default Router;
module.exports = router;
