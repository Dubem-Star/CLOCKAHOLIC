import Navbar from "@/components/plugins/Navbar";
import Footer from "@/components/plugins/Footer";
import Hero from "@/components/Home/Hero";
import Categories from "@/components/Home/Categories";
import FeaturedBrands from "@/components/Home/FeauturedBrands";
import NewArrivals from "@/components/Home/NewArrivals";
import BestSellers from "@/components/Home/BestSellers";
import { AdBanner, ExploreBanner } from "@/components/Home/AdBanner";
import OnSale from "@/components/Home/OnSale";
import BackToTop from "@/components/plugins/btns/BackToTop";
import CartPopup from "../components/Cart/CartPopUp";
import { useEffect } from "react";
function Home(prop) {
  useEffect(() => {
    prop.activatePopup(false);
  }, []);
  return (
    <>
      <Navbar
        cart={prop.cart}
        activatePopup={prop.activatePopup}
        popup={prop.popup}
        setDarken={prop.setDarken}
        darken={prop.darken}
        handleSearch={prop.handleSearch}
        handleSubmit={prop.handleSubmit}
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
      />
      <Hero />
      {/* <CartPopup
        popup={prop.popup}
        toggle={prop.activatePopup}
        cart={prop.cart}
        setAppCart={prop.setAppCart}
      /> */}
      <div className="main-page-wrapper">
        <BackToTop />
        <Categories />
        <FeaturedBrands />
        <NewArrivals
          atcHomePage={prop.atcHomePage}
          newlyArrived={prop.newlyArrived}
        />
        <BestSellers
          atcHomePage={prop.atcHomePage}
          bestSelling={prop.bestSelling}
        />
        <AdBanner />
        <OnSale atcHomePage={prop.atcHomePage} onSale={prop.onSale} />
        <ExploreBanner />
      </div>
      <Footer />
    </>
  );
}

export default Home;
