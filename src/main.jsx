import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Global CSS
import "slick-carousel/slick/slick.css"; // Slick Carousel CSS
import "slick-carousel/slick/slick-theme.css"; // Slick Carousel Theme CSS

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
