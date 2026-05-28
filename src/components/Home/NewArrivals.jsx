import { ViewMore } from "@/components/plugins/btns/NavigationButtons";
import { ProductCardNav } from "@/components/plugins/productCard/ProductCardNav";
import {
  NewBadge,
  HotBadge,
} from "@/components/plugins/productCard/ProductCardBadges";
import { Link } from "react-router-dom";
import { SkeletonLayout } from "../plugins/SkeletonLayout";
import { useState, useEffect } from "react";

function NewArrivals(prop) {
  const [products, setProducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    if (products.length) {
      setisLoading(false);
      return;
    }

    async function getProducts() {
      const response = await fetch("http://localhost:3000/getProducts", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "Get me the newly arrived products" }),
      });
      const data = await response.json();
      if (data.status) {
        setProducts(data.data);

        setisLoading(false);
      } else {
        console.log(`Error, failed fetching products: ${data.message}`);
      }
    }

    getProducts();
  }, []);

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
            <span className="underline default">MEN'S</span>
            <span className="underline">WOMEN'S</span>
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
                <Link
                  to={`/product/${product.id}`}
                  className="atag  text-reset col-6 col-xl-3 col-lg-4 col-md-6 col-sm-6"
                  key={index}
                  onClick={(e) => sendToBackend(e, product)}
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
                      <div>{product.badge === "Hot" ? <HotBadge /> : null}</div>
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
                </Link>
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
