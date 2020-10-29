const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel.js');

// @desc Create new order
// @route POST /api/orders
// @access Private
//const addOrderItems = asyncHandler(async (req,res) => {

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

// @desc Get order by id
// @route GET /api/orders/:id
// @access Private
//const getOrderById = asyncHandler(async (req,res) => {

exports.getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		'user',
		'name email'
	);

	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
//const updateOrderToPaid = asyncHandler(async (req,res) => {

exports.updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		};

		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private
//const updateOrderToPaid = asyncHandler(async (req,res) => {

exports.getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id });
	res.json(orders);
});

/*
exports {
  getProducts,
  getProductById
}
*/
