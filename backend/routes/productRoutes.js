const express = require('express');
const router = express.Router();
// import {getProducts, getProductById} from '../controllers/productController.js';
const {
	getProducts,
	getProductById,
} = require('../controllers/productController.js');

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

// export default Router;
module.exports = router;
