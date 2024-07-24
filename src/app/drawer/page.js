'use client';
import React, { useEffect } from 'react';
import {
    Menu as MenuIcon,
    Home as HomeIcon,
    Person as UserIcon,
    BusinessCenter as BriefcaseIcon,
    ListAlt as ClipboardListIcon,
    ExitToApp as LogoutIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Drawer as MUIDrawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box
} from '@mui/material';

const Drawer = ({ isOpen, toggleDrawer }) => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        router.push('/login');
    };

    return (
        <>
            <IconButton
                onClick={toggleDrawer}
                style={{ position: 'fixed', top: 16, left: 16, zIndex: 50, backgroundColor: 'black', color: 'white' }}
            >
                <MenuIcon />
            </IconButton>
            <MUIDrawer
                variant="persistent"
                anchor="left"
                open={isOpen}
                sx={{
                    width: 270,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 270,
                        boxSizing: 'border-box',
                        backgroundColor: '#1A202C',
                        color: 'white',
                    },
                }}
            >
                <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
                    <HomeIcon style={{ fontSize: 48, color: 'white' }} />
                    <IconButton onClick={toggleDrawer} style={{ color: 'white' }}>
                        <MenuIcon />
                    </IconButton>
                </Box>

                <List>
                    <ListItem button component={Link} href="/home" onClick={toggleDrawer}>
                        <ListItemIcon style={{ color: 'white' }}>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button component={Link} href="/dashboard" onClick={toggleDrawer}>
                        <ListItemIcon style={{ color: 'white' }}>
                            <BriefcaseIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem button component={Link} href="/customer" onClick={toggleDrawer}>
                        <ListItemIcon style={{ color: 'white' }}>
                            <UserIcon />
                        </ListItemIcon>
                        <ListItemText primary="Customer Profile" />
                    </ListItem>
                    <ListItem button component={Link} href="/products" onClick={toggleDrawer}>
                        <ListItemIcon style={{ color: 'white' }}>
                            <ClipboardListIcon />
                        </ListItemIcon>
                        <ListItemText primary="Products" />
                    </ListItem>
                    <ListItem button component={Link} href="/orders" onClick={toggleDrawer}>
                        <ListItemIcon style={{ color: 'white' }}>
                            <ClipboardListIcon />
                        </ListItemIcon>
                        <ListItemText primary="See Orders" />
                    </ListItem>
                    <ListItem button onClick={handleLogout}>
                        <ListItemIcon style={{ color: 'white' }}>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </MUIDrawer>
        </>
    );
};

export default Drawer;
