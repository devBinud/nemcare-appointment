import React, { useState } from 'react';
import AppointmentTable from '../appointment/AppointmentTable';
import './Login.css'; // Import the CSS file

// Component to display after successful login
function Dashboard() {
  return (
    <div>
      <AppointmentTable />
    </div>
  );
}

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    // Validate credentials
    if (username === 'admin' && password === 'nemcare@2024') {
      setIsLoggedIn(true); // Successful login
    } else {
      alert('Invalid username or password');
    }
  };

  // If logged in, render the Dashboard component directly
  if (isLoggedIn) {
    return <Dashboard />;
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-heading">Login</h2>
        <div className="login-input-container">
          <label className="login-label">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            placeholder="Enter your username"
          />
        </div>
        <div className="login-input-container">
          <label className="login-label">Password</label>
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'} // Toggle input type
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)} // Toggle visibility
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
