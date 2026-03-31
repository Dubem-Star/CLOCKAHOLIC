import heart from "@/assets/images/img_icons/wishlist.png";
import viewIcon from "@/assets/images/img_icons/visibility.png";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  newArrivedProducts,
  bestSellingProducts,
  onSaleProducts,
} from "../../data/products";
import CartPopup from "../Cart/CartPopUp";
import QuantityPill from "../plugins/QuantityPill";

/* ********************Buttons Function******************** */
/* ********************Buttons Function******************** */
function ProductButtons(prop) {
  const { id } = useParams();
  const allProducts = [
    ...newArrivedProducts,
    ...bestSellingProducts,
    ...onSaleProducts,
  ];
  const space = "    ";
  const product = allProducts.find((product) => product.id === parseFloat(id));

  const checkRef = useRef(null);

  /* ********************Add-to-Wishlist Function******************** */
  /* ********************Add-to-Wishlist Function******************** */
  function showCheck(e) {
    e.currentTarget.querySelector(".check").classList.add("show-check");
    e.currentTarget.querySelector(".text").classList.add("sauce");

    const text = e.currentTarget.querySelector(".text");
    text.innerHTML = "Added to Wishlist!";
    setTimeout(() => {
      text.innerHTML = "Browse Wishlists";
    }, 2000);
  }
  /* ************************************************ */

  /* ********************Add-to-Cart Function******************** */
  /* ********************Add-to-Cart Function******************** */

  function reloadCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  const [popup, activatePopup] = useState(false);
  const [cart, setCart] = useState([]);

  function addToCart() {
    activatePopup(true);
    const loadCart = reloadCart();

    const existing = loadCart.find(
      (item) => item.id === parseFloat(product.id),
    );
    if (existing) {
      existing.quantity += 1;
      setCart([...loadCart]);
    } else {
      loadCart.push({ ...product, quantity: 1 });
    }

    setCart(loadCart);
    prop.setAppCart([...loadCart]);
    localStorage.setItem("cart", JSON.stringify(loadCart));
  }

  /* ************************************************ */

  {
    /* ********************THE DOM******************** */
    /* ********************THE DOM******************** */
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
      <CartPopup
        popup={popup}
        toggle={activatePopup}
        cart={cart}
        setAppCart={prop.setAppCart}
        appCart={prop.cart}
      />

      <div className="w-100 mt-3 d-flex gap-3  mb-3 Buttons">
        {/* *********************Quantity********************* */}
        {/* *********************Quantity********************* */}

        <QuantityPill isCart={false} setCart={setCart} />

        <div className="d-flex gap-3 purchase-btn" style={{ width: "80%" }}>
          {/* *********************Add to cart btn********************* */}
          {/* *********************Add to cart btn********************* */}
          <button
            className="btn second-btn "
            style={{ width: "50%" }}
            onClick={addToCart}
          >
            ADD TO CART
          </button>

          {/* *********************Buy it now btn********************* */}
          {/* *********************Buy it now btn********************* */}
          <button className="btn banner-button " style={{ width: "50%" }}>
            BUY IT NOW
          </button>
        </div>
      </div>

      <div className="d-flex flex-column gap-1 align-items-start mt-1">
        {/* ************Add to Wishlist btn************ */}
        <div
          className="d-flex align-items-center justify-content-center gap-1 pt-1 m-0 add-to-wishlist-box"
          style={{ cursor: "pointer" }}
          onClick={showCheck}
        >
          <div className=" me-1 rounded-circle cool-icon  d-flex justify-content-center align-items-center position-relative cart-box">
            <img
              src={heart}
              style={{ width: "79%", height: "79%", display: "block" }}
            />
            <span
              className=" position-absolute text-light d-none align-items-center justify-content-center rounded-circle check"
              style={{ top: "-6px" }}
              ref={checkRef}
            >
              ✓
            </span>
          </div>
          <span
            className=" text"
            style={{ color: "#72716e", transition: "color 0.1s ease-in-out" }}
          >
            Add to WishList
          </span>
        </div>

        {/* ************Product Views************ */}
        <p className="d-flex align-items-start gap-1 pt-2 product-views">
          <img className=" me-1 rounded-circle cool-icon " src={viewIcon} />{" "}
          <span className="ps-1" style={{ color: "#72716e" }}>
            <strong className="text-black me-1">{product.id}</strong>
            {space}
            {product.id > 1
              ? `customers are currently viewing this product`
              : `customer is currently viewing this product`}
          </span>
        </p>
      </div>
    </>
  );
}

export default ProductButtons;
