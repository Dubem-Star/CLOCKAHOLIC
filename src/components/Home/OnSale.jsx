import { ViewMore } from "@/components/plugins/btns/NavigationButtons";
import { ProductCardNav } from "@/components/plugins/productCard/ProductCardNav";
import {
  NewBadge,
  HotBadge,
} from "@/components/plugins/productCard/ProductCardBadges";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { SkeletonLayout } from "../plugins/SkeletonLayout";

function OnSale(prop) {
  const [isLoading, setisLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (prop.onSale.length) {
      setProducts(prop.onSale);
      setisLoading(false);
    }
  }, [prop.onSale]);

  function handleCardClick(e, id) {
    if (e.target.classList.contains("product-nav")) {
      return;
    }
    navigate(`/product/${id}`);
  }

  return (
    <>
      <div
        className="display-container d-flex flex-column align-items-center "
        data-aos-delay="200"
        data-aos="fade-up"
      >
        <div className="middle-liner custom">
          <h1 className="middle-title">On Sale</h1>
        </div>

        {isLoading ? (
          <SkeletonLayout />
        ) : (
          <div className="products-container row gy-4 justify-content-center ">
            {products.map((product, index) => {
              const truncated =
                product.version.length >= 30
                  ? product.version.slice(0, 30) + "..."
                  : product.version;

              return (
                <div
                  onClick={(e) => handleCardClick(e, product.id)}
                  className="atag text-reset text-decoration-none col-6 col-xl-3 col-lg-4 col-md-6 col-sm-6"
                  key={index}
                >
                  <div className="product-grid">
                    <div className="product-img-cont">
                      <img
                        src={product.images[0]}
                        className="fake"
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

                      <div>
                        {product.badge === "Hot" ? (
                          <HotBadge />
                        ) : product.badge === "New" ? (
                          <NewBadge />
                        ) : null}
                      </div>

                      <ProductCardNav
                        product={product}
                        atcHomePage={prop.atcHomePage}
                      />
                    </div>

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
                </div>
              );
            })}
          </div>
        )}

        <ViewMore />
      </div>
    </>
  );
}

export default OnSale;
