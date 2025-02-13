import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import AllRestaurants from "./Components/AllRestaurants";
import RestaurantDetail from "./Components/RestaurantDetail";
import Favorites from "./Components/Favorites";
import CuisineDetail from "./Components/CuisineDetail";
import "./App.css";
import { useStore } from "./Store";

const App: React.FC = () => {
  const fetchRestaurants = useStore((state) => state.fetchRestaurants);
  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AllRestaurants />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/cuisine/:type" element={<CuisineDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
