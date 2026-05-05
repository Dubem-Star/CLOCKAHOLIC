import "./assets/css/App.css";
import "./assets/css/App2.css";
import Home from "@/CLOCKAHOLIC/Home.jsx";
import ProductDetails from "@/CLOCKAHOLIC/ProductDetails.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./CLOCKAHOLIC/Cart";
import { useState, useEffect } from "react";
import {
  newArrivedProducts,
  bestSellingProducts,
  onSaleProducts,
} from "@/data/products";

function App() {
  const allProducts = [
    ...newArrivedProducts,
    ...bestSellingProducts,
    ...onSaleProducts,
  ];

  function reloadCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }
  const [popup, activatePopup] = useState(false);
  const [cart, setCart] = useState(reloadCart());
  const [id, setId] = useState(0);
  const [navProduct, setNavProduct] = useState(null);

  const loadCart = reloadCart();

  {
    /* *********************ADD-TO-CART FROM DETAILS PAGE********************* */
    /* *********************ADD-TO-CART FROM DETAILS PAGE********************* */
  }
  function atcDetailsPage() {
    activatePopup(true);
    const product = allProducts.find(
      (product) => product.id === parseFloat(id),
    );

    const loadCart = reloadCart();
    const existing = loadCart.find((item) => item.id === parseFloat(id));
    if (existing) {
      existing.quantity += 1;
      setCart([...loadCart]);
    } else {
      loadCart.push({ ...product, quantity: 1 });
      setCart([...loadCart]);
    }

    localStorage.setItem("cart", JSON.stringify(loadCart));
  }

  {
    /* *********************ADD-TO-CART FROM HOME PAGE********************* */
    /* *********************ADD-TO-CART FROM HOME PAGE********************* */
  }
  function atcHomePage(product) {
    activatePopup(true);
    const loadCart = reloadCart();
    const existing = loadCart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
      setCart([...loadCart]);
    } else {
      loadCart.push({ ...product, quantity: 1 });
      setCart([...loadCart]);
    }
    localStorage.setItem("cart", JSON.stringify(loadCart));
  }

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

      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                cart={cart}
                activatePopup={activatePopup}
                popup={popup}
                setAppCart={setCart}
                setNavProduct={setNavProduct}
                atcHomePage={atcHomePage}
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
                setId={setId}
                atcDetailsPage={atcDetailsPage}
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
