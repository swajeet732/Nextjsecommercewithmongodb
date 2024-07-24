'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Drawer from '../drawer/page';
import useAuth from '@/hooks/useAuth';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const DashboardPage = () => {
  useAuth();
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = () => {
    const localImages = [
      { id: 1, src: '/photos/1.jpg', author: 'Author 1' },
      { id: 2, src: '/photos/3.avif', author: 'Author 2' },
      { id: 3, src: '/photos/4.webp', author: 'Author 3' },
      { id: 4, src: '/photos/5.avif', author: 'Author 4' },
      { id: 5, src: '/photos/6.jpg', author: 'Author 5' },
      { id: 6, src: '/photos/7.png', author: 'Author 6' },
      { id: 7, src: '/photos/9.webp', author: 'Author 7' },
      { id: 8, src: '/goat.jpg', author: 'Author 8' },
      { id: 9, src: '/goatt.jpg', author: 'Author 9' },
      { id: 10, src: '/images/bellingham.jpg', author: 'Author 10' },
      { id: 11, src: '/images/beckham.jpg', author: 'Author 11' },
      { id: 12, src: '/images/zidane.webp', author: 'Author 12' },
    ];
    setImages(localImages);
  };

  const handleShopNowClick = () => {
    router.push('/products');
  };

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Box className="container mx-auto flex">
      <Drawer isOpen={isOpen} toggleDrawer={toggleDrawer} />

      <IconButton
        onClick={toggleDrawer}
        sx={{ position: 'absolute', top: 16, left: 16, zIndex: 1000 }}
      >
        <MenuIcon />
      </IconButton>

      <Box
        className="flex-grow transition-all duration-300"
        sx={{ marginLeft: isOpen ? '270px' : '64px', p: 4 }}
      >
        <Typography variant="h4" className="mb-8 text-center text-blue-600">
          Dashboard
        </Typography>

        <Grid container spacing={4}>
          {images.map((image) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={image.id}>
              <Card className="shadow-lg transition-shadow duration-300 h-full">
                <CardMedia
                  component="img"
                  image={image.src}
                  alt={`Image ${image.id}`}
                  height="200"
                  className="rounded-lg object-cover"
                />
                <CardContent className="flex flex-col justify-between h-full">
                  <Typography variant="body1" className="text-gray-800 font-medium text-center">
                    {image.author}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box className="flex justify-center mt-12">
          <Button
            onClick={handleShopNowClick}
            variant="contained"
            color="primary"
            className="py-2 px-6"
          >
            Shop Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;
