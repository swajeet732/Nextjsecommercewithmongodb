// pages/api/customers.js

import connectDB from '../../src/app/utils/db';
import Customer from '../../src/app/models/Customer';

connectDB();

export default async function handler(req, res) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      if (query.id) {
        return getCustomerById(req, res);
      } else {
        return getAllCustomers(req, res);
      }
    case 'POST':
      return createCustomer(req, res );
      case 'PUT':
        return updateCustomer(req, res);
    case 'DELETE':
      return deleteCustomer(req, res);
    default:
      return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

async function getCustomerById(req, res) {
  try {
    const { id } = req.query; 
    console.log(id,'ihfhgdsfda');

    // Find customer details by ID
    const customer = await Customer.findById(id);
    console.log(customer,'kugjyhftdgfz');

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.status(200).json(customer);
  } catch (error) {
    console.error('Get customer details error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

async function getAllCustomers(req, res) {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    console.error('Get all customers error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

async function createCustomer(req, res) {
  try {
    const { email } = req.body;
    const existingCustomer = await Customer.findOne({ email });

    if (existingCustomer) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    console.error('Create customer error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

async function updateCustomer(req, res) {
  const { id } = req.query; // Extracting id from query parameters
  const { firstName, lastName, address, city, state, zipCode, country, phone } = req.body;

  try {
    // Find and update customer by id
    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      { firstName, lastName, address, city, state, zipCode, country, phone },
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error('Update customer error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}


async function deleteCustomer(req, res) {
  try {
    const { id } = req.body;
    const customer = await Customer.findByIdAndDelete(id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Delete customer error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}