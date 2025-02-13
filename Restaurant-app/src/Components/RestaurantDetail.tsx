import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CardContent from "./CardContent";
import axios from "axios";
import { RestaurantDetailInterface, Review, useStore } from "../Store";

const calculateAverageRating = (reviewsList: Review[]): number => {
  if (reviewsList.length === 0) return 0;
  const totalRating = reviewsList.reduce(
    (sum, review) => sum + review.stars,
    0
  );
  return totalRating / reviewsList.length;
};

const RestaurantDetail = () => {
  const { id } = useParams();
  const { restaurants, setRestaurants } = useStore();
  const [restaurant, setRestaurant] =
    useState<RestaurantDetailInterface | null>(null);
  const [newReview, setNewReview] = useState<Review>({
    author: "",
    stars: 0,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [loadingRestaurant, setLoadingRestaurant] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const foundRestaurant = restaurants.find(
        (restaurant) => restaurant.id === id
      );
      if (foundRestaurant) {
        setRestaurant(foundRestaurant);
      } else {
        setError("Restaurant not found.");
      }
      setLoadingRestaurant(false);
    }
  }, [id, restaurants]);

  const handleReviewSubmit = async () => {
    if (!newReview.author || !newReview.message || newReview.stars < 1) {
      alert("Please fill in all fields.");
      return;
    }

    if (!restaurant) {
      alert("Restaurant not found.");
      return;
    }

    setLoading(true);

    try {
      const updatedRestaurant: RestaurantDetailInterface = {
        ...restaurant,
        reviewsList: [
          ...restaurant.reviewsList,
          {
            author: newReview.author,
            message: newReview.message,
            stars: newReview.stars,
          },
        ],
        rating: calculateAverageRating([
          ...restaurant.reviewsList,
          {
            author: newReview.author,
            message: newReview.message,
            stars: newReview.stars,
          },
        ]),
      };

      const response = await axios.put(
        `http://localhost:5001/restaurants/${restaurant.id}`,
        updatedRestaurant
      );
      console.log("Response from PUT request:", response);

      setRestaurants(
        restaurants.map((rest) =>
          rest.id === restaurant.id ? updatedRestaurant : rest
        )
      );

      setNewReview({ author: "", stars: 1, message: "" });
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingRestaurant) {
    return <div>Loading restaurant details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  return (
    <div>
      <div className="restaurant-detail">
        <h2>{restaurant.businessname}</h2>
        <CardContent
          id={restaurant.id}
          rating={restaurant.rating}
          reviews={restaurant.reviews}
          image={restaurant.image}
          phone={restaurant.phone}
          email={restaurant.email}
          address={restaurant.address}
          parkinglot={restaurant.parkinglot}
        />
      </div>

      <div>
        <h2>Reviews</h2>
        {restaurant.reviewsList.length > 0 ? (
          restaurant.reviewsList.map((review, index) => (
            <div key={index} className="review">
              <p>
                <b>Author:</b> {review.author}
              </p>
              <p>
                <b>Message:</b> {review.message}
              </p>
              <p>
                <b>Stars:</b> {review.stars}
              </p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      <div className="review-form">
        <h2>Review Form</h2>
        <label htmlFor="user">Name</label>
        <textarea
          name="user"
          value={newReview.author}
          onChange={(e) =>
            setNewReview({ ...newReview, author: e.target.value })
          }
          disabled={loading}
        />

        <label htmlFor="comment">Comment</label>
        <textarea
          name="comment"
          value={newReview.message}
          onChange={(e) =>
            setNewReview({ ...newReview, message: e.target.value })
          }
          disabled={loading}
        />

        <label htmlFor="rating">Stars</label>
        <input
          type="range"
          name="rating"
          value={newReview.stars}
          onChange={(e) =>
            setNewReview({ ...newReview, stars: parseInt(e.target.value) })
          }
          min="1"
          max="5"
          disabled={loading}
        />

        <button
          className="btn-surprise"
          onClick={handleReviewSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Leave a review"}
        </button>
      </div>
    </div>
  );
};

export default RestaurantDetail;
