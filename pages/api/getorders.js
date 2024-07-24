// pages/api/getordersbyemail.js

import connectDB from '../../../my-ecommerce-app/src/app/utils/db';
import Order from '../../src/app/models/Order';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    try {
      // Connect to the database
      await connectDB();

      // Fetch orders from MongoDB for the given email, populating the products field
      const orders = await Order.find({ email }).populate('products');

      // Return the orders as JSON
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'Error fetching orders' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
