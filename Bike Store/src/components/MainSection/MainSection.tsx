import React from "react";
import styles from "./MainSection.module.css";
import Filters from "../Filters/Filters";
import BikesContainer from "../BikesContainer/BikesContainer";
import { Bike } from "../../types/Bike";

interface MainSectionProps {
  bikes: Bike[];
  filteredBikes: Bike[];
  setFilteredBikes: React.Dispatch<React.SetStateAction<Bike[]>>;
}

const MainSection: React.FC<MainSectionProps> = ({
  bikes,
  filteredBikes,
  setFilteredBikes,
}) => {
  return (
    <>
      <div className={styles.heading}>
        <hr />
        <h1>Bikes</h1>
      </div>
      <div className={styles.mainSection}>
        <Filters bikes={bikes} onFilterChange={setFilteredBikes} />
        <BikesContainer filteredBikes={filteredBikes} />
      </div>
    </>
  );
};

export default MainSection;
