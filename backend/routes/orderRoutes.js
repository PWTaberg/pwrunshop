const express = require('express');
const router = express.Router();

const { addOrderItems } = require('../controllers/orderController.js');
const { protect } = require('../Middleware/authMiddleware.js');

router.route('/').post(protect, addOrderItems);

// export default Router;
module.exports = router;
