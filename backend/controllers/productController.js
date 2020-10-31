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
	throw new Error('Hej Anton, Product not found !');
	*/

	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error('Product not found');
		// old way:: res.status(404).json({ message: 'Product not found' });
	}
});

// @desc Delete  product
// @route DELETE /api/products/:id
// @access Private
//const deleteProduct = asyncHandler(async (req,res) => {
exports.deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await product.remove();
		res.json({ message: 'Product removed' });
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// @desc Create product
// @route POST /api/products
// @access Private
//const createProduct = asyncHandler(async (req,res) => {
exports.createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: 'Sample name',
		price: 0,
		user: req.user._id,
		image: '/images/sample.jpg',
		brand: 'Sample brand',
		category: 'Sample category',
		countInStock: 0,
		numReviews: 0,
		description: 'Sample description',
	});

	createdProduct = await product.save();
	res.status(201).json(createdProduct);
});

// @desc  Update product
// @route PUT /api/products/:id
// @access Private
//const updateProducr = asyncHandler(async (req,res) => {
exports.updateProduct = asyncHandler(async (req, res) => {
	const {
		name,
		price,
		description,
		image,
		brand,
		category,
		countInStock,
	} = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		product.name = name;
		product.price = price;
		product.description = description;
		product.image = image;
		product.brand = brand;
		product.category = category;
		product.countInStock = countInStock;

		const updatedProduct = await product.save();
		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});
/*
exports {
  getProducts,
  getProductById
}
*/
