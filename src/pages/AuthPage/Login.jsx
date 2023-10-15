import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useAuth} from '../../context/auth-context';

const Login = ({ open, handleClose }) => {

  const {loginHandler} = useAuth();

  const [userLoginDetails, setUserLoginDetails] = useState({
    userEmail: "",
    password: "",
    hidePassword: true,
  });

  const loginFormInputHandler = (e) => {
    const { name, value } = e.target;
    setUserLoginDetails({ ...userLoginDetails, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
   loginHandler(userLoginDetails);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ 
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            name = "userEmail"
            value={userLoginDetails.userEmail}
            onChange={loginFormInputHandler}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            name  = "password"
            value={userLoginDetails.password}
            onChange={loginFormInputHandler}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default Login;
