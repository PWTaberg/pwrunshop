const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel.js');

// @desc Create new order
// @route POST /api/orders
// @access Private
//const getProducts = asyncHandler(async (req,res) => {

exports.addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;

	// If no orderItems in body or if orderItems is empty
	if (!orderItems || (orderItems && orderItems.length === 0)) {
		res.status(400);
		throw new Error('No order Items');
		return;
	} else {
		const order = new Order({
			orderItems,
			user: req.user._id,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		});

		const createdOrder = await order.save();
		res.status(201).json(createdOrder);
	}
});

/*
exports {
  getProducts,
  getProductById
}
*/
