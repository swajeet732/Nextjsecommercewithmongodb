'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';

const ProductsPage = () => {
  useAuth();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchProducts();
    const userEmail = localStorage.getItem('email');
    console.log(userEmail,'lihjgyfdsa');
    if (userEmail) {
      setEmail(userEmail);
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/Product');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    calculateTotalPrice(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
    calculateTotalPrice(updatedCart);
  };

  const calculateTotalPrice = (cartItems) => {
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(total);
  };

  const submitOrder = async () => {
    try {
      if (!email) {
        console.error('Email is required to submit the order.');
        return;
      }

      const orderData = {
        products: cart,
        totalPrice,
        email,
      };

      const response = await axios.post('/api/sellproduct', orderData);
      console.log('Order submitted successfully:', response.data);
      setCart([]);
      setTotalPrice(0);
      alert('Your order has been submitted successfully!');
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit your order. Please try again later.');
    }
  };

  const navigateToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <Box className="container mx-auto flex">
      <Box className="flex-grow ml-64 p-4">
        <Typography variant="h4" className="mb-4">
          Football Jerseys
        </Typography>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
              <Card className="shadow-md" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardMedia
                  component="img"
                  image={`/images/${product.imageUrl}`}
                  alt={product.name}
                  sx={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                />
                <CardContent style={{ flexGrow: 1 }}>
                  <Typography variant="h6" className="mb-2">
                    {product.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    ${product.price}
                  </Typography>
                  <Button
                    onClick={() => addToCart(product)}
                    variant="contained"
                    color="primary"
                    className="mt-2"
                    style={{ marginTop: '1rem' }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Cart Summary */}
        <Box className="mt-8">
          <Typography variant="h5" className="mb-4">
            Cart Summary
          </Typography>
          {cart.length > 0 ? (
            <>
              <List>
                {cart.map((item) => (
                  <ListItem key={item._id}>
                    <ListItemText primary={item.name} secondary={`$${item.price}`} />
                    <ListItemSecondaryAction>
                      <Button
                        onClick={() => removeFromCart(item._id)}
                        color="secondary"
                        size="small"
                      >
                        Remove
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Total Price:</Typography>
                <Typography variant="h6">${totalPrice}</Typography>
              </Box>
              <Button
                onClick={submitOrder}
                variant="contained"
                color="success"
                className="mt-4"
              >
                Submit Order
              </Button>
            </>
          ) : (
            <Typography>Your cart is empty.</Typography>
          )}
        </Box>

        {/* Back to Dashboard Button */}
        <Box className="mt-8" textAlign="center">
          <Button
            onClick={navigateToDashboard}
            variant="contained"
            color="secondary"
          >
            Back to Dashboard
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductsPage;
