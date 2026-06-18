function OrderSummary(prop) {
  return (
    <>
      <div
        className="product-details container w-md-50 w-100 pt-2 sticky-top mx-auto mt-5 mt-md-0"
        style={{ maxHeight: "fit-content", top: "20px" }}
      >
        <div className="">
          <h4 className="fs-4 text-center fw-normal">Order Summary</h4>
        </div>

        <div className="product-box container " id="productBox">
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

        <div className="d-flex flex-column container mt-3 mb-2">
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

        <button
          type="submit"
          className="btn mt-4 mb-1 banner-button w-100 d-none"
          style={{ borderRadius: "6px" }}
          onClick={() => {
            const formData = new FormData(prop.shippingForm.current);
            const entries = Object.fromEntries(formData.entries());
            const skipField = ["zip-code"];

            for (const [key, value] of Object.entries(entries)) {
              if (skipField.includes(key)) {
                continue;
              }
              if (
                value.trim() === "" ||
                value === null ||
                value === undefined
              ) {
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                });
                alert("Please fill all required fields.");
                return;
              }
            }
          }}
        >
          PLACE ORDER
        </button>
      </div>
    </>
  );
}

export default OrderSummary;
