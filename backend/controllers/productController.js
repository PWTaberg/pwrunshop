const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel.js');

// @desc Fetch all products
// @route GET /api/products
// @access Public
//const getProducts = asyncHandler(async (req,res) => {

exports.getProducts = asyncHandler(async (req, res) => {
	console.log('getProducts');

	const pageSize = 4;
	let page = 1;
	if (req.query.pageNumber) {
		console.log('pageNumber', req.query.pageNumber);
		page = Number(req.query.pageNumber);
	}

	console.log('pageSize', pageSize);
	console.log('page', page);

	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: 'i',
				},
		  }
		: {};
	const count = await Product.countDocuments({ ...keyword });
	console.log('count', count);
	const products = await Product.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (page - 1));

	res.json({ products, page, pages: Math.ceil(count / pageSize) });

	// res.json(products);
});
/*	
exports.getProducts = asyncHandler(async (req, res) => {
	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: 'i',
				},
		  }
		: {};

	console.log('getProducts keyword', keyword, ' page ', page);

	//const count = await Product.count({ ...keyword });
	//const products = await Product.find({ ...keyword });
	const products = await Product.find({});

	
	const products = await Product.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (page - 1));
		

	//res.json({ products, page, pages: Math.ceil(count / pageSize) });
	res.json(products);
});
*/

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
// @access Private/admin
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

// @desc  Create new review
// @route POST /api/products/:id/review
// @access Private
//const updateProducr = asyncHandler(async (req,res) => {
exports.createProductReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		const alreadyReviewed = product.reviews.find(
			(review) => review.user.toString() === req.user._id.toString()
		);

		if (alreadyReviewed) {
			res.status(400);
			throw new Error('Product already reviewed');
		}

		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		};

		product.reviews.push(review);
		product.numReviews = product.reviews.length;
		product.rating =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length;

		await product.save();
		res.status(201).json({ message: 'Review added' });
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
