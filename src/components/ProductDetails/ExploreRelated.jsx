import { useParams, Link } from "react-router-dom";
import { ProductCardNav } from "@/components/plugins/ProductCardNav";
import { NewBadge, HotBadge } from "@/components/plugins/ProductCardBadges";
import { PaginationDots } from "@/components/plugins/NavigationButtons";
import LeftButton from "@/assets/icons/flaticons/left-arrow.svg?react";
import RightButton from "@/assets/icons/flaticons/right-arrow.svg?react";
import {
  bestSellingProducts,
  onSaleProducts,
  newArrivedProducts,
} from "../../data/products";
import { useState, useEffect, useRef } from "react";

function ExploreRelated() {
  const { id } = useParams();
  const allProducts = [
    ...bestSellingProducts,
    ...newArrivedProducts,
    ...onSaleProducts,
  ];

  const mainProduct = allProducts.find((product) => product.id == id);
  //Products by brand
  const productsByBrand = allProducts.filter(
    (product) => product.brandName === mainProduct.brandName,
  );
  //Products by strap
  const productsByStrap = allProducts.filter(
    (product) => product.strap === mainProduct.strap,
  );
  //Randomize all products
  // const randomProducts = [...allProducts].sort(() => Math.random() - 0.5);

  const combined = [...productsByBrand, ...productsByStrap, ...allProducts];
  //Filter current product
  const filterCurrent = combined.filter(
    (product) => product.id !== mainProduct.id,
  );
  //Filter duplicate products
  const filterDuplicates = Array.from(
    //Turns the 'new Map' logic to legit array
    new Map(filterCurrent.map((item) => [item.id, item])).values(), //An array of unique product values
  );
  const cleanRelatedProducts = filterDuplicates.slice(0, 12);

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {};
  }, [mainProduct]);

  const leftSlider = useRef(null);
  const rightSlider = useRef(null);
  const windowWrapper = useRef(null);
  const productContainer = useRef(null);

  const [cardSize, setCardSize] = useState(0);
  const [slideState, setSlideState] = useState(0);
  const [activeIndex, setActiveIndex] = useState(1);

  const slideStyle = {
    transform: `translateX(-${slideState}px)`,
    transition: `transform 1s ease-in-out`,
    width: `max-content`,
  };

  useEffect(() => {
    if (slideState === 0) {
      leftSlider.current.classList.add("fade");
    } else {
      leftSlider.current.classList.remove("fade");
    }

    const slideValue = windowWrapper.current.offsetWidth;
    const prodContWidth = productContainer.current.scrollWidth;
    if (slideState >= prodContWidth - slideValue) {
      rightSlider.current.classList.add("fade");
    } else {
      rightSlider.current.classList.remove("fade");
    }

    return () => {};
  }, [slideState, cleanRelatedProducts]);

  /* ***************CONSTRUCTION************** */
  /* ***************CONSTRUCTION************** */

  useEffect(() => {
    function handleResize() {
      const wrapperWidth = windowWrapper.current
        ? windowWrapper.current.offsetWidth
        : null;

      const width = window.innerWidth;
      const gap = 16;
      function getCardNumber() {
        if (width > 1200) return 4;
        if (width > 767) return 3;
        if (width > 0) return 2;
      }

      const calculatedWidth =
        (wrapperWidth - gap * (getCardNumber() - 1)) / getCardNumber();
      // const cardWidth = Math.floor(calculatedWidth);

      setSlideState((activeIndex - 1) * (wrapperWidth + 16));
      setCardSize(calculatedWidth);
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeIndex]);

  /* ***************TION ARROW FUNCTION************** */
  /* ***************NAVIGATION ARROW FUNCTION************** */
  function goRight() {
    if (windowWrapper.current && productContainer.current) {
      const slideValue = windowWrapper.current.offsetWidth;
      const prodContWidth = productContainer.current.offsetWidth;
      setSlideState((prev) =>
        prev >= prodContWidth - slideValue ? prev : prev + slideValue + 16,
      );
    }
    setActiveIndex((prev) => (prev < totalDots ? prev + 1 : totalDots));
  }

  function goLeft() {
    if (windowWrapper.current) {
      const slideValue = windowWrapper.current.offsetWidth;
      setSlideState((prev) => (prev > 0 ? prev - slideValue - 16 : 0));
    }
    setActiveIndex((prev) => (prev > 1 ? prev - 1 : 1));
  }
  /* ****************************************** */

  /* ********************DOT CLICK FUNCTION******************** */
  /* ********************DOT CLICK FUNCTION******************** */
  function dotHandler(index) {
    if (windowWrapper.current) {
      const slideValue = windowWrapper.current.offsetWidth;
      const gap = 16;
      const newSlideState = (index - 1) * (slideValue + gap);
      setSlideState(newSlideState);
      setActiveIndex(index);
    }
  }
  /* ****************************************** */

  /* ****************************CONSTRUCTION*************************** */
  /* ****************************CONSTRUCTION*************************** */

  const NumOfProducts = cleanRelatedProducts.length;
  const itemsPerWidth =
    window.innerWidth > 1200 ? 4 : window.innerWidth > 767 ? 3 : 2;
  const totalDots = Math.ceil(NumOfProducts / itemsPerWidth);

  /* ********************THE DOM******************** */
  /* ********************THE DOM******************** */
  return (
    <>
      <div
        className="display-container d-flex flex-column align-items-center gap-4 overflow-x-hidden explore-related-container position-relative w-100 h-auto"
        data-aos="fade-up"
        data-aos-delay="100"
        style={{ marginTop: "150px" }}
      >
        <div className="middle-liner " style={{ maxWidth: "1200px" }}>
          <h1 className="middle-title">Explore Related Items</h1>
        </div>
        <div
          className="window-wrapper overflow-x-hidden "
          style={{
            width: "95%",
            maxWidth: "1240px",
          }}
          ref={windowWrapper}
        >
          <div
            className="products-container d-flex gap-3   flex-nowrap  "
            style={slideStyle}
            ref={productContainer}
          >
            {cleanRelatedProducts.map((product, index) => {
              const truncated =
                product.version.length >= 30
                  ? product.version.slice(0, 30) + "..."
                  : product.version;

              return (
                <Link
                  to={`/product/${product.id}`}
                  className="atag text-reset "
                  style={{ width: `${cardSize}px`, boxSizing: "border-box" }}
                  key={index}
                >
                  <div className="product-grid">
                    <div className="product-img-cont">
                      <img
                        src={product.images[0]}
                        className=" fake"
                        alt={`${product.brandName}_image`}
                      />
                      <img
                        src={product.images[0]}
                        className="product-img one"
                        alt={`${product.brandName}_image`}
                      />
                      <img
                        src={product.images[1]}
                        className="product-img two"
                        alt={`${product.brandName}_image`}
                      />

                      <div>{product.badge === "Hot" ? <HotBadge /> : null}</div>

                      <ProductCardNav />
                    </div>
                    {/* ↑↑ .product-img-cont end */}

                    <div className="product-info">
                      <h2 className="brand-name">{product.brandName}</h2>
                      <p
                        className="version"
                        style={{ color: "#72716e", fontWeight: "400" }}
                      >
                        {truncated}
                      </p>
                      <p className="price">₦{product.price.toLocaleString()}</p>
                    </div>
                  </div>
                  {/* </a> */}
                </Link>
              );
              {
                /* ↑↑ .products-card end */
              }
            })}
          </div>
          {/* ***************NAVIGATION ARROW************** */}
          {/* ***************NAVIGATION ARROW************** */}
          <LeftButton
            className="general-slide-btn position-absolute top-50 opacity-0 left-btn"
            style={{
              left: "10px",
            }}
            ref={leftSlider}
            onClick={goLeft}
          />
          <RightButton
            className="general-slide-btn position-absolute top-50 opacity-0 right-btn"
            style={{
              right: "10px",
            }}
            ref={rightSlider}
            onClick={goRight}
          />
        </div>
        {/* ****************************************** */}

        {/* ***************PAGINATION DOTS************** */}
        <div style={{ marginTop: "-40px" }}>
          <PaginationDots
            dotHandler={dotHandler}
            activeIndex={activeIndex}
            totalDots={totalDots}
          />
        </div>

        {/* ****************************************** */}
      </div>
    </>
  );
}

export default ExploreRelated;
