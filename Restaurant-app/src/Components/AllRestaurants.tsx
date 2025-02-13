import { useState, useEffect } from "react";
import axios from "axios";
import { Restaurant, useStore } from "../Store";
import RestaurantCard from "./RestaurantCard";
import Cuisines from "./Cuisines";
import SurpriseRestaurant from "./SurpriseRestaurant";
import PopularRestaurants from "./PopularRestaurants";
import { useNavigate } from "react-router-dom";

const AllRestaurants = () => {
  const { restaurants, setRestaurants, favorites } = useStore();
  const toggleFavorite = useStore((state) => state.toggleFavorite);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    []
  );

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<Restaurant[]>("http://localhost:5001/restaurants")
      .then((response) => {
        const updatedRestaurants = response.data.map((restaurant) => {
          const isFavorite = favorites.includes(restaurant.id);
          const averageRating = restaurant.reviewsList.length
            ? restaurant.reviewsList.reduce(
                (sum, review) => sum + review.stars,
                0
              ) / restaurant.reviewsList.length
            : 0;

          const reviewsCount = restaurant.reviewsList.length;

          return {
            ...restaurant,
            rating: averageRating,
            reviews: reviewsCount,
            isFavorite,
          };
        });

        setRestaurants(updatedRestaurants);
        setFilteredRestaurants(updatedRestaurants);
      })
      .catch((error) => {
        console.error("Error fetching restaurant data:", error);
      });
  }, [setRestaurants, favorites]);

  const mostPopularRestaurants = restaurants
    .slice()
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 10);

  const onNavigate = (id: string) => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <>
      <SurpriseRestaurant />
      <div>
        <PopularRestaurants
          restaurants={mostPopularRestaurants}
          toggleFavorite={toggleFavorite}
        />
        <Cuisines restaurants={restaurants} />

        <h2>All Restaurants</h2>
        <div className="cards-container">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <div key={restaurant.id}>
                <RestaurantCard
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
              </div>
            ))
          ) : (
            <p>No restaurants available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AllRestaurants;
