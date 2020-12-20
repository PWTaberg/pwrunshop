// import express from 'express';
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');

const {
	notFound,
	errorHandler,
} = require('./backend/middleware/errorMiddleware.js');

const connectDB = require('./backend/config/db.js');
const productRoutes = require('./backend/routes/productRoutes.js');
const userRoutes = require('./backend/routes/userRoutes.js');
const orderRoutes = require('./backend/routes/orderRoutes.js');
const uploadRoutes = require('./backend/routes/uploadRoutes.js');

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// route for uploading
app.use('/api/upload', uploadRoutes);

// route for paypal to return key to client
app.get('/api/config/paypal', (req, res) => {
	res.send(process.env.PAYPAL_CLIENT_ID);
});

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/frontend/build')));

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
	);
} else {
	app.get('/', (req, res) => {
		res.send('API is running...');
	});
}

// Handle errors
// handle 404 errors
// Set not found as default ?
app.use(notFound);

// Get errors from routes
// check actual error
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
	PORT,
	console.log(
		`Server running in  ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
	)
);
