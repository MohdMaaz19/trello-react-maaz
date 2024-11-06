import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

const NotFoundPage = () => {
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      justifyContent="center" 
      alignItems="center" 
      height="100vh"
      textAlign="center"
    >
      <WarningIcon fontSize="large" color="warning" />
      <Typography variant="h3" component="h1" gutterBottom>
        404 Not Found
      </Typography>
      <Typography variant="h6" gutterBottom>
        This page does not exist
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        component={Link} 
        to="/" 
        sx={{ mt: 2 }}
      >
        Go Back
      </Button>
    </Box>
  );
}

export default NotFoundPage;
