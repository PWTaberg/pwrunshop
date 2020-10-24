const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel.js');

// @desc Fetch all products
// @route GET /api/products
// @access Public
//const getProducts = asyncHandler(async (req,res) => {

exports.getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	/* for testing that error handling works
		res.status(401);
    throw new Error('ajajjajajjaj');
    */
	res.json(products);
});

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
//const getProductsById = asyncHandler(async (req,res) => {
exports.getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	/* simulate error
	res.status(404);
	throw new Error('Product not found');
	*/

	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error('Product not found');
		// old way:: res.status(404).json({ message: 'Product not found' });
	}
});

/*
exports {
  getProducts,
  getProductById
}
*/
