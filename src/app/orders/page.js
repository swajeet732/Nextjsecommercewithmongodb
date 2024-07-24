// src/app/orders/page.js
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      const email = localStorage.getItem('email');
      if (!email) {
        setError('No email found in local storage.');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:3000/api/getorders?email=${email}`);
        setOrders(res.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching orders.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Box className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="flex justify-center items-center min-h-screen">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box className="flex min-h-screen bg-gray-100">
     
      <Box className={`flex-1 py-10 px-5 transition-all duration-300 ${isDrawerOpen ? 'ml-64' : 'ml-0'}`}>
        <Typography variant="h4" component="h1" className="text-center mb-8">
          Orders for {localStorage.getItem('email')}
        </Typography>
        {orders.length === 0 ? (
          <Typography className="text-center text-lg">No orders found.</Typography>
        ) : (
          <List className="max-w-4xl mx-auto">
            {orders.map((order) => (
              <ListItem key={order._id} component={Paper} className="mb-6 p-4" elevation={2}>
                <Box className="mb-4">
                  <Typography variant="h6">
                    Order ID: <span className="text-gray-700">{order._id}</span>
                  </Typography>
                  <Typography variant="h6">
                    Total Price: <span className="text-gray-700">${order.totalPrice.toFixed(2)}</span>
                  </Typography>
                </Box>
                <List>
                  {order.products.map((product) => (
                    <ListItem key={product._id} divider>
                      <ListItemText
                        primary={
                          <Typography className="font-medium">
                            Product Name: <span className="text-gray-700">{product.name}</span>
                          </Typography>
                        }
                        secondary={
                          <Typography className="font-medium">
                            Product Price: <span className="text-gray-700">${product.price.toFixed(2)}</span>
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default OrdersPage;
