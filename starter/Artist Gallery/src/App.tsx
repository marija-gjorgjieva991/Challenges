import React from "react";
import { useRoutes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import routes from "./router";
import "./App.css";

const App: React.FC = () => {
  const element = useRoutes(routes);

  return (
    <>
      <Navbar />
      {element}
    </>
  );
};

export default App;
