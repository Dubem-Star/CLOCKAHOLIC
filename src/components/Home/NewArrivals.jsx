import { ViewMore } from "@/components/plugins/NavigationButtons";
import { ProductCardNav } from "@/components/plugins/ProductCardNav";
import { NewBadge, HotBadge } from "@/components/plugins/ProductCardBadges";

import { Link } from "react-router-dom";
import { newArrivedProducts } from "../../data/products";
function NewArrivals() {
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

        <div className="products-container row gy-4 justify-content-center ">
          {newArrivedProducts.map((product, index) => {
            const truncated =
              product.version.length >= 30
                ? product.version.slice(0, 30) + "..."
                : product.version;

            return (
              <Link
                to={`/product/${product.id}`}
                className="atag text-reset col-6 col-xl-3 col-lg-4 col-md-6 col-sm-6"
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
        {/* ↑↑ .products-container end */}
        <ViewMore />
      </div>
      {/* ↑↑ .NewArrivals-container end */}
    </>
  );
}

export default NewArrivals;
