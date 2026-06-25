import { useEffect, useRef, useState } from "react";
import PaystackIcon from "@/assets/images/img_icons/paystack_logo.png";
import OrderSummary from "./OrderSummary";
import BackToTop from "@/components/plugins/btns/BackToTop";
function OrderForm(prop) {
  const bankTransferMod = useRef(null);
  const shippingForm = useRef(null);
  const [region, setRegion] = useState(null);
  const [mod, setMod] = useState("Bank Transfer");
  const [shippingFee, setShippingFee] = useState(0);
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

    setMod(selectedMod);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const form = shippingForm.current;

    if (form && !form.checkValidity()) {
      form.reportValidity();
      return;
    }

    prop.completeOrder(e, prop.orderDoc.orderId, mod);
  }
  /* ************************************************************* */
  /* ************************************************************* */

  /* ********************PREPARE ORDER FOR APP.JSX******************** */
  /* ********************PREPARE ORDER FOR APP.JSX******************** */
  function prepareOrder(e, orderId, form, mod) {
    e.preventDefault();

    const formData = new FormData(form);
    const shippingDetails = {
      ...Object.fromEntries(formData.entries()),
      modeOfPayment: mod,
      orderId: orderId,
      shippingFee: shippingFee,
      totalAmount: prop.orderDoc.totalAmount,
    };

    prop.completeOrder(e, prop.orderDoc.orderId, shippingDetails);
  }

  const termsCheckbox = useRef(null);

  useEffect(() => {
    function handleTermsCheckboxChange(e) {
      if (window.innerWidth < 768) {
        termsCheckbox.current.checked = true;
      }

      window.addEventListener("resize", () => {
        if (window.innerWidth < 768) {
          termsCheckbox.current.checked = true;
        }
      });
    }

    handleTermsCheckboxChange();
  }, []);

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
              onSubmit={handleSubmit}
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
                    className="form-select fs-14"
                    id="state"
                    required
                    onChange={(e) => {
                      setRegion(e.currentTarget.value);
                      const newShippingFee = prop.shippingPrice(
                        e.currentTarget.value,
                      );

                      setShippingFee(newShippingFee);

                      prop.orderDoc.totalAmount =
                        prop.orderDoc.totalAmount -
                        shippingFee +
                        newShippingFee;
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
                        Cash on Delivery
                      </label>
                    </div>
                    <p className="brief-desc grey-color">
                      Pay conveniently with cash when your order is delivered to
                      your doorstep.
                    </p>
                  </div>
                </div>

                <div className="policy mt-5 d-flex align-items-center gap-2">
                  <input
                    id="checkbox"
                    type="checkbox"
                    className="checker form-check-input m-0"
                    name="termsCheckbox"
                    required
                    ref={termsCheckbox}
                  />

                  <span className="fs-15">
                    I have read and agree to the{" "}
                    <a
                      href="#"
                      className="text-decoration-none text-reset fw-bold fs-14"
                      onClick={(e) => {
                        e.preventDefault();
                        prop.setTermsOfService(true);
                        prop.setIsShowLegal(true);
                      }}
                    >
                      Terms and Condition
                    </a>
                  </span>
                </div>

                <button
                  type="submit"
                  className="btn mt-4 banner-button w-100 position-relative"
                  style={{ borderRadius: "6px" }}
                  onClick={(e) => {
                    const form = e.currentTarget.closest("form");

                    if (form && !form.checkValidity()) {
                      form.reportValidity();
                      return;
                    }

                    prepareOrder(e, prop.orderDoc.orderId, form, mod);
                  }}
                >
                  <div
                    className="spinner-border text-white position-absolute start-0 end-0 top-0 bottom-0 m-auto w-22px h-22px "
                    role="status"
                  ></div>
                  <span>COMPLETE ORDER</span>
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
            setTermsOfService={prop.setTermsOfService}
            setIsShowLegal={prop.setIsShowLegal}
            completeOrder={prop.completeOrder}
            mod={mod}
            prepareOrder={prepareOrder}
          />
        </div>
      </div>
    </>
  );
}

export default OrderForm;
