import React from "react";
import { Bike } from "../../types/Bike";
import styles from "./Card.module.css";

interface CardProps {
  bike: Bike;
}

const Card: React.FC<CardProps> = ({ bike }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardBody}>
        <img
          src={`../../public/starter/img/${bike.image}.png`}
          alt={bike.name}
          className={styles.bikeImage}
        />
        <div className={styles.bikeDetails}>
          <h4 className={styles.bikeName}>{bike.name}</h4>
          <p className={styles.bikePrice}>{bike.price.toFixed()} $</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
