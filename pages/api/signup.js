// src/app/pages/api/signup.js

import connectDB from '../../src/app/utils/db';
import User from '../../src/app/models/User';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

connectDB();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    try {
      // Check if user with same email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user instance
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        token: uuidv4(), // Generate a unique token
      });

      // Save the user to the database
      await newUser.save();

      // Respond with success message
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyValue) {
        // Duplicate key error
        const fieldName = Object.keys(error.keyPattern)[0];
        const value = error.keyValue[fieldName];
        return res.status(400).json({ error: `${fieldName} '${value}' already exists` });
      }
      console.error('Signup error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}



