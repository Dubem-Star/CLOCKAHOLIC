import { useState, useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import monkeyMeme from "@/assets/images/wallpapers/monkey_confused_meme.jpg";
import PageLocation from "../plugins/btns/PageLocation";
import Navbar from "@/components/plugins/Navbar";
import Footer from "@/components/plugins/Footer";
import ProductButtons from "./Buttons";
import ProductInfo from "./ProductInfo";
import ExploreRelated from "@/components/ProductDetails/ExploreRelated";

function ProductDisplayBox(prop) {
  const { id } = useParams();
  const [currentImage, setImage] = useState(null);
  const imgPreviewCont = useRef(null);
  const productImageContainer = useRef(null);
  const productImage = useRef(null);
  const [products, setProducts] = useState([]);

  const product = products.find((product) => product.id == id);

  useEffect(() => {
    window.scrollTo(0, 0);
    prop.activatePopup(false);
  }, []);

  useEffect(() => {
    if (product) {
      setImage(product.images[0]);
    }
    if (imgPreviewCont.current) {
      const previews = imgPreviewCont.current.querySelectorAll(".img-preview ");
      for (let prev of previews) {
        prev.classList.remove("lay");
      }
    }

    return () => {};
  }, [product]);

  useEffect(() => {
    setProducts(prop.products);
  }, [prop.products]);

  if (!products.length)
    return (
      <div
        className=" mx-auto "
        style={{ marginTop: "150px", width: "fit-content" }}
      >
        <div
          className={`spinner-border text-black  `}
          role="status"
          style={{
            width: "20px",
            height: "20px",
          }}
        ></div>
      </div>
    );

  if (!product) {
    return (
      <>
        <img
          src={monkeyMeme}
          style={{
            margin: "100px auto 0 auto",
            display: "block",
            width: "clamp(200px, 60vw, 450px)",
            border: "1px solid black",
            opacity: "0.9",
          }}
          className="mb-5"
        />
        <h1
          style={{
            marginBottom: "25px",
            fontSize: "clamp(18px, 4vw, 25px)",
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
      </>
    );
  }

  /* ************************************************ */

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

  function handleImgContPointerOver(e) {
    if (e.pointerType === "mouse") {
      imgContMousemove(e);
    }
  }

  function handlePointerEnter(e) {
    if (e.pointerType === "mouse") {
      imgMouseover(e);
    }
  }

  function handlePointerLeave(e) {
    if (e.pointerType === "mouse") {
      imgMouseout(e);
    }
  }

  {
    /* ********************THE DOM******************** */
    /* ********************THE DOM******************** */
  }

  return (
    <>
      <PageLocation location={"product"} />

      <main className="flex-grow-1" style={{ marginTop: "15px" }}>
        <div
          className="product-container container-fluid  m-auto main-page-wrapper overflow-visible d-flex flex-column justify-content-center"
          style={{ width: "95%" }}
        >
          <div
            className="row d-flex justify-content-center gap-5 gap-md-0 "
            style={{ width: "95%" }}
          >
            {/* ********************Image Container******************** */}
            {/* ********************Image Container******************** */}
            <div className="col-md-6 col-lg-6 col-xl-6 d-flex flex-column align-items-center ">
              <div className="d-flex flex-column gap-2 cunt align-items-center">
                <div
                  className="image-container d-flex justify-content-center"
                  ref={productImageContainer}
                  onPointerMove={handleImgContPointerOver}
                >
                  <img
                    src={currentImage}
                    className="w-100 h-100"
                    ref={productImage}
                    style={{ transformOrigin: "var(--mouse-x) var(--mouse-y)" }}
                    onPointerEnter={handlePointerEnter}
                    onPointerLeave={handlePointerLeave}
                  />
                </div>

                <div
                  className="mini-img-preview d-flex gap-2 justify-content-center w-100 mt-3 mb-3"
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
            <div className="col-md-6 col-lg-6 col-xl-6 d-flex flex-column gap-3 justify-content-start ps-xl-2 pe-xl-4 ps-md-3 ps-0 pe-0 description-cont">
              <div>
                {/* ************brand name************ */}
                <p className="mb-0 brand-name" style={{ color: "#72716e" }}>
                  {product.category === "Wrist Watch"
                    ? `${product.brandName} WATCHES `
                    : product.brandName}
                </p>
                {/* ************version************ */}

                <h1
                  style={{ fontSize: "clamp(25px,3vw,40px)" }}
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
                <p
                  style={{
                    color: "#72716e",
                    marginBottom: "13px",
                    fontSize: "16px",
                    lineHeight: "2",
                  }}
                >
                  {product.description}
                </p>
              </div>

              <hr className="m-0" />
              <ProductButtons
                setAppCart={prop.setAppCart}
                cart={prop.cart}
                activatePopup={prop.activatePopup}
                popup={prop.popup}
                setId={prop.setId}
                atcDetailsPage={prop.atcDetailsPage}
                setProdQty={prop.setProdQty}
              />
              <hr className="m-0" />
              <ProductInfo />
            </div>
          </div>

          <ExploreRelated
            atcHomePage={prop.atcHomePage}
            products={prop.products}
          />
        </div>
      </main>
    </>
  );
}

export default ProductDisplayBox;
