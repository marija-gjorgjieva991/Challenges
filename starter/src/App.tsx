import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./context/auth-context";
import Welcome from "../src/components/Welcome";
import AllWorkouts from "../src/components/AllWorkouts";
import AddNewWorkout from "../src/components/AddNewWorkout";
import Navbar from "../src/components/Navbar";
import "./App.css";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

const AppRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <Navbar />}{" "}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/all-workouts" element={<AllWorkouts />} />
        <Route path="/add-workout" element={<AddNewWorkout />} />
      </Routes>
    </>
  );
};

export default App;
