import "@/assets/css/App.css";
import PaginationDots from "./PaginationDots";
import { ProductCardNav } from "./productCardNav";
import { NewBadge, HotBadge } from "./ProductCardBadges";
import gShockCasio1 from "@/assets/images/watch_products/g_shock/gshock_silver_1.png";
import gShockCasio2 from "@/assets/images/watch_products/g_shock/gshock_silver_2.png";
import poedagar1 from "@/assets/images/watch_products/poedagar/Poedagar_692_1.png";
import poedagar2 from "@/assets/images/watch_products/poedagar/Poedagar_692_2.png";
import poedagar3 from "@/assets/images/watch_products/poedagar/Poedagar_692_3.png";
import poedagar4 from "@/assets/images/watch_products/poedagar/Poedagar_692_4.png";
import seikoSport1 from "@/assets/images/watch_products/seiko/Seiko_SPB517_1.png";
import seikoSport2 from "@/assets/images/watch_products/seiko/Seiko_SPB517_2.png";
import seikoSport3 from "@/assets/images/watch_products/seiko/Seiko_SPB517_3.png";
import seikoProspex1 from "@/assets/images/watch_products/seiko/Seiko_SRPL95_1.png";
import seikoProspex2 from "@/assets/images/watch_products/seiko/Seiko_SRPL95_2.png";
import seikoProspex3 from "@/assets/images/watch_products/seiko/Seiko_SRPL95_3.png";
import cartierGreen1 from "@/assets/images/watch_products/cartier/Cartier_Green_Leather_1.png";
import cartierGreen2 from "@/assets/images/watch_products/cartier/Cartier_Green_Leather_2.png";
import cartierGreen3 from "@/assets/images/watch_products/cartier/Cartier_Green_Leather_3.png";
import tissotLeLocle1 from "@/assets/images/watch_products/tissot/Tissot_Le_Locle_1.png";
import tissotLeLocle2 from "@/assets/images/watch_products/tissot/Tissot_Le_Locle_2.png";
import tissotLeLocle3 from "@/assets/images/watch_products/tissot/Tissot_Le_Locle_3.png";
import citizen1 from "@/assets/images/watch_products/citizen/Citizen_1.png";
import citizen2 from "@/assets/images/watch_products/citizen/Citizen_2.png";
import cartierBlue1 from "@/assets/images/watch_products/cartier/Cartier_Blue_1.png";
import cartierBlue2 from "@/assets/images/watch_products/cartier/Cartier_Blue_2.png";

function NewArrivals() {
  const newArrivedProducts = [
    {
      brandName: "G-SHOCK",
      price: 60000,
      version: "G-SHOCK Submariner Tribute Original",
      images: [gShockCasio1, gShockCasio2],
      brandUrl: "/product/rolex",
      badge: "Hot",
    },

    {
      brandName: "POEDAGAR",
      price: 75000,
      version: "Poedagar 892 Series (The Aviator Chronograph)",
      images: [poedagar1, poedagar2, poedagar3, poedagar4],
    },

    {
      brandName: "SEIKO",
      price: 85000,
      version: "Seiko 5 Sports SRPL95 Series (The Field Watch)",
      images: [seikoSport1, seikoSport2, seikoSport3],
    },

    {
      brandName: "SEIKO",
      price: 54000,
      version: "Seiko Prospex & 5 Sports Series (The Adventure Duo)",
      images: [seikoProspex1, seikoProspex2, seikoProspex3],
      badge: "Hot",
    },

    {
      brandName: "CARTIER",
      price: 75000,
      version:
        "Cartier Mens Santos de Medium Automatic 35 mm Stainless Steel Watch with Green Dial",
      images: [cartierGreen1, cartierGreen2, cartierGreen3],
    },

    {
      brandName: "TISSOT",
      price: 80000,
      version: "Tissot T-Classic Le Locle Powermatic 80",
      images: [tissotLeLocle1, tissotLeLocle2, tissotLeLocle3],
    },

    {
      brandName: "CITIZEN",
      price: 59000,
      version:
        "Citizen CB0270-10A Men’s Eco-Drive White Dial Radio-Controlled Leather Strap Watch",
      images: [citizen1, citizen2],
    },

    {
      brandName: "CARTIER",
      price: 85000,
      version: "Cartier Santos-Dumont (WSSA0032)",
      images: [cartierBlue1, cartierBlue2],
    },
  ];

  return (
    <>
      <div
        className="NewArrivals-container"
        data-aos="fade-up"
        data-aos-delay="200"
        id="newArrivalsSection"
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
              <a
                href="#"
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
                    <p className="version">{truncated}</p>
                    <p className="price">₦{product.price.toLocaleString()}</p>
                  </div>
                </div>
              </a>
            );
            {
              /* ↑↑ .products-card end */
            }
          })}
        </div>
        {/* ↑↑ .products-container end */}
        <PaginationDots />
      </div>
      {/* ↑↑ .NewArrivals-container end */}
    </>
  );
}

export default NewArrivals;
