import React, { useState, useEffect } from 'react';
import "./App.css";
import AppointmentTable from './component/appointment/AppointmentTable';
import Navbar from './component/navbar/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Footer from './component/footer/Footer';
import Home from './component/home/Home.js';  // Home page component
import About from './component/About.js';  // About page component
import Login from './component/login/Login.js';
import { onAuthStateChanged } from 'firebase/auth';  // Import Firebase auth
import { auth } from './firebaseConfig'; // Your Firebase config

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // To track the logged-in status

  // Check if the user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true); // Set user as logged in
      } else {
        setIsLoggedIn(false); // Set user as logged out
      }
    });

    return () => unsubscribe(); // Cleanup on component unmount
  }, []);

  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Navbar Component */}
        <Navbar />
        
        {/* Main Content */}
        <main>
          <Routes>
            {/* Define Routes for each page */}
            <Route path="/" element={<Home />} />  {/* Home page */}
            <Route path="/about" element={<About />} />  {/* About page */}
            <Route path="/login" element={<Login />} />  {/* Login page */}

            {/* Protected Route: Only show /appointments if user is logged in */}
            <Route
              path="/appointments"
              element={isLoggedIn ? <AppointmentTable /> : <Navigate to="/login" />}
            />

            {/* Add other routes as needed */}
          </Routes>
        </main>
        
        {/* Footer Component */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
