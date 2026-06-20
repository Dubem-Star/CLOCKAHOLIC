import "./assets/css/App.css";
import "./assets/css/App2.css";
import Home from "@/CLOCKAHOLIC/Home.jsx";
import ProductDetails from "@/CLOCKAHOLIC/ProductDetails.jsx";
import Cart from "./CLOCKAHOLIC/Cart";
import Checkout from "./CLOCKAHOLIC/Checkout";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import {} from "react-router-dom";
import { useState, useEffect } from "react";
import {
  lagos,
  southEast,
  southWest,
  southSouth,
  farNorth,
  northCentral,
} from "./data/ShippingLocation";
import CartPopup from "./components/Cart/CartPopup";

function App() {
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
  const [searchTerm, setsearchTerm] = useState("");
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isResult, setIsResult] = useState(true);
  const [newlyArrived, setNewlyArrived] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const [onSale, setOnSale] = useState([]);
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState(null);
  const [shippingFee, setShippingFee] = useState(null);
  const [bin, setBin] = useState(null);
  const navigate = useNavigate();
  const allStates = [
    ...lagos,
    ...southEast,
    ...southSouth,
    ...southWest,
    ...farNorth,
    ...northCentral,
  ];

  {
    /* *********************FETCH PRODUCTS FROM DATABASE********************* */
    /* *********************FETCH PRODUCTS FROM DATABASE********************* */
  }

  useEffect(() => {
    async function getProducts() {
      const response = await fetch(
        `https://clockaholic-store.vercel.app/api/get_products`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: "Get me all the products" }),
        },
      );
      const data = await response.json();
      if (data.status) {
        setProducts(data.data);
        setNewlyArrived(data.data.slice(0, 8));
        setBestSelling(data.data.slice(8, 15));
        setOnSale(data.data.slice(15));
      } else {
        console.log(`Error, failed fetching products: ${data.message}`);
      }
    }

    getProducts();
  }, []);

  {
    /* *********************HANDLE SEARCH FUNCTION********************* */
    /* *********************HANDLE SEARCH FUNCTION********************* */
  }

  async function handleSearch(e) {
    const text = e.target.value.trim();
    setValue(text);

    const element = e.target.dataset.input;

    setIsSearchLoading(element);
    if (!text) {
      setIsSearchLoading(false);
      setSearchResults([]);
      setIsResult(true);
    }
  }

  useEffect(() => {
    const rejexGuard = /[a-zA-Z0-9]/;
    if (!value) return;

    if (!rejexGuard.test(value)) {
      setSearchResults([]);
      return;
    }

    const debounceTimer = setTimeout(async () => {
      if (!value) {
        setIsResult(true);
        return;
      }

      const response = await fetch(
        `https://clockaholic-store.vercel.app/api/search`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: value }),
        },
      );

      const results = await response.json();

      if (results.status) {
        setSearchResults(results.data);
        setIsResult(results.data.length);

        setIsSearchLoading(false);
        console.log("Products fetched from database");
      } else {
        console.log(results.message);
      }
    }, 600);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [value]);

  {
    /* *********************ADD-TO-CART FROM DETAILS PAGE********************* */
    /* *********************ADD-TO-CART FROM DETAILS PAGE********************* */
  }
  function atcDetailsPage() {
    if (!products.length) return console.log("empty");
    activatePopup(true);

    const product = products.find((product) => product.id == id);

    const loadCart = reloadCart();
    const existing = loadCart.find((item) => item.id == product.id);
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

  {
    /* *********************CALCULATE SHIPPING PRICE********************* */
    /* *********************CALCULATE SHIPPING PRICE********************* */
  }

  function shippingPrice(userRegion) {
    if (!userRegion) return 0;

    if (lagos.includes(userRegion)) return 2000;
    if (southWest.includes(userRegion)) return 4000;
    if (southSouth.includes(userRegion)) return 4000;
    if (southEast.includes(userRegion)) return 6000;
    if (northCentral.includes(userRegion)) return 8000;
    if (farNorth.includes(userRegion)) return 8000;
  }

  /* ********************SAVE ORDER FUNCTION******************** */
  /* ********************SAVE ORDER FUNCTION******************** */

  async function handleOrder(e, order, total) {
    const loader = e.currentTarget.querySelector(".spinner-border");
    const text = e.currentTarget.querySelector("span");

    text.style.opacity = "0";
    loader.style.opacity = "1";

    const response = await fetch(
      `https://clockaholic-store.vercel.app/api/handle_order`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: order,
          totalAmount: total,
        }),
      },
    );

    const res = await response.json();
    if (res.status) {
      console.log(res.data);
      setOrder(res.data);
      text.style.opacity = "1";
      loader.style.opacity = "0";
      navigate("/checkout");
    } else {
      alert(res.message);
    }
  }

  {
    /* *********************************************************************** */
    /* *********************************************************************** */
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

      <CartPopup
        popup={popup}
        toggle={activatePopup}
        cart={cart}
        setCart={setCart}
        handleOrder={handleOrder}
        bin={bin}
        setBin={setBin}
      />

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
              searchResults={searchResults}
              setSearchResults={setSearchResults}
              value={value}
              setValue={setValue}
              isSearchMode={isSearchMode}
              setIsSearchMode={setIsSearchMode}
              isSearchLoading={isSearchLoading}
              setIsSearchLoading={setIsSearchLoading}
              isResult={isResult}
              setIsResult={setIsResult}
              newlyArrived={newlyArrived}
              bestSelling={bestSelling}
              onSale={onSale}
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
              prodQty={prodQty}
              setProdQty={setProdQty}
              handleSearch={handleSearch}
              searchResults={searchResults}
              setSearchResults={setSearchResults}
              value={value}
              setValue={setValue}
              isSearchMode={isSearchMode}
              setIsSearchMode={setIsSearchMode}
              isSearchLoading={isSearchLoading}
              setIsSearchLoading={setIsSearchLoading}
              isResult={isResult}
              setIsResult={setIsResult}
              products={products}
              setProducts={setProducts}
              order={order}
              setOrder={setOrder}
              handleOrder={handleOrder}
              bin={bin}
              setBin={setBin}
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
              searchResults={searchResults}
              setSearchResults={setSearchResults}
              value={value}
              setValue={setValue}
              isSearchMode={isSearchMode}
              setIsSearchMode={setIsSearchMode}
              isSearchLoading={isSearchLoading}
              setIsSearchLoading={setIsSearchLoading}
              isResult={isResult}
              setIsResult={setIsResult}
              order={order}
              setOrder={setOrder}
              shippingFee={shippingFee}
              setShippingFee={setShippingFee}
              handleOrder={handleOrder}
              bin={bin}
              setBin={setBin}
              shippingPrice={shippingPrice}
              allStates={allStates}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <Checkout
              setAppCart={setCart}
              cart={cart}
              activatePopup={activatePopup}
              setDarken={setDarken}
              darken={darken}
              handleSearch={handleSearch}
              searchResults={searchResults}
              setSearchResults={setSearchResults}
              value={value}
              setValue={setValue}
              isSearchMode={isSearchMode}
              setIsSearchMode={setIsSearchMode}
              isSearchLoading={isSearchLoading}
              setIsSearchLoading={setIsSearchLoading}
              isResult={isResult}
              setIsResult={setIsResult}
              order={order}
              setOrder={setOrder}
              shippingPrice={shippingPrice}
              bin={bin}
              setBin={setBin}
              allStates={allStates}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
