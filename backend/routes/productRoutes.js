const express = require('express');
const router = express.Router();
const { protect, admin } = require('../Middleware/authMiddleware.js');

// import {getProducts, getProductById} from '../controllers/productController.js';
const {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
} = require('../controllers/productController.js');

router.route('/').get(getProducts).post(protect, admin, createProduct);
router
	.route('/:id')
	.get(getProductById)
	.delete(protect, admin, deleteProduct)
	.put(protect, admin, updateProduct);

// export default Router;
module.exports = router;
