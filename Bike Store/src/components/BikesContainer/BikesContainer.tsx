import React from "react";
import styles from "./BikesContainer.module.css";
import Card from "../Card/Card";
import { Bike } from "../../types/Bike";

interface BikesContainerProps {
  filteredBikes: Bike[];
}

const BikesContainer: React.FC<BikesContainerProps> = ({ filteredBikes }) => {
  return (
    <div className={styles.bikesContainer}>
      {filteredBikes.map((bike, idx) => (
        <Card key={idx} bike={bike} />
      ))}
    </div>
  );
};

export default BikesContainer;
