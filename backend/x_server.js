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

// route for paypal to return key to client
app.get('/api/config/paypal', (req, res) => {
	res.send(process.env.PAYPAL_CLIENT_ID);
});

/*
console.log(
	'express.static, using __dirname:',
	path.join(__dirname, '/frontend/build')
);
console.log(
	'express.static, using process.cwd:',
	path.join(process.cwd(), '/frontend/build')
);
console.log(
	'res.sendFile, using process.cwd:',
	path.resolve(process.cwd(), 'frontend', 'build', 'index.html')
);

*/

//console.log('__dirname', __dirname);
//const __dirname = path.resolve() --- does not work
//app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// __dirname pints to backend
app.use('/uploads', express.static(path.join(process.cwd(), '/uploads')));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(process.cwd(), '/frontend/build')));

	app.get('*', (req, res) =>
		res.sendFile(
			path.resolve(process.cwd(), 'frontend', 'build', 'index.html')
		)
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
