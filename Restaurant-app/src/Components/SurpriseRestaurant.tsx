import React from "react";
import { useStore } from "../Store";
import { Link } from "react-router-dom";

const SurpriseRestaurant: React.FC = () => {
  const { restaurants } = useStore((state) => state);
  const getRandomRestaurant = () => {
    if (restaurants.length > 0) {
      const randomIndex = Math.floor(Math.random() * restaurants.length);
      return restaurants[randomIndex];
    }
    return null;
  };

  const randomRestaurant = getRandomRestaurant();

  return (
    <header>
      <h1>Don't know what to eat?</h1>
      {randomRestaurant ? (
        <Link to={`/restaurant/${randomRestaurant.id}`}>
          <button className="btn-surprise">Surprise me!</button>
        </Link>
      ) : (
        <p>Loading restaurants...</p>
      )}
      <hr />
    </header>
  );
};

export default SurpriseRestaurant;
