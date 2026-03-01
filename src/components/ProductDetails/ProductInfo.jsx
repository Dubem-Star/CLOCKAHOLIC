import "@/assets/css/App2.css";
import "@/assets/css/App.css";
import { useParams } from "react-router-dom";
import viewIcon from "@/assets/images/img_icons/visibility.png";
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
  return (
    <>
      <p className="d-flex align-items-center gap-1 pt-1">
        <img
          className=" me-1 "
          style={{
            width: "27px",
            aspectRatio: "1/1",
            borderRadius: "50%",
            border: "1px solid #b8860b",
            padding: "3px",
          }}
          src={viewIcon}
        />{" "}
        <strong>{product.id}</strong> {space}
        <span className="ps-1" style={{ color: "#72716e" }}>
          customers are currently viewing this product
        </span>{" "}
      </p>

      <div className="product-features">
        <h4 className="fs-5">Features:</h4>
        <ul className="ps-0">
          <li>Strap type: {product.strap}</li>
          <li>Gender: {product.gender}</li>
          <li> Brand: {product.brandName}</li>
          <li>Status: {product.status}</li>
        </ul>

        <h4 className="fs-5 pt-3">Package Includes:</h4>
        <ul className="ps-0">
          <li>A Watch</li>
          <li>Instruction Manual</li>
          <li>Warranty Card</li>
          <li>A Beautiful Watch Box</li>
        </ul>
      </div>
    </>
  );
}

export default ProductInfo;
