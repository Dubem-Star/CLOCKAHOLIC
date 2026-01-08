import "./assets/css/App.css";
import "./assets/css/App2.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import FeaturedBrands from "./components/FeauturedBrands";
import NewArrivals from "./components/NewArrivals";
import BestSellers from "./components/BestSellers";
import { AdBanner, ExploreBanner } from "./components/AdBanner";
import OnSale from "./components/OnSale";
import BackToTop from "./components/BackToTop";
import { Footer } from "./components/Footer";
function App() {
  return (
    <>
      <BackToTop />
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedBrands />
      <NewArrivals />
      <BestSellers />
      <AdBanner />
      <OnSale />
      <ExploreBanner />
      <Footer />
    </>
  );
}

export default App;
