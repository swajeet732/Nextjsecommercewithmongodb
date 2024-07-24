'use client';
import React from 'react';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Container, Typography, Box, Grid, Paper, Button } from '@mui/material';

const Home = () => {
  const router = useRouter();
  useAuth();

  const handleNavigate = () => {
    router.push('/dashboard');
  };

  return (
    <div style={{ display: 'flex' }}>
      <Container
        maxWidth="lg"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(to right, #3b82f6, #9333ea)',
        }}
      >
        <Paper
          elevation={3}
          style={{
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '600px',
            width: '100%',
            margin: '0 1rem',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom align="center" color="textPrimary">
            Welcome to Lucifer Jersey Store!
          </Typography>
          <Typography variant="body1" gutterBottom align="center" color="textSecondary">
            This is a simple example of a Next.js application styled with Material-UI.
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={6}>
              <img
                src="/images/goat.jpg"
                alt="Goat"
                style={{
                  borderRadius: '8px',
                  width: '100%',
                  boxShadow: '0px 0px 15px rgba(0,0,0,0.1)',
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <img
                src="/images/goatt.jpg"
                alt="Goatt"
                style={{
                  borderRadius: '8px',
                  width: '100%',
                  boxShadow: '0px 0px 15px rgba(0,0,0,0.1)',
                }}
              />
            </Grid>
          </Grid>
          <Box mt={3} textAlign="center">
            <Button variant="contained" color="primary" onClick={handleNavigate}>
              Go to Dashboard
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Home;
