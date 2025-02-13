import React from "react";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Navbar: React.FC = () => (
  <>
    <nav>
      <Link to="/">
        <h3>Restaurant</h3>
      </Link>
      <Link to={"/favorites"}>
        <FavoriteIcon sx={{ color: "#FF6247", fontSize: "40px" }} />
      </Link>
    </nav>
    <hr />
  </>
);

export default Navbar;
