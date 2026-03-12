import "@/assets/css/App2.css";
import "@/assets/css/App.css";
import heart from "@/assets/images/img_icons/wishlist.png";
import viewIcon from "@/assets/images/img_icons/visibility.png";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  newArrivedProducts,
  bestSellingProducts,
  onSaleProducts,
} from "../../data/products";

/* ********************Buttons Function******************** */
/* ********************Buttons Function******************** */
function ProductButtons() {
  const { id } = useParams();
  const allProducts = [
    ...newArrivedProducts,
    ...bestSellingProducts,
    ...onSaleProducts,
  ];
  const space = "    ";
  const product = allProducts.find((product) => product.id === parseFloat(id));
  const [quantity, setQuantity] = useState(1);
  const checkRef = useRef(null);

  /* ********************Quantity Functions******************** */
  /* ********************Quantity Functions******************** */
  function handleIncrement() {
    setQuantity((prev) => prev + 1);
  }

  function handleDecrement() {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  }
  /* ************************************************ */

  /* ********************Add-to-Wishlist Functions******************** */
  /* ********************Add-to-Wishlist Functions******************** */
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

  {
    /* ********************THE DOM******************** */
    /* ********************THE DOM******************** */
  }

  return (
    <>
      <div className="w-100 mt-3 d-flex gap-3  mb-3 Buttons">
        {/* ************Quantity************ */}

        {/* <div className="h-100" style={{ width: "20%" }}> */}
        <div
          className="input-group  quantity-buttons  "
          style={{ width: "20%", height: "38px" }}
        >
          <button className="btn border p-0" onClick={handleDecrement}>
            -
          </button>
          <input
            className="form-control text-center border p-0"
            value={quantity}
            type="number"
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setQuantity(val);
            }}
          />
          <button className="btn border p-0" onClick={handleIncrement}>
            +
          </button>
        </div>
        {/* </div> */}
        <div className="d-flex gap-3 purchase-btn" style={{ width: "80%" }}>
          {/* ************Add to cart btn************ */}
          <button
            className="btn atc-btn "
            style={{ width: "50%", borderColor: "#b8860b", color: "#b8860b" }}
          >
            ADD TO CART
          </button>

          {/* ************Add to cart btn************ */}
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
          <div className=" me-1 rounded-circle cool-icon d-flex justify-content-center align-items-center position-relative cart-box">
            <img src={heart} style={{ width: "79%", height: "79%" }} />
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
        <p className="d-flex align-items-center gap-1 pt-2">
          <img className=" me-1 rounded-circle cool-icon " src={viewIcon} />{" "}
          <strong>{product.id}</strong> {space}
          <span className="ps-1" style={{ color: "#72716e" }}>
            {product.id > 1
              ? "customers are currently viewing this product"
              : "customer is currently viewing this product"}
          </span>
        </p>
      </div>
    </>
  );
}

export default ProductButtons;
