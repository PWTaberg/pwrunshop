// import express from 'express';
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');

// import { notFound, errorHandler } from './middleware/errorMiddleware.js';
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');
const connectDB = require('./config/db.js');
const productRoutes = require('./routes/productRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const uploadRoutes = require('./routes/uploadRoutes.js');

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

app.get('/api/config/paypal', (req, res) => {
	res.send(process.env.PAYPAL_CLIENT_ID);
});

// define uploads folder __dirname points to backend dir

//console.log('server, using __dirname:', path.join(__dirname, '/uploads'));
//console.log('server, using process.cwd():',path.join(process.cwd(), '/uploads'));
//app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use('/uploads', express.static(path.join(process.cwd(), '/uploads')));

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
