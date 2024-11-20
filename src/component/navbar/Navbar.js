import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig"; // Import your firebase config
import { Button } from "@mui/material"; // Import Button from Material-UI
import "./Navbar.css";
import { FaSignInAlt } from "react-icons/fa"; // Admin login icon
import logo from "../../assets/logo/logo.jpg";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation(); // Get current route location
  const navigate = useNavigate(); // For redirect after logout

  useEffect(() => {
    // Firebase listener to check if the user is logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true); // Set logged in state
      } else {
        setIsLoggedIn(false); // Set logged out state
      }
    });

    return () => unsubscribe(); // Cleanup on component unmount
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase logout
      setIsLoggedIn(false); // Update login state
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <div className="containerss">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            {isLoggedIn ? (
              <img src={logo} alt="Logo" className="navbar-logo" />
            ) : (
              <img src={logo} alt="Logo" className="navbar-logo" />
            )}
          </Link>

          {/* Conditionally render the navbar toggler only if user is not logged in or not on /home */}
          {!(isLoggedIn && location.pathname === "/") && (
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          )}

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* Add any other navbar items here */}
            </ul>
            <form className="d-flex">
              {/* Render Admin Login button only when the user is not logged in and not on /login or /home route */}
              {location.pathname !== "/login" &&
              location.pathname !== "/home" &&
              !isLoggedIn ? (
                <Button
                  component={Link} // Use Link to navigate
                  to="/login"
                  variant="outlined"
                  color="primary"
                  startIcon={<FaSignInAlt />} // Icon for the login button
                  sx={{
                    padding: "8px 16px",
                    fontSize: "16px",
                    textTransform: "none",
                    borderRadius: 3,
                  }}
                >
                  Admin Login
                </Button>
              ) : (
                // Render Logout button only on the /appointments route when logged in
                isLoggedIn &&
                location.pathname === "/appointments" && (
                  <Button
                    onClick={handleLogout}
                    variant="contained"
                    color="danger"
                    startIcon={<FaSignInAlt />} // Icon for the login button
                    sx={{
                      padding: "8px 16px",
                      fontSize: "13px",
                      textTransform: "none",
                      borderRadius: 3,
                    }}
                  >
                    Log Out
                  </Button>
                )
              )}
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
