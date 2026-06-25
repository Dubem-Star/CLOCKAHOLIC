import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
function Legals(prop) {
  const legalContainerRef = useRef(null);
  const sidebarVariants = {
    open: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
      transform: "translate(-50%, -50%)",
    },
    closed: {
      opacity: 0,
      scale: 0.5,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  useEffect(() => {
    if (prop.isShowLegal) {
      prop.setDarken(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [prop.isShowLegal]);

  useEffect(() => {
    if (legalContainerRef.current) {
      legalContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [
    prop.isShowLegal,
    prop.termsOfService,
    prop.privacyPolicy,
    prop.returnPolicy,
  ]);

  return (
    <AnimatePresence>
      {prop.isShowLegal && (
        <motion.div
          initial="closed"
          animate="open"
          variants={sidebarVariants}
          ref={legalContainerRef}
          className="bg-white position-fixed  border  p-4 p-md-5  rounded-3"
          style={{
            zIndex: "9999",
            top: "50%",
            left: "50%",
            maxHeight: "90vh",
            overflowY: "auto",
            maxWidth: "700px",
            width: "90%",
          }}
        >
          <button
            onClick={() => {
              prop.setIsShowLegal(false);
              prop.setDarken(false);
              prop.setTermsOfService(false);
              prop.setPrivacyPolicy(false);
              prop.setReturnPolicy(false);
            }}
            className=" btn mb-3 legal-close-btn p-0  position-sticky fw-light fs-1 bg-white"
            style={{
              top: "5px",
              zIndex: "10000",
              left: "100%",
              lineHeight: "0.5",
            }}
          >
            &times;
          </button>

          {prop.termsOfService ? (
            <>
              <h2 className=" fs-3 " style={{ marginBottom: "28px" }}>
                <strong>Terms of service</strong>
              </h2>
              <h2 className=" fs-5 mt-2">
                <strong>1. Introduction</strong>
              </h2>
              <p className=" fs-15" style={{ lineHeight: "2" }}>
                Welcome to Clockaholic. By accessing our website and making a
                purchase, you agree to comply with and be bound by the following
                terms and conditions. Please review these terms carefully. If
                you do not agree to these terms, please do not use our site or
                make a purchase from us.
              </p>
              <h2 className="fs-5  mt-5 mb-3">
                <strong>2. Use of the Website</strong>
              </h2>
              <ul
                className="ps-2 fs-15 d-flex flex-column gap-3"
                style={{ listStyleType: "none" }}
              >
                <li style={{ lineHeight: "2" }}>
                  <strong>Eligibility:</strong> By using our site, you represent
                  that you are at least 18 years old and have the legal capacity
                  to enter into a contract.
                </li>
                <li style={{ lineHeight: "2" }}>
                  <strong>Account Responsibility:</strong> You are responsible
                  for maintaining the confidentiality of your account
                  information and for all activities that occur under your
                  account.
                </li>

                <li style={{ lineHeight: "2" }}>
                  <strong>Prohibited Uses:</strong> You may not use the website
                  for any unlawful purpose or to transmit any content that is
                  harmful, offensive, or otherwise objectionable.
                </li>
              </ul>

              <h2 className="fs-5  mt-5 mb-3">
                <strong>3. Privacy</strong>
              </h2>
              <p className="fs-15" style={{ lineHeight: "2" }}>
                Your use of our website is also governed by our Privacy Policy.
                Please review our{" "}
                <a
                  href="#"
                  className="text-decoration-underline"
                  onClick={(e) => {
                    e.preventDefault();
                    prop.setPrivacyPolicy(true);
                    prop.setTermsOfService(false);
                    prop.setReturnPolicy(false);
                  }}
                >
                  Privacy Policy
                </a>{" "}
                to understand our practices.
              </p>
              <h2 className="fs-5  mt-5 mb-3">
                <strong>4. Product Information</strong>
              </h2>
              <p className="fs-15" style={{ lineHeight: "2" }}>
                We strive to provide accurate product descriptions and images.
                However, we do not warrant that product descriptions or other
                content on this site are accurate, complete, reliable, current,
                or error-free.
              </p>

              <h2 className="fs-5  mt-5 mb-3">
                <strong>5. Limitation of Liability</strong>
              </h2>
              <p className="fs-15" style={{ lineHeight: "2" }}>
                In no event shall we be liable for any indirect, incidental,
                special, consequential or punitive damages, including without
                limitation, loss of profits, data, use, goodwill, or other
                intangible losses, resulting from your access to or use of or
                inability to access or use the website.
              </p>

              <h2 className="fs-5  mt-5 mb-3">
                <strong>6. Orders and Payment</strong>
              </h2>

              <ul className="list-unstyled d-flex flex-column gap-3">
                {" "}
                <li className="fs-15" style={{ lineHeight: "2" }}>
                  <strong>Order Acceptance:</strong> We reserve the right to
                  refuse or cancel any order for any reason, including but not
                  limited to product unavailability or errors in pricing.
                </li>
                <li className="fs-15" style={{ lineHeight: "2" }}>
                  <strong>Payment:</strong> We accept various payment methods.
                  By providing payment information, you represent and warrant
                  that you are authorized to use the payment method and that you
                  authorize us to charge your order.
                </li>
              </ul>
              <h2 className="fs-5  mt-5 mb-3">
                <strong>7. Governing Law</strong>
              </h2>
              <p className="fs-15" style={{ lineHeight: "2" }}>
                These terms and conditions are governed by and construed in
                accordance with the laws of Lagos, Nigeria, without regard to
                its conflict of law principles.
              </p>

              <h2 className="fs-5  mt-5 mb-3">
                <strong>8. Changes to Terms</strong>
              </h2>
              <p className="fs-15" style={{ lineHeight: "2" }}>
                We may update our terms and conditions from time to time. We
                will notify you of any changes by posting the new terms and
                conditions on this page.
              </p>

              <h2 className="fs-5  mt-5 mb-3">
                <strong>9. Indemnification</strong>
              </h2>
              <p className="fs-15" style={{ lineHeight: "2" }}>
                You agree to indemnify, defend, and hold harmless Clockaholic,
                its affiliates, officers, agents, and employees from any claim
                or demand, including reasonable attorneys’ fees, made by any
                third party due to or arising out of your use of our service,
                your violation of these terms, or your violation of any rights
                of another.
              </p>

              <h2 className="fs-5  mt-5 mb-3">
                <strong>10. Returns and Refunds</strong>
              </h2>
              <p className="fs-15" style={{ lineHeight: "2" }}>
                Our Refund and Returns Policy outlines the terms and conditions
                under which you may return products purchased from us and how
                refunds are processed. Please refer to our{" "}
                <a
                  href="#"
                  className="text-decoration-underline"
                  onClick={(e) => {
                    e.preventDefault();
                    prop.setPrivacyPolicy(false);
                    prop.setTermsOfService(false);
                    prop.setReturnPolicy(true);
                  }}
                >
                  Refund and Returns Policy
                </a>{" "}
                for further information.
              </p>

              <h2 className="fs-5  mt-5 mb-3">
                <strong>11. Shipping and Delivery</strong>
              </h2>

              <p className="fs-15" style={{ lineHeight: "2" }}>
                Our Shipping Policy provides details on shipping methods, costs,
                and estimated delivery times. Please refer to our{" "}
                <a
                  href="#"
                  className="text-decoration-underline"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Shipping Policy
                </a>{" "}
                page for further information.
              </p>

              <h2 className="fs-5  mt-5 mb-3">
                <strong>12. Contact Us</strong>
              </h2>
              <p className="fs-15" style={{ lineHeight: "2" }}>
                If you have any questions about these Terms of Service, please
                contact us at{" "}
              </p>
              <p>
                <a href="mailto:info@yourcompany.com">
                  clockaholic@yourcompany.com
                </a>
              </p>

              <p>
                Thank you for choosing Clockaholic. We look forward to serving
                you.
              </p>
            </>
          ) : prop.privacyPolicy ? (
            <>
              <>
                <h2 className="fs-3" style={{ marginBottom: "28px" }}>
                  <strong>Privacy Policy</strong>
                </h2>

                <p className="fs-15" style={{ lineHeight: "2" }}>
                  At Clockaholic, we are committed to protecting your privacy.
                  This policy explains how we collect, use, and safeguard your
                  personal information when you visit our website or make a
                  purchase.
                </p>

                <h2 className="fs-5 mt-5 mb-3">
                  <strong>1. Information Collection</strong>
                </h2>
                <p className="fs-15" style={{ lineHeight: "2" }}>
                  We collect information you provide directly to us, such as
                  your name, email address, shipping address, and payment
                  information when you place an order. We also automatically
                  collect certain technical information about your device and
                  browsing patterns.
                </p>

                <h2 className="fs-5 mt-5 mb-3">
                  <strong>2. Use of Information</strong>
                </h2>
                <p className="fs-15" style={{ lineHeight: "2" }}>
                  Your information is used to process your orders, improve your
                  shopping experience, communicate with you regarding your
                  account or orders, and for marketing purposes if you have
                  opted in.
                </p>

                <h2 className="fs-5 mt-5 mb-3">
                  <strong>3. Data Protection</strong>
                </h2>
                <p className="fs-15" style={{ lineHeight: "2" }}>
                  We implement industry-standard security measures to protect
                  your personal data from unauthorized access, alteration, or
                  disclosure.
                </p>

                <h2 className="fs-5 mt-5 mb-3">
                  <strong>4. Cookies</strong>
                </h2>
                <p className="fs-15" style={{ lineHeight: "2" }}>
                  Our website uses "cookies" to enhance your browsing
                  experience. You can choose to disable cookies in your browser
                  settings, though this may impact your ability to use certain
                  features on our site.
                </p>

                <h2 className="fs-5 mt-5 mb-3">
                  <strong>5. Contact Us</strong>
                </h2>
                <p className="fs-15" style={{ lineHeight: "2" }}>
                  If you have any questions or concerns regarding our Privacy
                  Policy, please contact us at:
                  <br />
                  <a href="mailto:clockaholic@yourcompany.com">
                    clockaholic@yourcompany.com
                  </a>
                </p>

                <button
                  className="btn btn-link p-0 mt-4"
                  onClick={() => {
                    prop.setPrivacyPolicy(false);
                    prop.setTermsOfService(true);
                  }}
                >
                  Terms of Service
                </button>
              </>
            </>
          ) : prop.returnPolicy ? (
            <>
              <>
                <h2 className="fs-3" style={{ marginBottom: "28px" }}>
                  <strong>Refund and Returns Policy</strong>
                </h2>

                <h2 className="fs-5 mt-2">
                  <strong>1. Eligibility for Returns</strong>
                </h2>
                <p className="fs-15" style={{ lineHeight: "2" }}>
                  We want you to be satisfied with your Clockaholic purchase.
                  You may return most items in their original condition within
                  14 days of delivery. The item must be unused, in the same
                  condition that you received it, and in its original packaging.
                </p>

                <h2 className="fs-5 mt-5 mb-3">
                  <strong>2. Refund Process</strong>
                </h2>
                <p className="fs-15" style={{ lineHeight: "2" }}>
                  Once your return is received and inspected, we will notify you
                  of the approval or rejection of your refund. If approved, your
                  refund will be processed, and a credit will automatically be
                  applied to your original method of payment within 5-10
                  business days.
                </p>

                <h2 className="fs-5 mt-5 mb-3">
                  <strong>3. Non-Returnable Items</strong>
                </h2>
                <ul
                  className="ps-2 fs-15 d-flex flex-column gap-3"
                  style={{ listStyleType: "none" }}
                >
                  <li style={{ lineHeight: "2" }}>Gift cards.</li>
                  <li style={{ lineHeight: "2" }}>
                    Items that have been worn, damaged, or altered by the
                    customer.
                  </li>
                  <li style={{ lineHeight: "2" }}>
                    Personalized or customized items.
                  </li>
                </ul>

                <h2 className="fs-5 mt-5 mb-3">
                  <strong>4. Shipping Returns</strong>
                </h2>
                <p className="fs-15" style={{ lineHeight: "2" }}>
                  You will be responsible for paying for your own shipping costs
                  for returning your item. Shipping costs are non-refundable. If
                  you receive a refund, the cost of return shipping will be
                  deducted from your refund.
                </p>

                <h2 className="fs-5 mt-5 mb-3">
                  <strong>5. Damaged or Incorrect Items</strong>
                </h2>
                <p className="fs-15" style={{ lineHeight: "2" }}>
                  If you received a damaged or incorrect item, please contact us
                  immediately so we can evaluate the issue and make it right.
                </p>

                <p className="fs-15 mt-4">
                  For further assistance, reach out to us at:
                  <br />
                  <a href="mailto:clockaholic@yourcompany.com">
                    clockaholic@yourcompany.com
                  </a>
                </p>

                <button
                  className="btn btn-link p-0 mt-4"
                  onClick={() => {
                    prop.setPrivacyPolicy(false);
                    prop.setTermsOfService(true);
                  }}
                >
                  Terms of Service
                </button>
              </>
            </>
          ) : null}

          {/* <p className="fs-6 p-2" > */}

          {/* </p> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Legals;
