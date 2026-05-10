import Navbar from "@/components/plugins/Navbar";
import Footer from "@/components/plugins/Footer";
import BackToTop from "@/components/plugins/BackToTop";
import ProductDisplayBox from "@/components/ProductDetails/ProductDisplayBox";
import ExploreRelated from "@/components/ProductDetails/ExploreRelated";

function ProductDetails(prop) {
  return (
    <>
      <div className="Details-Page d-flex flex-column vh-100 align-items-center ">
        <Navbar
          cart={prop.cart}
          activatePopup={prop.activatePopup}
          popup={prop.popup}
          setDarken={prop.setDarken}
          darken={prop.darken}
        />

        <div
          className="  flex-grow-1"
          style={{ maxWidth: "1400px", width: "100% " }}
        >
          <BackToTop />
          <ProductDisplayBox
            setAppCart={prop.setAppCart}
            cart={prop.cart}
            activatePopup={prop.activatePopup}
            popup={prop.popup}
            setId={prop.setId}
            atcDetailsPage={prop.atcDetailsPage}
          />
          <ExploreRelated atcHomePage={prop.atcHomePage} />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ProductDetails;
