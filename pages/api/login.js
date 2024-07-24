// pages/api/login.js

import connectDB from '../../src/app/utils/db';
import User from '../../src/app/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

connectDB();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      return handleLogin(req.body, res);
    case 'PUT':
      return handleUpdatePassword(req.body, res);
    case 'GET':
      return handleGetUserDetails(req.query, res);
    default:
      return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

async function handleLogin({ email, password }, res) {
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if user already has a token
    if (user.token) {
      return res.status(200).json({ token: user.token });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    // Save token to user document
    user.token = token;
    await user.save();

    res.status(200).json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function handleUpdatePassword({ email, currentPassword, newPassword }, res) {
  try {
    if (!newPassword) {
      return res.status(400).json({ error: 'New password is required' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Validate current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid current password' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Update password error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function handleGetUserDetails({ email }, res) {
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error('Get user details error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}
