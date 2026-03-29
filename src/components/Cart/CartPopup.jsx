import close from "@/assets/images/img_icons/close.png";
import { useState, useEffect, Fragment } from "react";
import QuantityPill from "../plugins/QuantityPill";

function CartPopup(props) {
  const [cart, setCart] = useState(props.cart);
  useEffect(() => {
    setCart(props.cart);
  }, [props.cart]);
  /* ********************Remove Item Logic******************** */
  /* ********************Remove Item Logic******************** */
  function removeItem(e) {
    const newCart = cart.filter((item) => item.id != e.target.dataset.id);

    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  }

  return (
    <>
      <div
        className={`w-25  bg-light position-fixed cart-popup d-flex flex-column gap-3 rounded-3   ${props.popup ? `slide-in` : ``}`}
        style={{
          top: "10px",

          bottom: "10px",
          zIndex: "3000",
        }}
      >
        <div className="d-flex ps-3 pe-3 pt-3 gap-2 mt-1 align-items-center">
          <span
            className=" d-inline-flex text-light p-2  align-items-center justify-content-center rounded-circle check"
            style={{
              backgroundColor: "#b8860b",
              width: "12px",
              height: "12px",
              fontSize: "12px",
            }}
          >
            ✓
          </span>{" "}
          <span className="text-dark fw-6 "> ITEM ADDED TO YOUR CART</span>
        </div>

        <img
          className="position-absolute copy-button  p-1 "
          src={close}
          style={{
            top: "20px",
            right: "20px",
            width: "20px",
            height: "20px",
          }}
          onClick={() => props.toggle(false)}
        />
        <hr className="m-0" />
        {/* ************************************************** */}

        <div className="d-flex flex-column gap-2 ps-2 pe-2 mt-4 ">
          {cart.map((item, index) => {
            return (
              <Fragment key={item.id}>
                <div className="d-flex w-100 mt-2">
                  <img
                    src={item.images[0]}
                    style={{ width: "60px", height: "60px" }}
                  />

                  <div className="d-flex flex-column ps-2 pe-2 gap-2">
                    <p className="d-inline m-0" style={{ fontSize: "14px" }}>
                      {item.version}
                    </p>

                    <QuantityPill
                      isCart={true}
                      cart={cart}
                      item={item}
                      cartQuantity={item.quantity}
                      setCart={setCart}
                    />

                    <p className="mb-1 mt-1">
                      <span style={{ color: "#72716e", fontSize: "13px" }}>
                        {item.quantity}x
                      </span>{" "}
                      <span style={{ color: "#b8860b" }}>
                        ₦{item.price.toLocaleString()}
                      </span>
                    </p>
                  </div>

                  <span
                    className="me-1 text-danger text-center copy-button ms-auto"
                    onClick={removeItem}
                    data-id={item.id}
                  >
                    x
                  </span>
                </div>
                <hr className="m-0" />
              </Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default CartPopup;
