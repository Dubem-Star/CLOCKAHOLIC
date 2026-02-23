import "@/assets/css/App2.css";
import { useParams } from "react-router-dom";
import Navbar from "@/components/plugins/Navbar";
import Footer from "@/components/plugins/Footer";
import monkeyMeme from "@/assets/images/wallpapers/monkey_confused_meme.jpg";
import { Link } from "react-router-dom";
import {
  newArrivedProducts,
  bestSellingProducts,
  onSaleProducts,
} from "@/data/products.jsx";

function Test() {
  const { id } = useParams();
  const bigArray = [
    ...newArrivedProducts,
    ...bestSellingProducts,
    ...onSaleProducts,
  ];

  const product = bigArray.find((product) => product.id === parseFloat(id));
  //   console.log(newArrivedProducts[0]);

  if (!product) {
    return (
      <>
        <Navbar />

        <img
          src={monkeyMeme}
          style={{
            margin: "170px auto 0 auto",
            display: "block",
            width: "clamp(200px, 60vw, 450px)",
            border: "1px solid black",
            opacity: "0.9",
          }}
          className="mb-5"
        />
        <h1
          style={{
            marginBottom: "35px",
            fontSize: "clamp(18px, 4vw, 40px)",
            fontFamily: '"Stack Sans Text", sans-serif',
            fontWeight: "300",
            color: "#646463",
          }}
          className="not-found-page text-center"
        >
          hmm... that product does not exist... yet!
        </h1>
        <Link
          to="/"
          style={{
            marginBottom: "100px",
            display: "block",
            color: "purple",
            fontFamily: '"Stack Sans Text", sans-serif',
            // fontSize: "clamp(20px, 3.8vw, 38px)",
            fontSize: "20px ",
          }}
          className="text-center not-found-page"
        >
          ⟵go back
        </Link>

        <Footer />
      </>
    );
  }
  return (
    <>
      <Navbar />
      <h1 class="details-h1">
        ROUTE WORKED!, product:{" "}
        <span style={{ color: "green" }}>{product.brandName}</span>{" "}
      </h1>
      <Footer />
    </>
  );
}

export default Test;
