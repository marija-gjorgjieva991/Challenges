import React from "react";
import "./App.css";
import Banner from "./components/Banner";
import DetailsBlock from "./components/DetailsBlock";

const App: React.FC = () => {
  return (
    <div className="App">
      <Banner />
      <DetailsBlock />
    </div>
  );
};

export default App;
