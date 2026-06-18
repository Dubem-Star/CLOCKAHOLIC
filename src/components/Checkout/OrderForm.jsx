import { useEffect, useRef, useState } from "react";
import PaystackIcon from "@/assets/images/img_icons/paystack_logo.png";
import OrderSummary from "./OrderSummary";
import BackToTop from "@/components/plugins/btns/BackToTop";
function OrderForm(prop) {
  const bankTransferMod = useRef(null);
  const shippingForm = useRef(null);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    prop.activatePopup(false);
    document.title = "Checkout Page | Clockaholic";

    /* ******************** Check Bank Transfer MOD by default******************** */
    /* ******************** Check Bank Transfer MOD by default******************** */
    if (bankTransferMod.current) {
      bankTransferMod.current.checked = true;
      bankTransferMod.current
        .closest(".mod-box")
        .querySelector(".brief-desc")
        .classList.add("show");
      bankTransferMod.current.closest(".mod-box").classList.add("glow");
    }
  }, []);

  /* ********************HANDLE MOD FUNCTION******************** */
  /* ********************HANDLE MOD FUNCTION******************** */
  function handleModeOfPayment(e) {
    const selectedMod = e.target.nextElementSibling.innerHTML;
    const inputs = e.target
      .closest(".mode-of-payment")
      .querySelectorAll("input");

    e.target
      .closest(".mod-box")
      .querySelector(".brief-desc")
      .classList.add("show");

    e.target.closest(".mod-box").classList.add("glow");

    e.target.checked = true;

    for (let input of inputs) {
      if (input.nextElementSibling.innerHTML !== selectedMod) {
        input.checked = false;
        input
          .closest(".mod-box")
          .querySelector(".brief-desc")
          .classList.remove("show");

        input.closest(".mod-box").classList.remove("glow");
      }
    }
  }
  /* ************************************************************* */
  /* ************************************************************* */

  return (
    <>
      <BackToTop />
      <div
        className="checkout-container container-fluid mx-auto  position-relative"
        style={{ width: "95%" }}
      >
        <div className="middle-liner w-100" style={{ marginTop: "100px" }}>
          <h1 className="middle-title">CHECKOUT</h1>
        </div>
        <div className="d-flex  gap-3 mt-4 mt-md-5  wrapper">
          {/*SHIPPING FORM SHIPPING FORM SHIPPING FORM SHIPPING FORM SHIPPING FORM SHIPPING FORM SHIPPING FORM SHIPPING FORM 
        SHIPPING FORM SHIPPING FORM SHIPPING FORM SHIPPING FORM SHIPPING FORM SHIPPING FORM SHIPPING FORM SHIPPING FORM */}

          <div className="user-form w-md-50 w-100">
            <form
              ref={shippingForm}
              action="#"
              id="shippingAddressForm"
              className="form-control container-fluid checkout-form border-0 d-flex flex-column gap-3"
            >
              <div className="form-column d-flex flex-column  ">
                <label className=" fs-4 " htmlFor="emailContact">
                  Delivery
                </label>
                <input
                  type="email"
                  className="form-control py-2 mt-3"
                  id="emailContact"
                  placeholder="Email:"
                  name="email"
                  required
                />
              </div>

              <div className="form-column form-floating">
                <select
                  name="country"
                  className="form-select"
                  id="region"
                  aria-label="Country/Region:"
                  required
                  style={{ fontSize: "14px" }}
                >
                  <option value="">--select country--</option>

                  <option value="unitedStates">United States</option>
                  <option value="canada">Canada</option>
                  <option value="southAfrica">South Africa</option>
                  <option value="nigeria">Nigeria</option>
                  <option value="india">India</option>
                  <option value="australia">Australia</option>
                  <option value="germany">Germany</option>
                </select>
                <label htmlFor="region">Country/Region:</label>
              </div>

              <div className="flex-row-container d-flex flex-column flex-lg-row gap-3 gap-lg-2">
                <input
                  type="text"
                  className="form-control py-2 "
                  name="firstname"
                  placeholder="First name:"
                  required
                />
                <input
                  type="text"
                  className="form-control"
                  name="lastname"
                  placeholder="Last name:"
                  required
                />
              </div>

              <input
                type="text"
                className="form-control py-2"
                name="address"
                placeholder="Delivery Address:"
                required
              />

              <div className="location-container d-flex align-items-center flex-column flex-lg-row gap-3 gap-lg-2">
                <input
                  type="text"
                  name="city"
                  placeholder="City:"
                  className="form-control w-30 py-2"
                  required
                />
                <div className="form-floating state-selection w-40">
                  <select
                    name="state"
                    id="state"
                    className="form-select fs-14"
                    id="state"
                    required
                    onChange={(e) => {
                      setRegion(e.currentTarget.value);
                    }}
                  >
                    <option value="" className="state-placeholder ">
                      --select state--
                    </option>

                    {prop.allStates.map((state, index) => {
                      return (
                        <option name={state} key={index} value={state}>
                          {state}
                        </option>
                      );
                    })}
                  </select>
                  <label htmlFor="state">State</label>
                </div>

                <input
                  type="number"
                  className="form-control w-30 py-2"
                  name="zip-code"
                  placeholder="ZIP code (optional)"
                  required
                />
              </div>

              <input
                type="number"
                className="form-control py-2"
                placeholder="Phone "
                name="phonenumber"
                required
              />

              {/*PAYMENT-SECTION   PAYMENT-SECTION   PAYMENT-SECTION   PAYMENT-SECTION   PAYMENT-SECTION   PAYMENT-SECTION   PAYMENT-SECTION   PAYMENT-SECTION   
        PAYMENT-SECTION   PAYMENT-SECTION   PAYMENT-SECTION   PAYMENT-SECTION   PAYMENT-SECTION   PAYMENT-SECTION   PAYMENT-SECTION   PAYMENT-SECTION   */}

              <div className="payment-section mt-5">
                <label className="bold-labels fs-4">Payment</label>
                <p
                  className="under-payment fw-normal grey-color "
                  style={{ fontSize: "14px" }}
                >
                  All transactions are secure and encrypted.
                </p>

                <div className="d-flex flex-column mode-of-payment gap-2 mt-3">
                  <div className="w-100 p-3 position-relative mod-box ">
                    <div className="d-flex position-relative align-items-center">
                      <input
                        id="bankTFCheckbox"
                        type="checkbox"
                        className="form-check-input me-3 mt-auto mb-auto"
                        onChange={handleModeOfPayment}
                        ref={bankTransferMod}
                      />
                      <label
                        htmlFor="bankTFCheckbox"
                        className="form-check-label fs-14"
                      >
                        Bank Transfer
                      </label>
                      <img
                        src={PaystackIcon}
                        className="position-absolute rounded-1"
                      />
                    </div>

                    <p className="brief-desc grey-color">
                      {" "}
                      Make a direct transfer to our verified accounts via
                      Paystack. Your order will be confirmed once the
                      transaction is verified.{" "}
                    </p>
                  </div>

                  <div className="w-100 p-3 position-relative mod-box">
                    <div className="d-flex position-relative">
                      <input
                        id="creditCardCheckbox"
                        type="checkbox"
                        className="form-check-input me-3 mt-auto mb-auto"
                        onChange={handleModeOfPayment}
                      />

                      <label
                        htmlFor="creditCardCheckbox"
                        className="form-check-label fs-14"
                      >
                        Credit Card
                      </label>

                      <img
                        src={PaystackIcon}
                        className="position-absolute rounded-1"
                      />
                    </div>

                    <p className="brief-desc grey-color">
                      Fast and secure payment processed via Paystack. We accept
                      all major cards.
                    </p>
                  </div>

                  <div className="w-100 p-3 position-relative mod-box">
                    <div className="d-flex position-relative">
                      <input
                        id="codCheckbox"
                        type="checkbox"
                        className="form-check-input me-3 mt-auto mb-auto"
                        onChange={handleModeOfPayment}
                      />

                      <label
                        htmlFor="codCheckbox"
                        className="form-check-label fs-14"
                      >
                        Cash on Delivery (COD)
                      </label>
                    </div>
                    <p className="brief-desc grey-color">
                      Pay conveniently with cash when your order is delivered to
                      your doorstep.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn mt-5 banner-button w-100"
                  style={{ borderRadius: "6px" }}
                >
                  PLACE ORDER
                </button>
              </div>
            </form>
          </div>

          <OrderSummary
            shippingPrice={prop.shippingPrice}
            orderDoc={prop.orderDoc}
            shippingForm={shippingForm}
            allStates={prop.allStates}
            region={region}
          />
        </div>
      </div>
    </>
  );
}

export default OrderForm;
