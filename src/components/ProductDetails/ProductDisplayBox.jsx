import { useState, useRef, useEffect } from "react";
import "@/assets/css/App2.css";
import "@/assets/css/App.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import monkeyMeme from "@/assets/images/wallpapers/monkey_confused_meme.jpg";
import Navbar from "@/components/plugins/Navbar";
import Footer from "@/components/plugins/Footer";
import ProductButtons from "./Buttons";
import ProductInfo from "./ProductInfo";
import {
  newArrivedProducts,
  bestSellingProducts,
  onSaleProducts,
} from "@/data/products.jsx";

function ProductDisplayBox() {
  const { id } = useParams();
  const navigate = useNavigate();
  const bigArray = [
    ...newArrivedProducts,
    ...bestSellingProducts,
    ...onSaleProducts,
  ];
  const product = bigArray.find((product) => product.id === parseFloat(id));
  if (!product) {
    return (
      <>
        <Navbar />

        <img
          src={monkeyMeme}
          style={{
            margin: "170px auto 0 auto",
            display: "block",
            width: "clamp(200px, 60vw, 450px)",
            border: "1px solid black",
            opacity: "0.9",
          }}
          className="mb-5"
        />
        <h1
          style={{
            marginBottom: "35px",
            fontSize: "clamp(18px, 4vw, 40px)",
            fontFamily: '"Stack Sans Text", sans-serif',
            fontWeight: "300",
            color: "#646463",
          }}
          className="not-found-page text-center"
        >
          hmm... that product does not exist... yet!
        </h1>
        <Link
          to="/"
          style={{
            marginBottom: "100px",
            display: "block",
            color: "purple",
            fontFamily: '"Stack Sans Text", sans-serif',
            // fontSize: "clamp(20px, 3.8vw, 38px)",
            fontSize: "20px ",
          }}
          className="text-center not-found-page"
        >
          ⟵go back
        </Link>

        <Footer />
      </>
    );
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [currentImage, setImage] = useState(product.images[0]);
  const imgPreviewCont = useRef(null);

  const productImageContainer = useRef(null);
  const productImage = useRef(null);

  /* ********************Swap-Previews******************** */
  /* ********************Swap-Previews******************** */
  function swapImage(e) {
    const previews = imgPreviewCont.current.querySelectorAll(".img-preview ");
    for (let prev of previews) {
      prev.classList.remove("lay");
    }
    setImage(e.currentTarget.dataset.src);
    e.currentTarget.classList.add("lay");
  }
  /* ************************************************ */

  /* ********************DUBBY-ZOOM******************** */
  /* ********************DUBBY-ZOOM******************** */
  function imgContMousemove(e) {
    const wrapperPosition =
      productImageContainer.current.getBoundingClientRect();
    const x =
      ((e.clientX - wrapperPosition.left) / wrapperPosition.width) * 100;
    const y =
      ((e.clientY - wrapperPosition.top) / wrapperPosition.height) * 100;

    productImage.current.style.setProperty("--mouse-x", x + "%");
    productImage.current.style.setProperty("--mouse-y", y + "%");
  }

  function imgMouseover() {
    productImage.current.classList.add("zoom-in");
  }

  function imgMouseout() {
    productImage.current.classList.remove("zoom-in");
  }
  /* ************************************************ */

  {
    /* ********************THE DOM******************** */
    /* ********************THE DOM******************** */
  }

  return (
    <>
      <div
        className="w-100 "
        style={{
          margin: "115px auto 0 auto",
          paddingLeft: "130px",
          maxWidth: "1800px",
        }}
      >
        <Link
          onClick={() => navigate(-1)}
          style={{
            fontSize: "25px",
            fontWeight: "600",
            color: "#72716e",
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          🡨
        </Link>
      </div>

      <main className="flex-grow-1" style={{ marginTop: "15px" }}>
        <div
          className="product-container container-fluid  m-auto main-page-wrapper overflow-visible d-flex justify-content-center"
          style={{ width: "95%" }}
        >
          <div
            className="row d-flex justify-content-center "
            style={{ width: "95%" }}
          >
            {/* ********************Image Container******************** */}
            {/* ********************Image Container******************** */}
            <div className="col-6 d-flex flex-column align-items-center">
              <div className="d-flex flex-column gap-2 cunt align-items-center">
                <div
                  className="image-container d-flex justify-content-center"
                  ref={productImageContainer}
                  onMouseMove={imgContMousemove}
                >
                  <img
                    src={currentImage}
                    className="w-100 h-100"
                    ref={productImage}
                    style={{ transformOrigin: "var(--mouse-x) var(--mouse-y)" }}
                    onMouseEnter={imgMouseover}
                    onMouseLeave={imgMouseout}
                  />
                </div>

                <div
                  className="mini-img-preview d-flex gap-2 justify-content-center w-100 mt-3"
                  ref={imgPreviewCont}
                >
                  {product.images.map((img, index) => {
                    return (
                      <div
                        key={index}
                        className="img-preview border border-1 ratio ratio-1x1 w-25"
                        style={{
                          borderColor: "rgba(0, 0, 0, 0.116)",
                          position: "relative",
                          zIndex: "1",
                        }}
                        data-src={img}
                        onClick={swapImage}
                      >
                        <div className="overlay w-100 h-100 "></div>
                        <img src={img} className="w-100" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* ********************Description Container******************** */}
            {/* ********************Description Container******************** */}
            <div className="col-6 d-flex flex-column gap-3 justify-content-start ps-2 pe-4">
              <div>
                {/* ************brand name************ */}
                <p className="mb-0" style={{ color: "#72716e" }}>
                  {product.category === "Wrist Watch"
                    ? `${product.brandName} WATCHES`
                    : product.brandName}
                </p>
                {/* ************version************ */}
                <h1
                  style={{ fontSize: "clamp(28px,3vw,40px)" }}
                  className="fw-normal"
                >
                  {product.version}
                </h1>
              </div>
              <hr className="m-0" />
              {/* ************price************ */}
              <h2
                style={{ color: "#b8860b" }}
              >{`₦${product.price.toLocaleString()}`}</h2>

              {/* ************description************ */}
              <div className="description-box mt-2">
                {/* <h5 className="mb-2 ">Description:</h5> */}
                <p style={{ color: "#72716e", marginBottom: "13px" }}>
                  {product.description}{" "}
                </p>
              </div>

              <hr className="m-0" />
              <ProductButtons />
              <hr className="m-0" />
              <ProductInfo />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ProductDisplayBox;
