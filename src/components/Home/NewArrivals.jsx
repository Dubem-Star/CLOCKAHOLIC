import { ViewMore } from "@/components/plugins/btns/NavigationButtons";
import { ProductCardNav } from "@/components/plugins/productCard/ProductCardNav";
import {
  NewBadge,
  HotBadge,
} from "@/components/plugins/productCard/ProductCardBadges";
import { Link, useNavigate } from "react-router-dom";
import { SkeletonLayout } from "../plugins/SkeletonLayout";
import { useState, useEffect, useRef } from "react";

function NewArrivals(prop) {
  const [products, setProducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const navigate = useNavigate();
  const men = useRef(null);
  const women = useRef(null);

  function handleCardClick(e, id) {
    if (e.target.classList.contains("product-nav")) {
      return;
    }
    navigate(`/product/${id}`);
  }

  useEffect(() => {
    if (prop.newlyArrived.length) {
      if (localStorage.getItem("genderClicked") === "male") {
        setProducts(prop.newlyArrived);
        men.current.classList.add("default");
      } else if (localStorage.getItem("genderClicked") === "female") {
        setProducts(prop.newlyArrivedFemale);
        women.current.classList.add("default");
      } else {
        setProducts(prop.newlyArrived);
        men.current.classList.add("default");
      }
      setisLoading(false);
    }
  }, [prop.newlyArrived]);

  return (
    <>
      <div
        className="display-container d-flex flex-column align-items-center"
        data-aos="fade-up"
        data-aos-delay="200"
        id="newArrivalsSection"
        style={{ scrollMarginTop: "150px" }}
      >
        <div className="middle-liner">
          <h1 className="middle-title">New Arrivals</h1>
        </div>

        <div className="gender-option-container">
          <h1 className="d-flex justify-content-center gap-5 mt-3">
            <span
              ref={men}
              className="underline"
              onClick={(e) => {
                setProducts(prop.newlyArrived);
                e.currentTarget.classList.add("default");
                localStorage.setItem("genderClicked", "male");
                e.currentTarget.nextElementSibling.classList.remove("default");
              }}
            >
              MEN'S
            </span>
            <span
              ref={women}
              className="underline"
              onClick={(e) => {
                setProducts(prop.newlyArrivedFemale);
                e.currentTarget.classList.add("default");
                localStorage.setItem("genderClicked", "female");
                e.currentTarget.previousElementSibling.classList.remove(
                  "default",
                );
              }}
            >
              WOMEN'S
            </span>
          </h1>
        </div>

        {isLoading ? (
          <SkeletonLayout />
        ) : (
          <div className="products-container row gy-4 justify-content-center ">
                     {" "}
            {products.map((product, index) => {
              const truncated =
                product.version.length >= 30
                  ? product.version.slice(0, 30) + "..."
                  : product.version;

              return (
                <div
                  onClick={(e) => handleCardClick(e, product.id)}
                  className="atag  text-reset col-6 col-xl-3 col-lg-4 col-md-6 col-sm-6"
                  key={index}
                >
                                 {" "}
                  <div className="product-grid">
                                     {" "}
                    <div className="product-img-cont">
                                         {" "}
                      <img
                        src={product.images[0]}
                        className=" fake"
                        alt={`${product.brandName}_image`}
                      />
                                         {" "}
                      <img
                        src={product.images[0]}
                        className="product-img one"
                        alt={`${product.brandName}_image`}
                      />
                                         {" "}
                      <img
                        src={product.images[1]}
                        className="product-img two"
                        alt={`${product.brandName}_image`}
                      />
                      <div className="d-none">
                        <a
                          href={product.images[0]}
                          className="glightbox"
                          data-gallery={`gallery${product.id}`}
                        ></a>
                        <a
                          href={product.images[1]}
                          className="glightbox"
                          data-gallery={`gallery${product.id}`}
                        ></a>
                      </div>
                                         {" "}
                      <div>
                        {product.badge === "Hot" ? (
                          <HotBadge />
                        ) : product.badge === "New" ? (
                          <NewBadge />
                        ) : null}
                      </div>
                                         {" "}
                      <ProductCardNav
                        product={product}
                        atcHomePage={prop.atcHomePage}
                      />
                                       {" "}
                    </div>
                                      {/* ↑↑ .product-img-cont end */}         
                           {" "}
                    <div className="product-info">
                                         {" "}
                      <h2 className="brand-name">{product.brandName}</h2>       
                                 {" "}
                      <p
                        className="version"
                        style={{ color: "#72716e", fontWeight: "400" }}
                      >
                                              {truncated}                 
                         {" "}
                      </p>
                                         {" "}
                      <p className="price">₦{product.price.toLocaleString()}</p>
                                       {" "}
                    </div>
                                   {" "}
                  </div>
                                  {/* </a> */}             {" "}
                </div>
              );
              {
                /* ↑↑ .products-card end */
              }
            })}
                   {" "}
          </div>
        )}

        {/* ↑↑ .products-container end */}
        <ViewMore />
      </div>
      {/* ↑↑ .NewArrivals-container end */}
    </>
  );
}

export default NewArrivals;
