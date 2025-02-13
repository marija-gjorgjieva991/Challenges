import RestaurantCard from "./RestaurantCard";
import { Restaurant } from "../Store";
import { useNavigate } from "react-router-dom";

interface PopularRestaurantsProps {
  restaurants: Restaurant[];
  toggleFavorite: (id: string) => void;
}

const PopularRestaurants: React.FC<PopularRestaurantsProps> = ({
  restaurants,
  toggleFavorite,
}) => {
  const navigate = useNavigate();

  const sortedRestaurants = [...restaurants].sort((a, b) => {
    if (b.reviews !== a.reviews) {
      return b.reviews - a.reviews;
    }
    return b.rating - a.rating;
  });

  const topRestaurants = sortedRestaurants.slice(0, 10);

  const onNavigate = (id: string) => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <div>
      <h2>Our Most Popular Restaurants</h2>
      <div className="cards-container">
        {topRestaurants.map((restaurant) => (
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
        ))}
      </div>
    </div>
  );
};

export default PopularRestaurants;
