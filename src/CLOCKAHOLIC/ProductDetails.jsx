import "@/assets/css/App.css";
import "@/assets/css/App2.css";
import Navbar from "@/components/plugins/Navbar";
import Footer from "@/components/plugins/Footer";
import BackToTop from "@/components/plugins/BackToTop";
import ProductDisplayBox from "@/components/ProductDetails/ProductDisplayBox";

function ProductDetails() {
  return (
    <>
      <div className="Details-Page d-flex flex-column vh-100">
        <Navbar />
        <div className="main-page-wrapper" style={{ overflow: "visible" }}>
          <BackToTop />
          <ProductDisplayBox />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ProductDetails;
