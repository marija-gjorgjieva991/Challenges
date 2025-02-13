import React from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Card, CardActionArea, IconButton } from "@mui/material";
import CardContent from "./CardContent";

interface RestaurantCardProps {
  id: string;
  name: string;
  restaurantType: string;
  rating: number;
  reviews: number;
  image: string;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onNavigate: (id: string) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  restaurantType,
  rating,
  reviews,
  image,
  isFavorite,
  onToggleFavorite,
  onNavigate,
}) => {
  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(id);
  };

  return (
    <Card
      sx={{
        position: "relative",
        cursor: "pointer",
        height: "100%",
        backgroundColor: "rgb(247, 245, 245)",
      }}
    >
      <CardActionArea onClick={() => onNavigate(id)}>
        <CardContent
          id={id}
          name={name}
          restaurantType={restaurantType}
          rating={rating}
          reviews={reviews}
          image={image}
        />
      </CardActionArea>
      <IconButton
        sx={{
          position: "absolute",
          top: 8,
          left: 8,
          backgroundColor: "white",
          borderRadius: "50%",
          padding: 1,
        }}
        onClick={handleHeartClick}
      >
        {isFavorite ? (
          <Favorite style={{ color: "#FF6247" }} fontSize="large" />
        ) : (
          <FavoriteBorder style={{ color: "#FF6247" }} fontSize="large" />
        )}
      </IconButton>
    </Card>
  );
};

export default RestaurantCard;
