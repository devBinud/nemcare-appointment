// src/App.js
import React from 'react';
import "./App.css";
import AppointmentTable from './component/appointment/AppointmentTable';
import Navbar from './component/navbar/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";  
import Footer from './component/footer/Footer';
import Home from './component/home/Home.js';  // Home page component
import About from './component/About.js';  // About page component
import Login from './component/login/Login.js';

function App() {
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
            <Route path="/login" element={<Login />} />  {/* About page */}
            <Route path="/appointments" element={<AppointmentTable />} /> {/* Appointments page */}
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
