import { useEffect, useRef, useState } from "react";
import PaystackIcon from "@/assets/images/img_icons/paystack_logo.png";
import OrderSummary from "./OrderSummary";
import BackToTop from "@/components/plugins/btns/BackToTop";
import { useNavigate } from "react-router-dom";
function OrderForm(prop) {
  const navigate = useNavigate();
  const bankTransferMod = useRef(null);
  const shippingForm = useRef(null);
  const [region, setRegion] = useState(null);
  const [mod, setMod] = useState(
    localStorage.getItem("selectedMod") || "Bank Transfer",
  );
  const [finalAmt, setFinalAmt] = useState(0);
  const shippingFormBlock = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    prop.activatePopup(false);
    document.title = "Checkout Page | Clockaholic";
  }, []);

  /* ******************** Check Bank Transfer MOD by default******************** */
  /* ******************** Check Bank Transfer MOD by default******************** */
  useEffect(() => {
    const inputs = bankTransferMod.current
      .closest(".mode-of-payment")
      .querySelectorAll("input");

    for (let input of inputs) {
      if (input.nextElementSibling.innerHTML === mod) {
        input.checked = true;
        input
          .closest(".mod-box")
          .querySelector(".brief-desc")
          .classList.add("show");
        input.closest(".mod-box").classList.add("glow");
      } else {
        input.checked = false;
        input
          .closest(".mod-box")
          .querySelector(".brief-desc")
          .classList.remove("show");
        input.closest(".mod-box").classList.remove("glow");
      }
    }
  }, [mod]);

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
    localStorage.setItem("selectedMod", selectedMod);
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
    console.log(Object.fromEntries(formData.entries()));

    const shippingDetails = {
      ...Object.fromEntries(formData.entries()),
      modeOfPayment: mod,
      orderId: orderId,
      shippingFee: prop.shippingPrice(region),
      totalAmount: finalAmt,
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

    setMod("Bank Transfer");

    handleTermsCheckboxChange();
  }, []);

  // useEffect(() => {
  //   if (prop.showCodConfirmation) {
  //     const shippingData = new FormData(shippingForm.current);
  //     shippingFormBlock.current.scrollIntoView({ behavior: "smooth" });
  //     shippingFormBlock.current.innerHTML = `
  //     <div class="d-flex flex-column align-items-start py-4 px-2 w-100" >

  //       <!-- Checkmark -->
  //       <div class="d-flex  justify-content-center align-items-center rounded-circle border border-success mb-3"
  //         style="width:48px; height:48px; flex-shrink:0;">
  //         <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24"
  //           stroke="#198754" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  //           <polyline points="20 6 9 17 4 12"/>
  //         </svg>
  //       </div>

  //       <!-- Heading -->
  //       <h5 class="fw-bold mb-1" style="font-size:1.1rem;">
  //         Thank you, ${shippingData.get("firstName")}!
  //       </h5>
  //       <p class="text-muted mb-3" style="font-size:13px;">
  //         Your order is confirmed.
  //       </p>

  //       <!-- Divider -->
  //       <hr class="w-100 my-2"/>

  //       <!-- Order details -->
  //       <div class="w-100 mb-3">
  //         <p class="mb-1" style="font-size:13px;">
  //           <span class="text-muted">Order number:</span>
  //           <strong class="ms-1">${prop.orderDoc?.orderId || ""}</strong>
  //         </p>
  //         <p class="mb-1" style="font-size:13px;">
  //           <span class="text-muted">Confirmation sent to:</span>
  //           <strong class="ms-1">${shippingData.get("email")}</strong>
  //         </p>
  //         <p class="mb-1" style="font-size:13px;">
  //           <span class="text-muted">Payment:</span>
  //           <strong class="ms-1">Cash on Delivery</strong>
  //         </p>
  //         <p class="mb-0" style="font-size:13px;">
  //           <span class="text-muted">Delivering to:</span>
  //           <strong class="ms-1">
  //             ${shippingData.get("address") || ""},
  //             ${shippingData.get("city") || ""},
  //             ${shippingData.get("state") || ""}
  //           </strong>
  //         </p>
  //       </div>

  //       <hr class="w-100 my-2"/>

  //       <!-- CTA -->
  //       <a href="/" class="btn btn-dark w-100 mt-2" style="font-size:13px; letter-spacing:0.05em;">
  //         Continue Shopping
  //       </a>
  //     </div>
  //   `;
  //   }
  // }, [prop.showCodConfirmation]);

  useEffect(() => {
    if (prop.showCodConfirmation) {
      const shippingData = new FormData(shippingForm.current);
      window.scrollTo({ top: 0, behavior: "smooth" });
      // shippingFormBlock.current.scrollIntoView({ behavior: "smooth" });
      shippingFormBlock.current.innerHTML = `
      <div class="w-100 py-4">

        <!-- Header -->
        <div class="d-flex align-items-center gap-3 mb-4">
          <div class="d-flex align-items-center justify-content-center rounded-circle  flex-shrink-0"
            style="width:52px; height:52px; border:2px solid #b8860b;">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24"
              stroke="#b8860b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div>
          
            <h5 class="fw-bold mb-0" style="font-size:1.3rem;">
              Thank you, ${shippingData.get("firstName")}!
            </h5>
          </div>
        </div>

        <!-- Confirmed box -->
        <div class="border rounded p-3 mb-3">
          <p class="fw-semibold mb-1" style="font-size:14px;">Your order is confirmed</p>
       <p class="text-muted mb-0" style="font-size:13px;">
  Kindly send us a message on
  <a href="https://wa.me/2347030468478"
     style="color:#b8860b;"
     class="text-decoration-none fw-semibold">
     WhatsApp
  </a>
  and
  <span
    id="copyOrderId"
    style="color:#b8860b; cursor:pointer; font-weight:600;"
  >
    Click here 
  </span>
  to copy your Order ID to include in your message.
</p>
        </div>

        <!-- Order details box -->
        <div class="border rounded p-3 mb-4">
          <p class="fw-semibold mb-3" style="font-size:14px;">Order details</p>
          <div class="row g-3">

            <!-- Contact -->
            <div class="col-6">
              <p class="text-muted mb-1" style="font-size:12px; font-weight:600;">Contact information</p>
              <p class="mb-0" style="font-size:13px;">${shippingData.get("email")}</p>
            </div>

            <!-- Payment method -->
            <div class="col-6">
              <p class="text-muted mb-1" style="font-size:12px; font-weight:600;">Payment method</p>
              <p class="mb-0" style="font-size:13px;">
                Cash on Delivery (COD) · 
               
              </p>
            </div>

            <!-- Shipping address -->
            <div class="col-6">
              <p class="text-muted mb-1" style="font-size:12px; font-weight:600;">Shipping address</p>
              <p class="mb-0" style="font-size:13px; line-height:1.7; color: #b8860b">
                ${shippingData.get("firstName")} ${shippingData.get("lastName")}<br/>
                ${shippingData.get("address")}<br/>
                ${shippingData.get("city")}<br/>
                ${shippingData.get("state")} ${shippingData.get("zip") || ""}<br/>
                ${shippingData.get("country")}<br/>
                ${shippingData.get("phoneNo")}
              </p>
            </div>

            <!-- Shipping method -->
            <div class="col-6">
              <p class="text-muted mb-1" style="font-size:12px; font-weight:600;">Shipping method</p>
              <p class="mb-0" style="font-size:13px; color: #b8860b">Dispatch</p>
            </div>

          </div>
        </div>

        <!-- Bottom row -->
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <p class="mb-0 d-none" style="font-size:13px;">
            Need help? 
            <a href="https://wa.me/2348020919409" class="text-danger text-decoration-none fw-semibold">Contact us</a>
          </p>

         

          <a  id="continueShoppingBtn" class="btn continue-shopping-btn text-white px-4" style="font-size:13px; letter-spacing:0.05em; background-color:#b8860b; ">
            Continue shopping
          </a>
          
        </div>

      </div>
    `;
    }

    const continueShoppingBtn = document.getElementById("continueShoppingBtn");
    const copyOrderIdBtn = document.getElementById("copyOrderId");

    if (continueShoppingBtn) {
      continueShoppingBtn.addEventListener("click", (e) => {
        e.preventDefault();
        prop.setShowCodConfirmation(false);
        navigate("/");
      });
    }

    if (copyOrderIdBtn) {
      copyOrderIdBtn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(prop.orderDoc?.orderId || "");

          copyOrderIdBtn.textContent = "✅ Order ID copied!";

          setTimeout(() => {
            copyOrderIdBtn.textContent = "Click here ";
          }, 3000);
        } catch (err) {
          console.error(err);
        }
      });
    }
  }, [prop.showCodConfirmation]);

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

          <div className="user-form w-md-50 w-100" ref={shippingFormBlock}>
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
                  name="firstName"
                  placeholder="First name:"
                  required
                />
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
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
                name="phoneNo"
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
            setFinalAmt={setFinalAmt}
          />
        </div>
      </div>
    </>
  );
}

export default OrderForm;
