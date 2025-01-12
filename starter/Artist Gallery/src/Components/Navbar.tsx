import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <header>
      <Link to="/" className="navLink">
        <div className="nav">
          <h1>Music Db</h1>
        </div>
      </Link>
      <hr />
    </header>
  );
};

export default Navbar;
