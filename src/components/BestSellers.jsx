import "@/assets/css/App.css";
import PaginationDots from "./PaginationDots";
import { ProductCardNav } from "./productCardNav";
import { NewBadge, HotBadge } from "./ProductCardBadges";
import tissotChain1 from "@/assets/images/watch_products/tissot/Tissot_Classic_Dream_40MM_1.png";
import tissotChain2 from "@/assets/images/watch_products/tissot/Tissot_Classic_Dream_40MM_2.png";
import tissotChain3 from "@/assets/images/watch_products/tissot/Tissot_Classic_Dream_40MM_3.png";
import tissotChain4 from "@/assets/images/watch_products/tissot/Tissot_Classic_Dream_40MM_4.png";
import naviforceOrange1 from "@/assets/images/watch_products/naviforce/Naviforce_7105_Orange_1.png";
import naviforceOrange2 from "@/assets/images/watch_products/naviforce/Naviforce_7105_Orange_2.png";
import naviforceOrange3 from "@/assets/images/watch_products/naviforce/Naviforce_7105_Orange_3.png";
import naviforceOrange4 from "@/assets/images/watch_products/naviforce/Naviforce_7105_Orange_4.png";
import cartier1 from "@/assets/images/watch_products/cartier/Cartier_Ballon_Bleu_1.png";
import cartier2 from "@/assets/images/watch_products/cartier/Cartier_Ballon_Bleu_2.png";
import cartier3 from "@/assets/images/watch_products/cartier/Cartier_Ballon_Bleu_3.png";
import currenBlackChain1 from "@/assets/images/watch_products/curren/Curren_8106_Black_1.png";
import currenBlackChain2 from "@/assets/images/watch_products/curren/Curren_8106_Black_2.png";
import currenBlackChain3 from "@/assets/images/watch_products/curren/Curren_8106_Black_3.png";
import tissotBlue1 from "@/assets/images/watch_products/tissot/Tissot_Supersport_Chrono_45.5mm_1.png";
import tissotBlue2 from "@/assets/images/watch_products/tissot/Tissot_Supersport_Chrono_45.5mm_2.png";
import tissotBlue4 from "@/assets/images/watch_products/tissot/Tissot_Supersport_Chrono_45.5mm_4.png";
import tissotBlue5 from "@/assets/images/watch_products/tissot/Tissot_Supersport_Chrono_45.5mm_5.png";
import naviforceGrey1 from "@/assets/images/watch_products/naviforce/Naviforce_7116_light-grey_1.png";
import naviforceGrey2 from "@/assets/images/watch_products/naviforce/Naviforce_7116_light-grey_2.png";
import naviforceGrey3 from "@/assets/images/watch_products/naviforce/Naviforce_7116_light-grey_3.png";
import naviforceGrey4 from "@/assets/images/watch_products/naviforce/Naviforce_7116_light-grey_4.png";
import currenBrown1 from "@/assets/images/watch_products/curren/Curren_8225_Brown_1.png";
import currenBrown2 from "@/assets/images/watch_products/curren/Curren_8225_Brown_2.png";
import currenBrown3 from "@/assets/images/watch_products/curren/Curren_8225_Brown_3.png";

function BestSellers() {
  const bestSellingProducts = [
    {
      brandName: "TISSOT",
      price: 90000,
      version: "Tissot Classic Dream 40MM",
      images: [tissotChain1, tissotChain2, tissotChain3, tissotChain4],
    },

    {
      brandName: "NAVIFORCE",
      price: 70000,
      version: "Naviforce 7105 Naddy Men Watch",
      images: [
        naviforceOrange1,
        naviforceOrange2,
        naviforceOrange3,
        naviforceOrange4,
      ],
      badge: "Hot",
    },

    {
      brandName: "CARTIER",
      price: 76500,
      version: "Cartier Ballon Bleu",
      images: [cartier1, cartier2, cartier3],
    },

    {
      brandName: "CURREN",
      price: 80500,
      version: "CURREN 8106 Men’s Black Stainless Steel Quartz Watch",
      images: [currenBlackChain1, currenBlackChain2, currenBlackChain3],
      badge: "New",
    },

    {
      brandName: "TISSOT",
      price: 65000,
      version: "Tissot Supersport Chrono 45.5mm",
      images: [tissotBlue1, tissotBlue2, tissotBlue4, tissotBlue5],
      badge: "New",
    },

    {
      brandName: "NAVIFORCE",
      price: 60000,
      version: "Naviforce 7116 Volda Men Digital Watch",
      images: [naviforceGrey1, naviforceGrey2, naviforceGrey3, naviforceGrey4],
    },

    {
      brandName: "CURREN",
      price: 70000,
      version: "CURREN 8225 Coffee Brown Leather Men’s Watch",
      images: [currenBrown1, currenBrown2, currenBrown3],
    },
  ];

  return (
    <>
      <div
        className="BestSellers-Container"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="middle-liner">
          <h1 className="middle-title">Best Selling</h1>
        </div>

        <div className="gender-option-container">
          <h1 className="d-flex justify-content-center gap-5 mt-3">
            <span className="underline default">MEN'S</span>
            <span className="underline">WOMEN'S</span>
          </h1>
        </div>

        <div className="products-container row gy-4 justify-content-center ">
          {bestSellingProducts.map((product, index) => {
            const truncated =
              product.version.length >= 30
                ? product.version.slice(0, 30) + "..."
                : product.version;
            return (
              <a
                href="#"
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
                    <p className="version">{truncated}</p>
                    <p className="price">₦{product.price.toLocaleString()}</p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <PaginationDots />
      </div>
    </>
  );
}

export default BestSellers;
