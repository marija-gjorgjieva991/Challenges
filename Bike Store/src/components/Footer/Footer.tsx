import React from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialContent}>
        <h2>Social share</h2>
        <div className={styles.socialIcons}>
          <Link to="">
            <i className="fa-brands fa-facebook-f"></i>
          </Link>
          <Link to="">
            <i className="fa-brands fa-instagram"></i>
          </Link>
          <Link to="">
            <i className="fa-brands fa-twitter"></i>
          </Link>
          <Link to="">
            <i className="fa-brands fa-linkedin-in"></i>
          </Link>
        </div>
      </div>

      <div className={styles.eventInfo}>
        <h2>Event info</h2>
        <Link to="">Enter now</Link>
        <Link to="">Event info</Link>
        <Link to="">Course maps</Link>
        <Link to="">Race pack</Link>
        <Link to="">Results</Link>
        <Link to="">FAQs</Link>
        <Link to="">Am I registered?</Link>
      </div>

      <div className={styles.registration}>
        <h2>Registration</h2>
        <Link to="">Volunteers</Link>
        <Link to="">Gallery</Link>
        <Link to="">Press</Link>
        <Link to="">Results</Link>
        <Link to="">Privacy policy</Link>
        <Link to="">Service plus</Link>
        <Link to="">Contacts</Link>
      </div>

      <div className={styles.schedule}>
        <h2>Schedule</h2>
        <Link to="">Gallery</Link>
        <Link to="">About</Link>
        <Link to="">Videos</Link>
        <Link to="">Results</Link>
        <Link to="">FAQs</Link>
        <Link to="">Results</Link>
        <Link to="">Volunteers</Link>
      </div>
    </footer>
  );
};

export default Footer;
