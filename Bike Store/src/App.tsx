import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Bike } from "./types/Bike";
import "./App.css";
import MainSection from "./components/MainSection/MainSection";

const App: React.FC = () => {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [filteredBikes, setFilteredBikes] = useState<Bike[]>([]);

  useEffect(() => {
    fetch("https://challenges.brainster.tech/ajax_data/data.json")
      .then((response) => response.json())
      .then((data) => {
        if (data.products) {
          setBikes(data.products);
          setFilteredBikes(data.products);
        }
      })
      .catch((error) => console.error("Error fetching bike data:", error));
  }, []);

  return (
    <div className="bodyContainer">
      <Header />
      <MainSection
        bikes={bikes}
        filteredBikes={filteredBikes}
        setFilteredBikes={setFilteredBikes}
      />
      <Footer />
    </div>
  );
};

export default App;
