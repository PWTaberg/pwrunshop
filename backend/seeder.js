//import mongoose from 'mongoose';
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const users = require('./data/users.js');
const products = require('./data/products.js');
const User = require('./models/UserModel.js');
const Product = require('./models/productModel.js');
const Order = require('./models/orderModel.js');
const connectDB = require('./config/db.js');

dotenv.config();

connectDB();

// command: node backend/seeder
const importData = async () => {
  try {
    // Remove all instances from DB
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data removed'.red.inverse);

    // Add to DB
    const createdUsers = await User.insertMany(users);

    // get Admin from array, the first item
    const adminUser = createdUsers[0]._id;
    // add admin as owner/user to all products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // Add sampleProducts to DB
    await Product.insertMany(sampleProducts);
    console.log('Data imported'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// command: node backend/seeder -d
const destroyData = async () => {
  try {
    // Remove all instances from DB
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

//console.log(`Command: ${process.argv}`)
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
