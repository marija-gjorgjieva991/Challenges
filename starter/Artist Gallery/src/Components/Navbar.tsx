import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <>
      <Link to="/" className="navLink">
        <div className="nav">
          <h1>Music Db</h1>
        </div>
      </Link>
      <hr />
    </>
  );
};

export default Navbar;
