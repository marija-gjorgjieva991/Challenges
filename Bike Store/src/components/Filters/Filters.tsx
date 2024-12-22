import React, { useState } from "react";
import { Bike } from "../../types/Bike";
import styles from "./Filters.module.css";

interface FiltersProps {
  bikes: Bike[];
  onFilterChange: (filteredBikes: Bike[]) => void;
}

const Filters: React.FC<FiltersProps> = ({ bikes, onFilterChange }) => {
  const [selectedGender, setSelectedGender] = useState<
    "ALL" | "MALE" | "FEMALE" | null
  >("ALL");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const getBikeCountByBrand = (brand: string) => {
    return bikes.filter(
      (bike) => bike.brand.toUpperCase() === brand.toUpperCase()
    ).length;
  };

  const getBikeCountByGender = (gender: "ALL" | "MALE" | "FEMALE") => {
    return bikes.filter((bike) =>
      gender === "ALL" ? true : bike.gender === gender
    ).length;
  };

  const handleGenderFilter = (gender: "ALL" | "MALE" | "FEMALE") => {
    setSelectedGender(gender);
    setSelectedBrand(null);
    filterBikes(gender, null);
  };

  const handleBrandFilter = (brand: string) => {
    setSelectedBrand(brand);
    setSelectedGender(null);
    filterBikes(null, brand);
  };

  const filterBikes = (
    gender: "ALL" | "MALE" | "FEMALE" | null,
    brand: string | null
  ) => {
    let filteredBikes = bikes;

    if (gender && gender !== "ALL") {
      filteredBikes = filteredBikes.filter((bike) => bike.gender === gender);
    }

    if (brand) {
      filteredBikes = filteredBikes.filter(
        (bike) => bike.brand.toUpperCase() === brand.toUpperCase()
      );
    }

    onFilterChange(filteredBikes);
  };

  return (
    <div className={styles.filtersContainer}>
      <h3>Filter by:</h3>
      <p
        className={`${styles.showAll} ${
          selectedGender === "ALL" && selectedBrand === null
            ? styles.active
            : ""
        }`}
        onClick={() => handleGenderFilter("ALL")}
      >
        Show all
        <span className={styles.filterCount}>
          {getBikeCountByGender("ALL")}
        </span>
      </p>
      <hr />
      <h4>Gender</h4>
      <p
        className={`${styles.male} ${
          selectedGender === "MALE" ? styles.active : ""
        }`}
        onClick={() => handleGenderFilter("MALE")}
      >
        Male
        <span className={styles.filterCount}>
          {getBikeCountByGender("MALE")}
        </span>
      </p>
      <p
        className={`${styles.female} ${
          selectedGender === "FEMALE" ? styles.active : ""
        }`}
        onClick={() => handleGenderFilter("FEMALE")}
      >
        Female
        <span className={styles.filterCount}>
          {getBikeCountByGender("FEMALE")}
        </span>
      </p>
      <hr />
      <h4>Brand</h4>
      <ul className={styles.brandList}>
        {[
          "LE GRAND BIKES",
          "KROSS",
          "EXPLORER",
          "VISITOR",
          "PONY",
          "FORCE",
          "E-BIKES",
          "IDEAL",
        ].map((brand) => (
          <li
            key={brand}
            className={`${selectedBrand === brand ? styles.active : ""}`}
            onClick={() => handleBrandFilter(brand)}
          >
            {brand}
            <span className={styles.brandCount}>
              {getBikeCountByBrand(brand)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filters;
