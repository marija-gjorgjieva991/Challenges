import React from "react";
import { Link } from "react-router-dom";

interface CardContentProps {
  id: string;
  rating: number;
  reviews: number;
  image: string;
  name?: string;
  restaurantType?: string;
  phone?: string;
  email?: string;
  address?: string;
  parkinglot?: boolean;
}

const CardContent: React.FC<CardContentProps> = ({
  id,
  name,
  restaurantType,
  image,
  rating,
  reviews,
  phone,
  email,
  address,
  parkinglot,
}) => {
  return (
    <div className="card-content">
      <img src={image} alt={name} className="card-image" />
      <Link to={`/restaurant/${id}`} style={{ textDecoration: "none" }}>
        <div className="box">
          <h3>{name}</h3>
          <h3 className="type">{restaurantType}</h3>
          <div className="box-p">
            {rating !== null && rating !== undefined && rating > 0 && (
              <p>rating - {rating}</p>
            )}
            {reviews > 0 && <p>based on {reviews} reviews</p>}
          </div>
          <div className="box-details">
            <p>{phone}</p>
            <p>{email}</p>
            <p>{address}</p>
            {parkinglot && <p>We have a parkinglot and waiting for you</p>}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardContent;
