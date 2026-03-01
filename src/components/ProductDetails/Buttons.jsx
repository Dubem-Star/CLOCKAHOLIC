import "@/assets/css/App2.css";
import "@/assets/css/App.css";
import { useState, useEffect } from "react";

function ProductButtons() {
  const [quantity, setQuantity] = useState(1);

  function handleIncrement() {
    setQuantity((prev) => prev + 1);
  }

  function handleDecrement() {
    if (quantity > 1) setQuantity((prev) => prev - 1);
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
          <button class="btn banner-button " style={{ width: "50%" }}>
            BUY IT NOW
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductButtons;
