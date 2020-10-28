// import express from 'express';
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
// import { notFound, errorHandler } from './middleware/errorMiddleware.js';
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');
const connectDB = require('./config/db.js');
const productRoutes = require('./routes/productRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/config/paypal', (req, res) => {
	res.send(process.env.PAYPAL_CLIENT_ID);
});

// Handle errors
// handle 404 errors
app.use(notFound);

// Get errors from routes
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
	)
);
