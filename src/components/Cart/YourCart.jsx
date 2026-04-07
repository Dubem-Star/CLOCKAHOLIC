import { useEffect, useState, Fragment } from "react";
import PageLocation from "../plugins/PageLocation";
import QuantityPill from "@/components/plugins/QuantityPill";
import {
  lagos,
  southEast,
  southWest,
  southSouth,
  farNorth,
  northCentral,
} from "../plugins/ShippingLocation";
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
      <div
        className="cart-container d-flex flex-column mx-auto"
        style={{ width: "90%" }}
      >
        <div className="middle-liner w-100">
          <h1 className="middle-title" style={{ fontSize: "30px" }}>
            YOUR CART
          </h1>
        </div>

        <table className="mt-4">
          <thead>
            <tr>
              <th className="  ps-4 w-50 ">PRODUCT</th>
              <th>PRICE</th>
              <th style={{ paddingLeft: "100px" }}>QUANTITY</th>
              <th>TOTAL</th>
            </tr>
          </thead>

          <tbody>
            {prop.cart.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div className=" d-flex align-items-center w-75 gap-3">
                      <img src={item.images[0]} style={{ width: "20%" }} />

                      <p>{item.version}</p>
                    </div>
                  </td>

                  <td>
                    <p className="m-0">₦{item.price.toLocaleString()}</p>
                  </td>

                  <td style={{ paddingLeft: "100px" }}>
                    <QuantityPill
                      yourCart={true}
                      setAppCart={prop.setAppCart}
                      cart={prop.cart}
                      cartQuantity={item.quantity}
                      item={item}
                    />
                  </td>

                  <td className="position-relative">
                    <p
                      className="m-0 accent-color"
                      style={{ fontSize: "17px" }}
                    >
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>

                    <span
                      className="me-1 text-danger text-center copy-button position-absolute  end-0"
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
          <div className="  d-flex justify-content-between   align-items-center mb-2 pb-1 bb ">
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
                    onChange={(e) => setIsCountry(e.target.value == "Nigeria")}
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
    </>
  );
}

export default YourCart;
