import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

function Footer() {
  return (
    <Box sx={{ padding: '16px', backgroundColor: '#ccc' }}>
      <Typography variant="body1" component="p" align="center">
        Copyright © 2023
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
        <IconButton href="https://www.facebook.com/" target="_blank">
          <Facebook />
        </IconButton>
        <IconButton href="https://www.twitter.com/" target="_blank">
          <Twitter />
        </IconButton>
        <IconButton href="https://www.instagram.com/" target="_blank">
          <Instagram />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Footer;
