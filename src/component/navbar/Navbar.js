import React from 'react'
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import "./Navbar.css";
import logo from "../../assets/logo/logo.jpg"

function Navbar() {
  return (
     <div className='containerss'>
            <nav className="navbar navbar-expand-lg navbar-light">
  <div class="container">
    <Link class="navbar-brand" to="/">
    <img src={logo} alt="Logo" className="navbar-logo" />
    </Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        
      </ul>
      <form class="d-flex">
        <Link to='/login' class="adminLogin__button" type="submit">
        Admin Login</Link>
      </form>
    </div>
  </div>
</nav>
     </div>
  )
}

export default Navbar