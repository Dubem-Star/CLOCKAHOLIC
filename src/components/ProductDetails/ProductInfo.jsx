import { useParams, useNavigate } from "react-router-dom";
import { useRef } from "react";
import viewIcon from "@/assets/images/img_icons/visibility.png";
import facebook from "@/assets/images/img_icons/share-facebook.png";
import twitter from "@/assets/images/img_icons/share-twitter.png";
import tiktok from "@/assets/images/img_icons/share-tiktok.png";
import linkedIn from "@/assets/images/img_icons/share-linkedin.png";
import whatsapp from "@/assets/images/img_icons/share-whatsapp.png";
import copy from "@/assets/images/img_icons/copy.png";
import delivery from "@/assets/images/img_icons/express-delivery.png";
import {
  newArrivedProducts,
  bestSellingProducts,
  onSaleProducts,
} from "../../data/products";

function ProductInfo() {
  /* ********************Assignments/Definitions******************** */
  /* ********************Assignments/Definitions******************** */
  const { id } = useParams();
  const allProducts = [
    ...newArrivedProducts,
    ...bestSellingProducts,
    ...onSaleProducts,
  ];
  const space = "    ";
  const product = allProducts.find((product) => product.id === parseFloat(id));
  const brand =
    product.brandName.slice(0, 1) + product.brandName.slice(1).toLowerCase();
  const copiedNotif = useRef(null);
  const navigate = useNavigate();

  const text = `Check out this ${product.brandName} watch from Clockaholic!`;
  const url = window.location.href;
  const shareApi = `Check out this ${product.brandName} watch from Clockaholic! on ${url}`;

  const encodedMessage = encodeURIComponent(text);
  const encodedURL = encodeURIComponent(url);
  const encodedApi = encodeURIComponent(shareApi);
  /* *************************************************** */

  /* ********************Web Share API Logic******************** */
  /* ********************Web Share API Logic******************** */

  const shareData = {
    whatsapp: `https://wa.me/?text=${encodedMessage + " " + encodedURL}`,
    X: `https://twitter.com/intent/tweet?url=${encodedURL}&text=${encodedMessage}`,
    linkedIn: `https://www.linkedin.com/sharing/share-offsite/?text=${encodedApi}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`,
  };
  /* *************************************************** */

  async function copyProduct() {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareApi);
      copiedNotif.current.classList.add("show");
      console.log("hi");
      setTimeout(() => {
        copiedNotif.current.classList.remove("show");
      }, 2000);
    }
  }
  return (
    <>
      <span
        className="fixed-bottom text-light rounded-2 p-2 w-25 notif invisible"
        ref={copiedNotif}
        style={{
          backgroundColor: "#b8860b",
          transition: "opacity 0.1s ease-in-out, visibility 0.1s ease-in-out",
          opacity: "0",
        }}
      >
        Copied to Clipboard!
      </span>

      <div className="product-features pt-1">
        <h4 className="">Features:</h4>
        <ul className="ps-0">
          <li className="list-style">
            <strong>Brand:</strong> {brand}
          </li>

          {product.strap &&
            product.display &&
            product.dialColor &&
            product.dialShape &&
            product.strapColor && (
              <>
                <li className="list-style">
                  <strong>Strap Color:</strong> {product.strapColor}
                </li>

                <li className="list-style">
                  <strong>Strap Type:</strong> {product.strap}
                </li>

                <li className="list-style">
                  <strong>Display type:</strong> {product.display}
                </li>

                <li className="list-style">
                  <strong>Dial Color:</strong> {product.dialColor}
                </li>

                <li className="list-style">
                  <strong>Dial Shape</strong> {product.dialShape}
                </li>
              </>
            )}

          <li className="list-style">
            <strong>Gender:</strong> {product.gender}
          </li>
          <li className="list-style">
            <strong>Category: </strong> {product.category}
          </li>
          <li className="list-style">
            <strong>Status: </strong> {product.status}
          </li>
        </ul>

        {product.category === "Wrist Watch" && (
          <>
            <h4 className=" pt-3">Package Includes:</h4>
            <ul className="ps-0">
              <li className="d-flex align-items-flex-start share list-style">
                <span className="text-black fs-3" style={{ lineHeight: "0.8" }}>
                  &#8226;
                </span>
                <span>A Watch</span>{" "}
              </li>
              <li className="d-flex align-items-flex-start share list-style">
                <span className="text-black fs-3" style={{ lineHeight: "0.8" }}>
                  &#8226;
                </span>
                <span> An Instruction Manual</span>
              </li>
              <li className="d-flex align-items-flex-start share list-style">
                <span className="text-black fs-3" style={{ lineHeight: "0.8" }}>
                  &#8226;
                </span>{" "}
                <span>A Warranty Card</span>
              </li>
              <li className="d-flex align-items-flex-start share list-style">
                <span className="text-black fs-3" style={{ lineHeight: "0.8" }}>
                  &#8226;
                </span>
                <span>A Watch Box</span>
              </li>
            </ul>
          </>
        )}
      </div>

      <hr className="m-0" />

      {/* <img className=" me-1 rounded-circle cool-icon " src={delivery} style={{ width: "79%", height: "79%" }} /> */}
      <div className="shipping">
        <div className="d-flex gap-2 align-items-center">
          <div className="  rounded-circle cool-icon d-flex justify-content-center align-items-center ">
            <img src={delivery} style={{ width: "90%", height: "90%" }} />
          </div>

          <h4 style={{ fontSize: "17px" }} className="m-0">
            Shipping:
          </h4>
        </div>

        <ul className="mt-3 p-0">
          <li className="d-flex align-items-flex-start share list-style">
            <span
              className="text-black fs-3 align-self-flex-start"
              style={{ lineHeight: "1" }}
            >
              &#8226;
            </span>
            <span> Orders within Lagos will be delivered within 24 hours.</span>
          </li>
          <li className="d-flex align-items-flex-start share list-style">
            <span className="text-black fs-3" style={{ lineHeight: "1" }}>
              &#8226;
            </span>
            <span> Orders outside Lagos are delivered within 48-96 hours.</span>
          </li>
        </ul>
      </div>

      <hr className="m-0" />

      {/* ************Share Product code************ */}
      {/* ************Share Product code************ */}
      <div className="pt-2 share d-flex align-items-center">
        <strong style={{ fontWeight: "500" }}>Share:</strong>
        <div className="d-flex gap-2 ">
          <img
            src={facebook}
            onClick={() => window.open(shareData.facebook)}
            title="share to facebook"
          />
          <img
            src={whatsapp}
            onClick={() => window.open(shareData.whatsapp)}
            title="share to whatsapp"
          />
          <img
            src={twitter}
            onClick={() => window.open(shareData.X)}
            title="share to X"
          />

          <img
            src={linkedIn}
            onClick={() => window.open(shareData.linkedIn)}
            title="share to linkedIn"
          />
        </div>

        <img
          src={copy}
          className="ms-1 copy-button p-1 "
          title="copy product"
          onClick={() => copyProduct()}
        />
      </div>
    </>
  );
}

export default ProductInfo;
