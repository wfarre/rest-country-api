import React, { useContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import Country from "./pages/Country";
import App from "./pages/App";
import { Routes, Route } from "react-router-dom";
import { themeContext } from "./utils/context/context";

const Router = () => {
  const { theme, toggleTheme } = useContext(themeContext);
  return (
    <div className={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/country/:name" element={<Country />} />
      </Routes>
    </div>
  );
};

export default Router;
