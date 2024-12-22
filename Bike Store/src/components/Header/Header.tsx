import React from "react";
import styles from "./Header.module.css";
import { Link, NavLink } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header>
      <img
        src="public/starter/img/logo.png"
        alt="Logo"
        className={styles.logo}
      />
      <ul className={styles.navbar}>
        <li>
          <NavLink to="/" className={styles.active}>
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink to="/bikes">BIKES</NavLink>
        </li>
        <li>
          <NavLink to="/gear">GEAR</NavLink>
        </li>
        <li>
          <NavLink to="/parts">PARTS</NavLink>
        </li>
        <li>
          <NavLink to="/tires">TIRES</NavLink>
        </li>
        <li>
          <NavLink to="/service-info">SERVICE-INFO</NavLink>
        </li>
        <li>
          <NavLink to="/catalogues">CATALOGUES</NavLink>
        </li>
        <li>
          <NavLink to="/contact">CONTACT</NavLink>
        </li>
      </ul>
      <div>
        <Link to="">
          <i className="fa-solid fa-magnifying-glass"></i>
        </Link>
        <Link to="">
          <i className="fa-solid fa-bag-shopping"></i>
        </Link>
      </div>
    </header>
  );
};

export default Header;
