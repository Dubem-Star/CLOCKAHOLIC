import { useRef, useEffect } from "react";
function OrderSummary(prop) {
  const termsCheckbox = useRef(null);

  useEffect(() => {
    prop.setFinalAmt(
      prop.orderDoc.totalAmount + prop.shippingPrice(prop.region),
    );
  }, [prop.region]);
  return (
    <>
      <div
        className="product-details   w-100 p-2 sticky-top mx-auto mt-5 mt-md-0"
        style={{ maxHeight: "fit-content", top: "20px", width: "1000px" }}
      >
        <div className="mb-3">
          <h4 className="fs-4 text-center fw-normal">Order Summary</h4>
        </div>

        <div className="product-box p-3 mt-2 " id="productBox">
          {prop.orderDoc.products.map((product) => {
            return (
              <div key={product.id}>
                <div className="d-flex justify-content-between ">
                  <div className="d-flex gap-2 position-relative">
                    <img src={product.images[0]} className=" p-1 order-img" />

                    <p className="fw-normal version mt-1 pe-lg-5 pe-3 ">
                      {" "}
                      {product.version}
                    </p>

                    <span className="position-absolute  p-1 text-white qty-circle d-flex justify-content-center align-items-center">
                      {" "}
                      {product.quantity}
                    </span>
                  </div>
                  <div className="d-flex flex-column gap-1">
                    <span className="fs-17 price">
                      ₦{product.price.toLocaleString()}
                    </span>

                    <span className="grey-color text-end fs-14">
                      x{product.quantity}
                    </span>
                  </div>
                </div>
                <hr className="mb-4 mt-3" />
              </div>
            );
          })}
        </div>

        <div className="d-flex flex-column p-3 mt-3 mb-2">
          <div className="d-flex justify-content-between">
            {" "}
            <p className="m-0">Subtotal: </p>{" "}
            <span>₦{prop.orderDoc.totalAmount.toLocaleString()}</span>
          </div>
          <hr className="mb-3 mt-3" />
          <div className="d-flex justify-content-between">
            {" "}
            <p className="m-0"> Shipping Fee: </p>{" "}
            <span className="grey-color">
              ₦{prop.shippingPrice(prop.region).toLocaleString()}
            </span>
          </div>
          <hr className="mb-3 mt-3" />
          <div className="d-flex justify-content-between">
            {" "}
            <p className="fw-medium fs-5 m-0">Total: </p>{" "}
            <span className="fw-medium fs-4" style={{ color: "#b8860b" }}>
              ₦
              {(
                prop.orderDoc.totalAmount + prop.shippingPrice(prop.region)
              ).toLocaleString()}
            </span>
          </div>
        </div>

        <div
          className="policy mt-4 d-flex align-items-center  px-3 d-none"
          style={{ gap: "10px" }}
        >
          <input
            id="checkbox"
            type="checkbox"
            className="checker form-check-input m-0"
            ref={termsCheckbox}
            required
          />

          <span className="fs-14">
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
          className="btn mt-4 mb-1 banner-button w-100 d-none position-relative"
          style={{ borderRadius: "6px" }}
          onClick={(e) => {
            if (
              !prop.shippingForm.current.checkValidity() ||
              !termsCheckbox.current.checked
            ) {
              prop.shippingForm.current.reportValidity();
              alert(
                "Please fill all required fields and accept the terms to proceed.",
              );
              return;
            }

            prop.prepareOrder(
              e,
              prop.orderDoc.orderId,
              prop.shippingForm.current,
              prop.mod,
            );
          }}
        >
          <div
            className="spinner-border text-white position-absolute start-0 end-0 top-0 bottom-0 m-auto w-22px h-22px "
            role="status"
          ></div>
          <span>COMPLETE ORDER</span>
        </button>
      </div>
    </>
  );
}

export default OrderSummary;
