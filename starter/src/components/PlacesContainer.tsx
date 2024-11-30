import { useEffect, useState } from "react";
import Place, { PlaceType } from "./Place";

const PlacesContainer = () => {
  const [places, setPlaces] = useState<PlaceType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5173/src/data/db.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPlaces(data.places);
      } catch (error) {
        ("Error fetching places data");
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="places-container">
        {places.map((place, index) => (
          <Place key={`place-${index}`} {...place} />
        ))}{" "}
      </div>
    </>
  );
};

export default PlacesContainer;
