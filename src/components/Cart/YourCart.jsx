import { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
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
  const [userRegion, setUserRegion] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [isCountry, setIsCountry] = useState(false);

  /* ********************URGENT USE-EFFECTS******************** */
  /* ********************URGENT USE-EFFECTS******************** */

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    prop.activatePopup(false);
  }, []);

  /* ************************************************************ */

  /* ********************REMOVE CART ITEM******************** */
  /* ********************REMOVE CART ITEM******************** */

  function removeItem(e) {
    const newCart = prop.cart.filter((item) => item.id != e.target.dataset.id);

    localStorage.setItem("cart", JSON.stringify(newCart));
    prop.setAppCart([...newCart]);
  }

  const totalAmount = prop.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  /* ************************************************************ */

  /* ********************GET USER IP******************** */
  /* ********************GET USER IP******************** */
  const allStates = [
    ...lagos,
    ...southEast,
    ...southSouth,
    ...southWest,
    ...farNorth,
    ...northCentral,
  ];

  async function getIp() {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const ipData = await response.json();

      if (allStates.includes(ipData.region)) {
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

  /* ********************SHIPPING CALCULATION******************** */
  /* ********************SHIPPING CALCULATION******************** */

  function shippingPrice() {
    if (!userRegion) return 0;

    if (lagos.includes(userRegion)) return 2000;
    if (southWest.includes(userRegion)) return 4000;
    if (southSouth.includes(userRegion)) return 4000;
    if (southEast.includes(userRegion)) return 6000;
    if (northCentral.includes(userRegion)) return 8000;
    if (farNorth.includes(userRegion)) return 8000;
  }
  /* ************************************************************ */

  /* ********************SUBMIT FUNCTION******************** */
  /* ********************SUBMIT FUNCTION******************** */
  function submitForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    setUserRegion(formData.get("state"));
    setDropdown(false);
  }

  return (
    <>
      <PageLocation location={"cart"} />
      <BackToTop />

      {prop.cart.length < 1 ? (
        <div className="d-flex flex-column align-items-center w-50 ms-auto me-auto  gap-4">
          <img src={emptyCart} className="w-25" />
          <p className="m-0 fw-bold fs-2">NO ITEMS IN YOUR CART</p>

          <Link to="/" className="text-reset">
            <button
              className="btn banner-button w-auto fw-light rounded   fw-medium"
              style={{ padding: "10px 17px" }}
            >
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
                          style={{ width: "18%", aspectRatio: "1/1" }}
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
          <div className="order-summary align-self-end d-flex flex-column  p-4 rounded ">
            <h5 className="mb-5 text-center">ORDER SUMMARY</h5>
            <div className="  d-flex justify-content-between   align-items-center mb-2 pb-1 bb mt-1">
              <p className="fw-bold m-0">SUBTOTAL:</p>{" "}
              <p className=" m-0 grey-color" style={{ fontSize: "18px" }}>
                {" "}
                ₦{totalAmount.toLocaleString()}
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
                    ₦{shippingPrice().toLocaleString()}
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
                          {allStates.map((state, index) => {
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
                      className="form-control p-2"
                      placeholder="--City--"
                      style={{ fontSize: "13px" }}
                      required
                    />
                    {/* ********************Button******************** */}
                    <button
                      className="btn banner-button align-self-end w-50 rounded p-1"
                      // onClick={submitForm}
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
                ₦{(totalAmount + shippingPrice()).toLocaleString()}
              </p>
            </div>
            <button className="btn mt-3 banner-button w-100 align-self-end">
              CHECKOUT
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default YourCart;
