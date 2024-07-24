// pages/api/products.js

import connectDB from '../../src/app/utils/db';
import Product from '../../src/app/models/Product';

connectDB();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return getProducts(req, res);
    case 'POST':
      return createProduct(req, res);
    case 'PUT':
      return updateProduct(req, res);
    case 'DELETE':
      return deleteProduct(req, res);
    default:
      return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

async function getProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

async function createProduct(req, res) {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.body;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.body;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}
