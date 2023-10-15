import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useAuth} from '../../context/auth-context';

const Signup = ({ open, handleClose }) => {
  const {signupHandler} = useAuth();
  const [userSignupDetails, setUserSignupDetails] = useState({
    userEmail: '',
    password: '',
    userName:'',
    confirmPassword: '',
    pwdMatch: true,
    hide: { pwd: true, confirmPwd: true },
  });

  const signupFormInputHandler = (e) => {
    const { name, value } = e.target;
    if (name === 'confirmPassword') {
      setUserSignupDetails({
        ...userSignupDetails,
        [name]: value,
        pwdMatch: value === userSignupDetails.password ? true : false,
      });
    } else {
      setUserSignupDetails({ ...userSignupDetails, [name]: value });
    }
  };

  const signupFormSubmitHandler = async (e) => {
    e.preventDefault();
    if (!userSignupDetails.pwdMatch) {
      toast.error('Password doesnt match.');
    } else {
      console.log(userSignupDetails);
     signupHandler(userSignupDetails);
    }
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
        <h2>Register</h2>
        <form onSubmit={signupFormSubmitHandler}>
        <TextField
            fullWidth
            label="UserName"
            variant="outlined"
            name = "userName"
            value={userSignupDetails.userName}
            onChange={signupFormInputHandler}
            margin="normal"
          />
          <TextField
            fullWidth
            label="userEmail"
            variant="outlined"
            name = "userEmail"
            value={userSignupDetails.userEmail}
            onChange={signupFormInputHandler}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            name = "password"

            value={userSignupDetails.password}
            onChange={signupFormInputHandler}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Confirm Password"
            variant="outlined"
            type="password"
            name = "confirmPassword"
            value={userSignupDetails.confirmPassword}
            onChange={signupFormInputHandler}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default Signup;
