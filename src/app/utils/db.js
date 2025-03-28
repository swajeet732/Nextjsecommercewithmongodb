// utils/db.js

import mongoose from 'mongoose';

const connection = {};

async function connectDB() {
  if (connection.isConnected) {
    console.log('Using existing connection');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connection.isConnected = db.connections[0].readyState;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
}

export default connectDB;
