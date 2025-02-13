import { Link } from "react-router-dom";
import { Restaurant } from "../Store";

interface CuisinesProps {
  restaurants: Restaurant[];
}

const Cuisines: React.FC<CuisinesProps> = ({ restaurants }) => {
  if (!restaurants || restaurants.length === 0) {
    return <p>Loading or no restaurants available.</p>;
  }

  const restaurantTypes = [
    ...new Set(
      restaurants
        .map((restaurant) => restaurant.restauranttype)
        .filter((type) => type)
    ),
  ];

  return (
    <div>
      <hr />
      <h2>Cuisines</h2>
      <div className="cuisines-buttons">
        {restaurantTypes.length > 0 ? (
          restaurantTypes.map((restaurantType, index) => (
            <Link to={`/cuisine/${restaurantType}`} key={index}>
              <button
                style={{
                  backgroundColor: "#FF6247",
                  color: "white",
                  padding: "10px 20px",
                  margin: "5px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {restaurantType || "Unknown Cuisine"}
              </button>
            </Link>
          ))
        ) : (
          <p>No restaurant types available</p>
        )}
      </div>
      <hr />
    </div>
  );
};

export default Cuisines;
