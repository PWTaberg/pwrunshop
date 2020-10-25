const express = require('express');
const router = express.Router();

const {
	addOrderItems,
	getOrderById,
} = require('../controllers/orderController.js');
const { protect } = require('../Middleware/authMiddleware.js');

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);

// export default Router;
module.exports = router;
