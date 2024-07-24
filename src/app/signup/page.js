'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Grid,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/signup', { username, email, password });
      console.log('Signup successful:', response.data);
      router.push('/login');
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f0f2f5"
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: 400,
          maxWidth: '90%',
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{
            textAlign: 'center',
            mb: 2,
            color: '#1877f2',
            fontWeight: 'bold',
          }}
        >
          Sign Up
        </Typography>
        <Typography
          variant="subtitle1"
          component="p"
          sx={{ textAlign: 'center', mb: 4 }}
        >
          Join us to get started!
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Email"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                startIcon={<AccountCircle />}
                size="small"
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                fullWidth
                sx={{ mt: 2 }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Sign Up'
                )}
              </Button>
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography
                  color="error"
                  sx={{ mt: 2, textAlign: 'center' }}
                >
                  {error}
                </Typography>
              </Grid>
            )}
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default SignupForm;
