import { useEffect, useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageLocation from "../plugins/btns/PageLocation";
import QuantityPill from "@/components/plugins/QuantityPill";
import emptyCart from "@/assets/images/img_icons/empty-cart.png";
import BackToTop from "@/components/plugins/btns/BackToTop";
import {
  lagos,
  southEast,
  southWest,
  southSouth,
  farNorth,
  northCentral,
} from "../../data/ShippingLocation";
function YourCart(prop) {
  /* ************************************************************ */
  const [userRegion, setUserRegion] = useState("Lagos");
  const [dropdown, setDropdown] = useState(false);
  const [isCountry, setIsCountry] = useState(false);
  const navigate = useNavigate();

  /* ********************URGENT USE-EFFECT******************** */
  /* ********************URGENT USE-EFFECT******************** */

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Your Cart | Clockaholic";
    prop.activatePopup(false);
  }, []);

  /* ************************************************************ */

  /* ********************REMOVE CART ITEM******************** */
  /* ********************REMOVE CART ITEM******************** */

  function removeItem(e) {
    const newCart = prop.cart.filter((item) => item.id != e.target.dataset.id);

    localStorage.setItem("cart", JSON.stringify(newCart));
    prop.setAppCart([...newCart]);
    if (!localStorage.getItem("cart").length) {
      localStorage.removeItem("order");
    }
  }

  const total = prop.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  /* ************************************************************ */

  /* ********************SHIPPING CALCULATION******************** */
  /* ********************SHIPPING CALCULATION******************** */

  /* ************************************************************ */

  useEffect(() => {
    if (userRegion) {
      prop.setShippingFee(prop.shippingPrice());
    } else {
      prop.setShippingFee(2000);
    }
  }, [userRegion]);

  /* ********************GET USER IP******************** */
  /* ********************GET USER IP******************** */
  async function getIp() {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const ipData = await response.json();

      if (prop.allStates.includes(ipData.region)) {
        setUserRegion(ipData.region);
      } else {
        setUserRegion("Lagos");
      }
    } catch (e) {
      console.log("Error fetching IP", e);
      setUserRegion("Lagos");
    }
  }

  useEffect(() => {
    getIp();
  }, []);

  /* ************************************************************ */

  /* ************************************************************ */

  /* ********************SUBMIT FUNCTION******************** */
  /* ********************SUBMIT FUNCTION******************** */
  function submitForm(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setUserRegion(formData.get("state"));

    setDropdown(false);
  }

  /* ************************************************************ */

  /* ********************SAVE ORDER FUNCTION******************** */
  /* ********************SAVE ORDER FUNCTION******************** */

  async function handleOrder() {
    const response = await fetch(
      `http://${import.meta.env.VITE_PRIVATE_IP}:3000/saveOrder`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: prop.cart,
          totalAmount: totalAmount + shippingPrice(),
        }),
      },
    );

    const res = await response.json();
    if (res.status) {
      prop.setOrder(res.data);
      navigate("/checkout");
    } else {
      alert(res.message);
    }
  }

  /* ************************************************************ */

  return (
    <>
      <PageLocation location={"cart"} />
      <BackToTop />

      {prop.cart.length < 1 ? (
        <div
          className="d-flex flex-column align-items-center  ms-auto me-auto  gap-5"
          style={{ maxWidth: "500px" }}
        >
          <img src={emptyCart} className="w-25" style={{ opacity: "0.5" }} />
          <p className="m-0 fw-bold fs-2">YOUR CART IS EMPTY</p>

          <Link to="/" className="text-reset">
            <button className="btn banner-button w-auto fw-light rounded  p-2 fw-medium">
              Keep Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div
          className="cart-container d-flex flex-column mx-auto"
          style={{ width: "90%" }}
        >
          <div className="middle-liner w-100">
            <h1 className="middle-title">YOUR CART</h1>
          </div>

          <table className=" mt-0 mt-md-4">
            <thead>
              <tr>
                <th className="product-column ps-4 ">PRODUCT</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>TOTAL</th>
              </tr>
            </thead>

            <tbody>
              {prop.cart.map((item, index) => {
                return (
                  <tr key={index} className="position-relative">
                    <td>
                      <div className=" d-flex align-items-center w-85 gap-4 position-relative">
                        <img
                          className="product-img"
                          src={item.images[0]}
                          style={{ width: "70px", aspectRatio: "1/1" }}
                        />
                        <Link
                          to={`/product/${item.id}`}
                          className="text-reset text-decoration-none"
                        >
                          <p className="product-version">{item.version}</p>
                        </Link>
                      </div>
                    </td>

                    <td data-title="Price:">
                      <p className="m-0">₦{item.price.toLocaleString()}</p>
                    </td>

                    <td data-title="Quantity:">
                      <QuantityPill
                        yourCart={true}
                        setAppCart={prop.setAppCart}
                        cart={prop.cart}
                        cartQuantity={item.quantity}
                        item={item}
                      />
                    </td>

                    <td data-title="Subtotal:" className="subtotal-td">
                      <p
                        className="m-0 accent-color"
                        style={{ fontSize: "17px" }}
                      >
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>

                      <span
                        className="remove-btn me-1 text-danger text-center copy-button position-absolute  end-0"
                        onClick={removeItem}
                        style={{ top: "44%" }}
                        data-id={item.id}
                      >
                        x
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* **************************************************************************************************************** */
          /* **************************************************************************************************************** */}
          {/* ****ORDER-SUMMARY*********************************ORDER-SUMMARY******************************************ORDER-SUMMARY***** */}
          {/* **************************************************************************************************************** */
          /* **************************************************************************************************************** */}
          <div
            className="order-summary align-self-end d-flex flex-column  p-4 rounded "
            id="orderSummary"
          >
            <h5 className="mb-5 text-center">ORDER SUMMARY</h5>
            <div className="  d-flex justify-content-between   align-items-center mb-2 pb-1 bb mt-1">
              <p className="fw-bold m-0">SUBTOTAL:</p>{" "}
              <p className=" m-0 grey-color" style={{ fontSize: "18px" }}>
                {" "}
                ₦{total.toLocaleString()}
              </p>
            </div>
            <div className="d-flex justify-content-between   align-items-center pb-1 bb  mb-2 mt-3 ">
              <p className="fw-bold m-0">SHIPMENT:</p>{" "}
              <div
                className="d-flex flex-column align-items-end shipment-info"
                style={{ fontSize: "13px" }}
              >
                <p className=" m-0 grey-color ">
                  Orders within {userRegion} costs{" "}
                  <span className="text-black ms-1 fw-medium">
                    ₦{prop.shippingPrice(userRegion).toLocaleString()}
                  </span>
                </p>
                <p className=" m-0 grey-color" style={{ fontSize: "14px" }}>
                  Shipping to <span className="text-black"> {userRegion}</span>
                </p>
                <div className="d-flex flex-column w-100">
                  <p
                    className="align-self-end accent-color"
                    style={{ fontSize: "13px", cursor: "pointer" }}
                    onClick={() =>
                      dropdown ? setDropdown(false) : setDropdown(true)
                    }
                  >
                    Change Address <i className="bi bi-chevron-down  "></i>
                  </p>

                  <form
                    className={`shipping-form d-flex flex-column gap-2 w-100 mb-2 ${dropdown ? "dropdown" : "hide"} `}
                    onSubmit={submitForm}
                  >
                    {/* ********************Country Selection******************** */}
                    <select
                      name="country"
                      className="form-select"
                      onChange={(e) =>
                        setIsCountry(e.target.value == "Nigeria")
                      }
                      required
                    >
                      <option className="grey-color" value="">
                        --Country--
                      </option>
                      <option value="Nigeria">Nigeria</option>
                    </select>

                    {/* ********************State Selection******************** */}

                    <select
                      name="state"
                      className="form-select state-form"
                      required
                    >
                      <option className="grey-color" value="">
                        --State--
                      </option>
                      {!isCountry ? null : (
                        <Fragment>
                          {prop.allStates.map((state, index) => {
                            return (
                              <option
                                name={state.toLowerCase()}
                                value={state}
                                key={index}
                              >
                                {" "}
                                {state}
                              </option>
                            );
                          })}
                        </Fragment>
                      )}
                    </select>

                    {/* ********************City Selection******************** */}
                    <input
                      type="text"
                      className="form-control city-input p-2"
                      placeholder="--City--"
                      style={{ fontSize: "16px" }}
                      required
                    />
                    {/* ********************Button******************** */}
                    <button
                      className="btn banner-button align-self-end w-50 rounded p-1"
                      type="submit"
                    >
                      UPDATE
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between  bb align-items-center pb-1 mb-2 mt-3 ">
              <p className="fw-bold m-0">GRAND TOTAL:</p>{" "}
              <p className="total-amt m-0">
                {" "}
                ₦{(total + prop.shippingPrice(userRegion)).toLocaleString()}
              </p>
            </div>
            <button
              className="btn mt-3 banner-button w-100 align-self-end position-relative"
              onClick={(e) => {
                prop.setBin(null);
                prop.handleOrder(e, prop.cart, total);
              }}
            >
              <div
                class="spinner-border text-white position-absolute start-0 end-0 top-0 bottom-0 m-auto w-22px h-22px "
                role="status"
              ></div>
              <span> PROCEED TO CHECKOUT</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default YourCart;
