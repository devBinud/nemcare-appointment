import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig'; // Your Firebase config file
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Card,
  CardContent,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Firebase Authentication to log in the user
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/appointments'); // Redirect to the dashboard or desired route
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        height: '79.5vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          width: '100%',
          borderRadius: 4,
          boxShadow: 6,
          overflow: 'hidden',
        }}
      >
        <CardContent sx={{ padding: 4 }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#333' }}
          >
            Welcome Back!
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ mb: 3, color: '#666' }}
          >
            Please log in to your account.
          </Typography>
          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              label="Email"
              variant="outlined"
            
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                sx: {
                  borderRadius: 2,
                },
              }}
            />
            <TextField
              label="Password"
              variant="outlined"
              className="mt-2 mt-lg-0"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 2,
                },
              }}
            />
            {error && (
              <Typography variant="body2" sx={{ color: 'red', textAlign: 'center' }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              className='mt-2 mt-lg-0'
              variant="contained"
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                padding: '12px 0',
                fontSize: '16px',
                textTransform: 'none',
                borderRadius: 3,
                ':hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              Log In
            </Button>
          </Box>
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2, color: '#888' }}
          >
            Forgot your password? <Button sx={{ color: 'primary.main' }}>Click here</Button>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;
