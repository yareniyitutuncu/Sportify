import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Global CSS
import "slick-carousel/slick/slick.css"; // Slick Carousel CSS
import "slick-carousel/slick/slick-theme.css"; // Slick Carousel Theme CSS
import { BrowserRouter } from 'react-router-dom'; // Router'ı buraya aldık

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
