import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Country from "./pages/Country";
import ThemeProvider, { themeContext } from "./utils/context/context";

// const { theme, toggleTheme } = useContext(themeContext);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    {/* <div className="dark"> */}
    <ThemeProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/country/:name" element={<Country />} />
      </Routes>
    </ThemeProvider>

    {/* </div> */}
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
