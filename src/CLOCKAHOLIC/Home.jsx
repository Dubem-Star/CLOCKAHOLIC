import Navbar from "@/components/plugins/Navbar";
import Footer from "@/components/plugins/Footer";
import Hero from "@/components/Home/Hero";
import Categories from "@/components/Home/Categories";
import FeaturedBrands from "@/components/Home/FeauturedBrands";
import NewArrivals from "@/components/Home/NewArrivals";
import BestSellers from "@/components/Home/BestSellers";
import { AdBanner, ExploreBanner } from "@/components/Home/AdBanner";
import OnSale from "@/components/Home/OnSale";
import BackToTop from "@/components/plugins/BackToTop";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="main-page-wrapper">
        <BackToTop />
        <Categories />
        <FeaturedBrands />
        <NewArrivals />
        <BestSellers />
        <AdBanner />
        <OnSale />
        <ExploreBanner />
      </div>
      <Footer />
    </>
  );
}

export default Home;
