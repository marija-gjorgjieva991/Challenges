import { useNavigate } from "react-router-dom";
import { useStore } from "../Store";
import RestaurantCard from "./RestaurantCard";

const Favorites = () => {
  const { restaurants, toggleFavorite } = useStore();
  const favoriteRestaurants = restaurants.filter(
    (restaurant) => restaurant.isFavorite
  );
  const navigate = useNavigate();

  const onNavigate = (id: string) => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <div>
      <h2>Your favorite restaurants</h2>
      {favoriteRestaurants.length > 0 ? (
        <div className="restaurant-cards-container">
          {favoriteRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="restaurant-card">
              <RestaurantCard
                id={restaurant.id}
                name={restaurant.businessname}
                restaurantType={restaurant.restauranttype}
                rating={restaurant.rating}
                reviews={restaurant.reviews}
                image={restaurant.image}
                isFavorite={restaurant.isFavorite}
                onToggleFavorite={toggleFavorite}
                onNavigate={onNavigate}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No favorite restaurants yet!</p>
      )}
    </div>
  );
};

export default Favorites;
