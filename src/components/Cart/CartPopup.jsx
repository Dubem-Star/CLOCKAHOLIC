import close from "@/assets/images/img_icons/close.png";
import emptyCart from "@/assets/images/img_icons/empty-cart.png";
import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import QuantityPill from "../plugins/QuantityPill";

function CartPopup(props) {
  const [cart, setCart] = useState(props.cart);
  useEffect(() => {
    setCart(props.cart);
  }, [props.cart]);

  const closeBtnStyle = {
    top: "20px",
    right: "20px",
    width: "20px",
    height: "20px",
  };

  /* ********************Remove Item Logic******************** */
  /* ********************Remove Item Logic******************** */
  function removeItem(e) {
    const newCart = cart.filter((item) => item.id != e.target.dataset.id);

    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
    props.setAppCart(newCart);
  }

  const totalAmount = props.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const totalQuantity = props.cart.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const space = "";

  return (
    <>
      <div
        className={`  bg-light position-fixed cart-popup d-flex flex-column  rounded-3   ${props.popup ? `slide-in` : ``}`}
      >
        <img
          className="position-absolute copy-button  p-1 "
          src={close}
          style={closeBtnStyle}
          onClick={() => props.toggle(false)}
        />

        {cart.length < 1 ? (
          <Fragment>
            <div
              className="d-flex flex-column align-items-center  gap-3"
              style={{ marginTop: "70px" }}
            >
              <img src={emptyCart} className="w-25" />
              <p className="m-0">No items in your cart</p>

              <Link to="/" className="text-reset">
                <button className="btn banner-button w-auto fw-light">
                  Keep Shopping
                </button>
              </Link>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            {/* ********************Popup Title******************** */
            /* ********************Popup Title******************** */}
            <div className="d-flex ps-3 pe-3 pt-3 gap-2 mt-1 align-items-center ">
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
              <span
                className="text-dark"
                style={{
                  fontSize: "clamp(13px, 1.5vw, 15px)",
                  whiteSpace: "pre-wrap",
                }}
              >
                {" "}
                {totalQuantity < 2
                  ? `${totalQuantity + space}  ITEM ADDED TO YOUR CART `
                  : `${totalQuantity + space}  ITEMS ADDED TO YOUR CART`}
              </span>
            </div>

            <hr className="mt-2" />
            {/* ************************************************** */}
            {/* ************************************************** */}

            {/* ********************Cart Items******************** */
            /* ********************Cart Items******************** */}
            <div className="d-flex flex-column gap-2 ps-2 pe-2 flex-grow-1  overflow-y-auto no-scrollbar">
              {cart.map((item, index) => {
                return (
                  <Fragment key={item.id}>
                    <div className="d-flex w-100 mt-2">
                      <img
                        src={item.images[0]}
                        style={{ width: "60px", height: "60px" }}
                      />

                      <div
                        className="d-flex flex-column ps-2  gap-2 flex-grow-1 "
                        style={{ paddingRight: "10px" }}
                      >
                        <p
                          className="d-inline m-0"
                          style={{ fontSize: "14px" }}
                        >
                          {item.version}
                        </p>
                        <QuantityPill
                          isCart={true}
                          cart={cart}
                          item={item}
                          cartQuantity={item.quantity}
                          setCart={setCart}
                          setAppCart={props.setAppCart}
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
            {/* ************************************************** */}
            {/* ************************************************** */}

            {/* ********************Subtotal Section******************** */
            /* ********************Subtotal Section******************** */}
            <hr
              className="mt-0 mb-3 ms-2 me-2"
              style={{ boxShadow: " 0 -3px 5px 2px rgba(0, 0, 0, 0.33)" }}
            />
            <div className="total-cart-box d-flex flex-column ps-3 pe-3">
              <div className="d-flex justify-content-between align-items-center ">
                <p>Subtotal:</p>{" "}
                <p style={{ color: "#b8860b", fontSize: "20px" }}>
                  ₦{totalAmount.toLocaleString()}{" "}
                </p>
              </div>

              <div className="d-flex flex-column w-100 gap-2 mb-3">
                <button className="btn second-btn w-100">VIEW CART</button>
                <button className="btn banner-button w-100">CHECKOUT</button>
              </div>
            </div>
            {/* ***           *********************************************** */}
            {/* ************************************************** */}
          </Fragment>
        )}
      </div>
    </>
  );
}

export default CartPopup;
