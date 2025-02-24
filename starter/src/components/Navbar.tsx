import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AddIcon from "@mui/icons-material/Add";

const Navbar: React.FC = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOutUser();
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <nav>
      <Link to="/all-workouts">
        <FitnessCenterIcon style={{ color: "white" }} />
      </Link>
      {user && (
        <Link to="/add-workout">
          <AddIcon style={{ color: "white" }} />
        </Link>
      )}
      {user && (
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
