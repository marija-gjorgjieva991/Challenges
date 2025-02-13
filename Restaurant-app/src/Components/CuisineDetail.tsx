import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import { useNavigate } from "react-router-dom";
import { Restaurant, useStore } from "../Store";

const CuisineDetail = () => {
  const { type } = useParams<{ type: string }>();
  const { restaurants, toggleFavorite } = useStore();
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    []
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (type) {
      const filtered = restaurants.filter(
        (restaurant) =>
          restaurant.restauranttype.toLowerCase() === type.toLowerCase()
      );
      setFilteredRestaurants(filtered);
    }
  }, [type, restaurants]);
  const onNavigate = (id: string) => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <div>
      <h2>{type} Restaurants</h2>
      <div className="cards-container">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              id={restaurant.id}
              name={restaurant.businessname}
              restaurantType={restaurant.restauranttype}
              rating={restaurant.rating}
              reviews={restaurant.reviews}
              image={restaurant.image}
              isFavorite={restaurant.isFavorite}
              onToggleFavorite={() => toggleFavorite(restaurant.id)}
              onNavigate={onNavigate}
            />
          ))
        ) : (
          <p>No restaurants found for this cuisine type.</p>
        )}
      </div>
    </div>
  );
};

export default CuisineDetail;
