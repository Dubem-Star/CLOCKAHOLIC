import "@/assets/css/App.css";
import PaginationDots from "./PaginationDots";
import { ProductCardNav } from "./productCardNav";
import { NewBadge, HotBadge } from "./ProductCardBadges";
import { Link } from "react-router-dom";

import { onSaleProducts } from "../../data/products";
function OnSale() {
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

        <div className="products-container row gy-4 justify-content-center ">
          {onSaleProducts.map((product, index) => {
            const truncated =
              product.version.length >= 30
                ? product.version.slice(0, 30) + "..."
                : product.version;

            return (
              <Link
                to={`/product/${product.id}`}
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

                    <div>
                      {product.badge === "Hot" ? (
                        <HotBadge />
                      ) : product.badge === "New" ? (
                        <NewBadge />
                      ) : null}
                    </div>

                    <ProductCardNav />
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
              </Link>
            );
          })}
        </div>

        <PaginationDots />
      </div>
    </>
  );
}

export default OnSale;
