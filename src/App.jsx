import "./assets/css/App.css";
import "./assets/css/App2.css";
import Home from "@/CLOCKAHOLIC/Home.jsx";
import ProductDetails from "@/CLOCKAHOLIC/ProductDetails.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./CLOCKAHOLIC/Cart";
import { useState } from "react";

function App() {
  function reloadCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  const [cart, setCart] = useState(reloadCart());

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home cart={cart} />} />
          <Route
            path="/product/:id"
            element={<ProductDetails setAppCart={setCart} cart={cart} />}
          />
          <Route
            path="/cart"
            element={<Cart setAppCart={setCart} cart={cart} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
