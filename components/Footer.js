import React from 'react';
import styles from '../styles/footer.module.css'; 

const Footer = () => {
    return (
      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>About Us</h3>
            <p>Our Website is dedicated to providing top-notch services and products.</p>
          </div>
          <div className={styles.footerSection}>
            <h3>Contact</h3>
            <p>Email: yass@company.com</p>
            <p>Phone: 9876543210</p>
          </div>
          <div className={styles.footerSection}>
            <h3>Quick Links</h3>
            <a href="/">Home</a>
        
          </div>
          <div className={styles.footerSection}>
            <h3>Follow Us</h3>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">Youtube</a>
          </div>
        </div>
        <div className={styles.footerCopy}>
          <p>© 2023 Copyright By Yass Store</p>
        </div>
      </div>
    );
  };
  
  export default Footer;