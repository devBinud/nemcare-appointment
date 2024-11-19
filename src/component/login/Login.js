import React, { useState } from 'react';
import AppointmentTable from '../appointment/AppointmentTable';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Container,
  Card,
  CardContent,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Dashboard() {
  return (
    <Box>
      <AppointmentTable />
    </Box>
  );
}

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'nemcare@2024') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid username or password');
    }
  };

  if (isLoggedIn) {
    return <Dashboard />;
  }

  return (
    <Box
      sx={{
        height: '79.5vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // background: 'linear-gradient(135deg, #6b73ff 0%, #000dff 100%)',
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
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                sx: {
                  borderRadius: 2,
                },
              }}
            />
            <TextField
              label="Password"
              variant="outlined"
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
            <Button
              type="submit"
              fullWidth
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
