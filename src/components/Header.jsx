// Header.js

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Login from '../pages/AuthPage/Login';
import { useState, useEffect } from 'react';
import Signup from '../pages/AuthPage/Signup';
import DailyTaskModal from './DailyTaskModal';
import MenuList from '@mui/material/MenuList';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const pages = ['Task', 'Task Details', 'Youtube', 'Motivational Quotes', 'Search on Web'];


//const isLoggedIn = localStorage.getItem("loginDetails");

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // State and functions for the Login modal
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  const handleOpenLogin = () => {
    setLoginOpen(true);
  };

  const handleOpenSignup = () => {
    setSignupOpen(true);
  }

  const handleCloseSignup = () => {
    setSignupOpen(false);
  }

  const handleCloseLogin = () => {
    setLoginOpen(false);
  };

  const handleOpenDailyTaskModal = () => {
    // Check if the user is logged in
    if (isLoggedin) {
      // Open the DailyTaskModal
      setDailyTaskModalOpen(true);
    } else {
      // Display a toast message telling the user to log in first
      toast('Please login first', { type: 'error' });
    }
  };

  const handleLogout = () =>{
    localStorage.clear();
    setIsLoggedIn(false);
  }

  const [dailyTaskModalOpen, setDailyTaskModalOpen] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loginDetails");
    if (isLoggedIn) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setDailyTaskModalOpen(false);
    }
  }, [isLoggedin]);

  return (
    <>
    <ToastContainer />
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              टू-डूApp
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {isLoggedin ? (
                  <MenuList>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                    <MenuItem>
                      <Typography textAlign="center">Account</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </MenuList>
                ) : (
                  <MenuList>
                    <MenuItem onClick={handleOpenLogin}>
                      <Typography textAlign="center">Login</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleOpenSignup}>
                      <Typography textAlign="center">Signup</Typography>
                    </MenuItem>
                  </MenuList>
                )}
              </Menu>
            </Box>
           
          </Toolbar>
        </Container>
      </AppBar>

      {/* Render the Login modal */}
      <Login open={isLoginOpen} handleClose={handleCloseLogin} />
      <Signup open={signupOpen} handleClose={handleCloseSignup} />
      <Button onClick={handleOpenDailyTaskModal}>Open Daily Task Modal</Button>

      

      {/* Render the DailyTaskModal */}
      <DailyTaskModal open={dailyTaskModalOpen} handleClose={() => setDailyTaskModalOpen(false)} />
    </>
  );
}

export default Header;
