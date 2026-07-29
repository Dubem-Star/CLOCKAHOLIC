import Navbar from "@/components/plugins/Navbar";
import Footer from "@/components/plugins/Footer";

import { useState, useEffect } from "react";

function paymentStatus(prop) {
  const [isSuccessful, setIsSuccessful] = useState("fetching...");

  console.log(prop.reference);
  async function verifyPayment() {
    const response = await fetch(
      "https://clockaholic-store.vercel.app/api/verify_payment",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reference: prop.reference }),
      },
    );

    const res = await response.json();
    if (res.data.status === "success") {
      setIsSuccessful(true);
    } else {
      setIsSuccessful(false);
      console.log(res.data);
    }
  }

  useEffect(() => {
    console.log(prop.reference);
    verifyPayment();
  }, []);

  return (
    <>
      <div className="Details-Page position-relative d-flex flex-column  align-items-center ">
        <Navbar
          cart={[]}
          searchResults={prop.searchResults}
          setSearchResults={prop.setSearchResults}
        />

        <div
          className=" vh-100 position-relative "
          style={{ maxWidth: "1400px", width: "100% " }}
        >
          <div
            className="position-absolute top-50 start-50 w-100  d-flex justify-content-center"
            style={{
              transform: "translate(-50%,-50%)",
            }}
          >
            {isSuccessful === "fetching..." ? (
              <div
                id="loading"
                className="spinner-border status-loader loading mx-auto "
                role="status"
              ></div>
            ) : isSuccessful ? (
              // SUCCESSFUL
              <div>
                <div className="success-icon   d-flex align-items-center justify-content-center fs-3 mx-auto mb-4">
                  ✓
                </div>
                <h1 className="status-title text-center mb-4">
                  Order Confirmed!
                </h1>
                <p className="status-sub text-center   mx-auto px-sm-5 px-lg-0 ">
                  Thank you for your purchase. Your order has been received and
                  is being processed. You'll receive an email confirmation
                  shortly.
                </p>
              </div>
            ) : (
              // FAILED
              <div>
                <div className="  failed-icon  d-flex align-items-center justify-content-center fs-3 mx-auto mb-4">
                  ✕
                </div>
                <h1
                  className="status-title text-center mb-4"
                  style={{ color: "#991b1b" }}
                >
                  Payment Failed
                </h1>
                <p className="status-sub text-center   mx-auto px-sm-5 px-lg-0 ">
                  We were unable to process your payment. Your order has not
                  been placed and you have not been charged.
                </p>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default paymentStatus;
