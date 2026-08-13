import heart from "@/assets/images/img_icons/wishlist.png";
import viewIcon from "@/assets/images/img_icons/visibility.png";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  newArrivedProducts,
  bestSellingProducts,
  onSaleProducts,
} from "../../data/products";

import QuantityPill from "../plugins/QuantityPill";

/* ********************Buttons Function******************** */
/* ********************Buttons Function******************** */
function ProductButtons(prop) {
  const { id } = useParams();
  const space = "    ";
  const checkRef = useRef(null);
  const [color, setColor] = useState(
    prop.product.colors ? prop.product.colors[0].colorName : null,
  );

  console.log(prop.product);

  // console.log(prop.bin);

  useEffect(() => {
    prop.setId(id);
  }, [id]);

  useEffect(() => {
    prop.setColor(color);
  }, [color]);

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

  {
    /* ********************THE DOM******************** */
    /* ********************THE DOM******************** */
  }

  return (
    <>
      {/* *********************Color(s)********************* */}
      {/* *********************Color(s)********************* */}
      <div>
        {prop.product.colors ? (
          <>
            <p class="mb-2" style={{ fontSize: "14px" }}>
              <strong className="me-1">Color:</strong> {color}
            </p>
            <div className="d-flex flex-wrap gap-2">
              {prop.product.colors.map((c) => (
                <div
                  key={c.colorName}
                  onClick={(e) => {
                    prop.setImage(e.currentTarget.firstElementChild.src);
                    prop.setIsColorClicked(true);
                    if (window.innerWidth < 768) {
                      window.scrollTo(0, 0);
                    }
                    const previews = document.querySelectorAll(".img-preview ");
                    for (let prev of previews) {
                      prev.classList.remove("lay");
                    }

                    setColor(c.colorName);
                  }}
                  className=" rounded product-colors-preview"
                  style={{
                    width: "56px",
                    height: "56px",
                    padding: "3px",
                    cursor: "pointer",
                    border:
                      color === c.colorName
                        ? "2px solid #111010 "
                        : "1px solid #d5cdcd",

                    overflow: "hidden",
                  }}
                >
                  <img
                    src={c.colorImage}
                    alt={c.colorName}
                    className="w-100 h-100"
                    style={{ objectFit: "cover", borderRadius: "3px" }}
                  />
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>

      <div className="w-100 mt-3 d-flex gap-3  mb-3 Buttons">
        {/* *********************Quantity********************* */}
        {/* *********************Quantity********************* */}

        <QuantityPill
          isCart={false}
          setProdQty={prop.setProdQty}
          setAppCart={prop.setAppCart}
        />

        <div className="d-flex gap-3 purchase-btn" style={{ width: "80%" }}>
          {/* *********************Add to cart btn********************* */}
          {/* *********************Add to cart btn********************* */}
          <button
            className="btn second-btn "
            style={{ width: "50%" }}
            onClick={() => prop.atcDetailsPage()}
          >
            ADD TO CART
          </button>

          {/* *********************Buy it now btn********************* */}
          {/* *********************Buy it now btn********************* */}
          <button
            className="btn banner-button position-relative"
            style={{ width: "50%" }}
            onClick={(e) => {
              console.log(prop.product);
              const binDoc = {
                ...prop.product,
                quantity: prop.prodQty,
                bin: true,
              };
              const total = binDoc.price * binDoc.quantity;
              prop.setBin(binDoc);
              prop.handleOrder(e, binDoc, total);
            }}
          >
            <div
              className="spinner-border text-white position-absolute start-0 end-0 top-0 bottom-0 m-auto w-22px h-22px "
              role="status"
            ></div>
            <span>BUY IT NOW</span>
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
      </div>
    </>
  );
}

export default ProductButtons;
