import React from 'react';
import './Footer.css';  // Import the CSS file for styling

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© Copyright 2024. All Rights Reserved. NHPL IT. <br />eMail us: <a href="mailto:itsupport@nemcare.com">itsupport@nemcare.com</a></p>
        <div className="footer-links">
          <span>About Us</span> | <span>Privacy</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
