import Navbar from "@/components/plugins/Navbar";
import Footer from "@/components/plugins/Footer";
import BackToTop from "@/components/plugins/btns/BackToTop";
import ProductDisplayBox from "@/components/ProductDetails/ProductDisplayBox";
import ExploreRelated from "@/components/ProductDetails/ExploreRelated";
import { useState } from "react";
function ProductDetails(prop) {
  const [is404, setIs404] = useState(false);
  return (
    <>
      <div className="Details-Page d-flex flex-column vh-100 align-items-center ">
        <Navbar
          cart={prop.cart}
          activatePopup={prop.activatePopup}
          popup={prop.popup}
          setDarken={prop.setDarken}
          darken={prop.darken}
          handleSearch={prop.handleSearch}
          searchResults={prop.searchResults}
          setSearchResults={prop.setSearchResults}
          value={prop.value}
          setValue={prop.setValue}
          isSearchMode={prop.isSearchMode}
          setIsSearchMode={prop.setIsSearchMode}
          isSearchLoading={prop.isSearchLoading}
          setIsSearchLoading={prop.setIsSearchLoading}
          isResult={prop.isResult}
          setIsResult={prop.setIsResult}
          is404={is404}
          setIs404={setIs404}
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
            setProdQty={prop.setProdQty}
            products={prop.products}
            setProducts={prop.setProducts}
            atcHomePage={prop.atcHomePage}
            is404={is404}
            setIs404={setIs404}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ProductDetails;
