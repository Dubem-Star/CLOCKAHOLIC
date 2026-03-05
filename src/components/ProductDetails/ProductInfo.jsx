import "@/assets/css/App2.css";
import "@/assets/css/App.css";
import { useParams } from "react-router-dom";
import viewIcon from "@/assets/images/img_icons/visibility.png";
import facebook from "@/assets/images/img_icons/share-facebook.png";
import twitter from "@/assets/images/img_icons/share-twitter.png";
import tiktok from "@/assets/images/img_icons/share-tiktok.png";
import linkedIn from "@/assets/images/img_icons/share-linkedin.png";
import instagram from "@/assets/images/img_icons/share-instagram.png";

import {
  newArrivedProducts,
  bestSellingProducts,
  onSaleProducts,
} from "../../data/products";

function ProductInfo() {
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
  return (
    <>
      <div className="product-features pt-1">
        <h4 className="">Features:</h4>
        <ul className="ps-0">
          <li>
            <strong>Brand:</strong> {brand}
          </li>

          {product.strap &&
            product.display &&
            product.dialColor &&
            product.dialShape &&
            product.strapColor && (
              <>
                <li>
                  <strong>Strap Color:</strong> {product.strapColor}
                </li>

                <li>
                  <strong>Strap Type:</strong> {product.strap}
                </li>

                <li>
                  <strong>Display type:</strong> {product.display}
                </li>

                <li>
                  <strong>Dial Color:</strong> {product.dialColor}
                </li>

                <li>
                  <strong>Dial Shape</strong> {product.dialShape}
                </li>
              </>
            )}

          <li>
            <strong>Gender:</strong> {product.gender}
          </li>
          <li>
            <strong>Category: </strong> {product.category}
          </li>
          <li>
            <strong>Status: </strong> {product.status}
          </li>
        </ul>

        {product.category === "Wrist Watch" && (
          <>
            <h4 className=" pt-3">Package Includes:</h4>
            <ul className="ps-0">
              <li>x1 Watch</li>
              <li>x1 Instruction Manual</li>
              <li>x1 Warranty Card</li>
              <li>x1 Watch Box</li>
            </ul>
          </>
        )}
      </div>

      <div className="pt-2 share d-flex align-item-center">
        <strong style={{ fontWeight: "500" }}>Share:</strong>
        <div className="d-flex gap-2 ">
          <img src={facebook} />
          <img src={instagram} />
          <img src={twitter} />
          <img src={tiktok} />
          <img src={linkedIn} />
        </div>
      </div>
    </>
  );
}

export default ProductInfo;
