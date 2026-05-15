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
  const [darken, setDarken] = useState(false);
  const [cart, setCart] = useState(reloadCart());
  const [id, setId] = useState(0);
  const [prodQty, setProdQty] = useState(1);
  const loadCart = reloadCart();
  const [searchResults, setSearchResults] = useState([]);
  const [value, setValue] = useState(0);
  const [isSearchMode, setIsSearchMode] = useState(false);
  //  const [mounted, setMounted] = useState(false);

  {
    /* *********************HANDLE SUBMIT FUNCTION********************* */
    /* *********************HANDLE SUBMIT FUNCTION********************* */
  }
  function handleSubmit(e) {
    e.preventDefault();
    const search = e.target.firstElementChild.value;
    alert(search);
  }

  {
    /* *********************HANDLE SEARCH FUNCTION********************* */
    /* *********************HANDLE SEARCH FUNCTION********************* */
  }
  function handleSearch(e) {
    const text = e.target.value.trim().toLowerCase();

    const foundSearch = allProducts
      .filter(
        (item) =>
          item.brandName.toLowerCase().includes(text) ||
          item.version.toLowerCase().includes(text),
      )
      .slice(0, 7);

    if (!text) {
      foundSearch.length = [];
    }
    setValue(text);

    setSearchResults(foundSearch);
  }

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
    const existing = loadCart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity = existing.quantity + prodQty;
      setCart([...loadCart]);
    } else {
      loadCart.push({ ...product, quantity: prodQty });
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
        className={`darken-bg position-fixed opacity-0 invisible ${popup || darken ? "show" : ""}`}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5) ",
          transition: "opacity 0.3s ease-in-out",
          zIndex: "2500",
          inset: "0",
          overflow: "hidden",
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
                atcHomePage={atcHomePage}
                setDarken={setDarken}
                darken={darken}
                handleSearch={handleSearch}
                handleSubmit={handleSubmit}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                value={value}
                setValue={setValue}
                isSearchMode={isSearchMode}
                setIsSearchMode={setIsSearchMode}
                // mounted={mounted}
                // setMounted={setMounted}
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
                setDarken={setDarken}
                darken={darken}
                atcHomePage={atcHomePage}
                setProdQty={setProdQty}
                handleSearch={handleSearch}
                handleSubmit={handleSubmit}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                value={value}
                setValue={setValue}
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
                setDarken={setDarken}
                darken={darken}
                handleSearch={handleSearch}
                handleSubmit={handleSubmit}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                value={value}
                setValue={setValue}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
