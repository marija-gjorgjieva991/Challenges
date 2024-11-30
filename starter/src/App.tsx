import React from "react";
import "./App.css";
import Banner from "./components/Banner";
import DetailsBlock from "./components/DetailsBlock";
import PlacesContainer from "./components/PlacesContainer";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <div className="App">
      <Banner />
      <DetailsBlock
        title="Stories of Adventure"
        image="./public/1018-3914x2935.jpg"
      />
      <PlacesContainer />
      <DetailsBlock
        title="Popular Adventures"
        image="./public/1051-4928x3264.jpg"
      />
      <Footer />
    </div>
  );
};

export default App;
