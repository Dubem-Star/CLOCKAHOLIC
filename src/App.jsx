import "./assets/css/App.css";
import "./assets/css/App2.css";
import Home from "@/CLOCKAHOLIC/Home.jsx";
import ProductDetails from "@/CLOCKAHOLIC/ProductDetails.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./CLOCKAHOLIC/Cart";
import { useState, useEffect } from "react";

function App() {
  function reloadCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }
  const [popup, activatePopup] = useState(false);
  const [cart, setCart] = useState(reloadCart());

  return (
    <>
      <div
        className={`darken-bg position-fixed opacity-0 invisible ${popup ? "show" : ""}`}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5) ",
          transition: "opacity 0.3s ease-in-out",
          zIndex: "2500",
          inset: "0",
        }}
      ></div>

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                cart={cart}
                activatePopup={activatePopup}
                popup={popup}
                setAppCart={setCart}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetails
                setAppCart={setCart}
                cart={cart}
                activatePopup={activatePopup}
                popup={popup}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                setAppCart={setCart}
                cart={cart}
                activatePopup={activatePopup}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
