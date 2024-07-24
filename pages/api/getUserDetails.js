// src/app/pages/api/getUserDetails.js

import connectDB from '../../../my-ecommerce-app/src/app/utils/db';
import User from '../../../my-ecommerce-app/src/app/models/User';

connectDB();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { email } = req.query;

    try {
      // Fetch user by email with selected fields: _id and token
      const user = await User.findOne({ email }, '_id token username email');
      console.log(user, 'uccm');
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
