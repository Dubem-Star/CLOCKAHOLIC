import OrderForm from "../components/Checkout/OrderForm";
import Navbar from "@/components/plugins/Navbar";
import Footer from "@/components/plugins/Footer";
import monkeyMeme from "@/assets/images/wallpapers/monkey_confused_meme.jpg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Checkout(prop) {
  const [orderDoc, setOrderDoc] = useState(
    JSON.parse(localStorage.getItem("order")),
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Checkout | Clockaholic";
    prop.activatePopup(false);
  }, []);

  {
    /* *********************SAVE ORDER LOCALLY********************* */
    /* *********************SAVE ORDER LOCALLY********************* */
  }

  useEffect(() => {
    if (prop.order) {
      if (prop.order.products[0].bin) {
        console.log(prop.order);
        localStorage.setItem("order", JSON.stringify({ ...prop.order }));
        return setOrderDoc(JSON.parse(localStorage.getItem("order")));
      } else {
        localStorage.setItem("order", JSON.stringify({ ...prop.order }));
        setOrderDoc(JSON.parse(localStorage.getItem("order")));
      }
    }
  }, []);

  {
    /* *********************PAGE GUARD DOM********************* */
    /* *********************PAGE GUARD DOM********************* */
  }

  if (!orderDoc) {
    return (
      <>
        <Navbar
          cart={prop.cart}
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
          isCheckout={true}
        />

        <img
          src={monkeyMeme}
          style={{
            margin: "100px auto 0 auto",
            display: "block",
            width: "clamp(200px, 60vw, 450px)",
            border: "1px solid black",
            opacity: "0.9",
          }}
          className="mb-5"
        />
        <h1
          style={{
            marginBottom: "25px",
            fontSize: "clamp(18px, 4vw, 25px)",
            fontFamily: '"Stack Sans Text", sans-serif',
            fontWeight: "300",
            color: "#646463",
          }}
          className="not-found-page text-center"
        >
          You didn't get here through the normal way did you?
        </h1>
        <Link
          to="/"
          style={{
            marginBottom: "10px",
            display: "block",
            color: "purple",
            fontFamily: '"Stack Sans Text", sans-serif',
            fontSize: "20px ",
          }}
          className="text-center not-found-page"
        >
          ⟵go back
        </Link>
        <Footer />
      </>
    );
  } else {
    // console.log(localStorage.getItem("cart"));
    const o = JSON.parse(localStorage.getItem("order"));
    if (!o.products[0].bin) {
      if (!JSON.parse(localStorage.getItem("cart")).length) {
        return (
          <>
            <Navbar
              cart={prop.cart}
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
              isCheckout={true}
            />

            <img
              src={monkeyMeme}
              style={{
                margin: "100px auto 0 auto",
                display: "block",
                width: "clamp(200px, 60vw, 450px)",
                border: "1px solid black",
                opacity: "0.9",
              }}
              className="mb-5"
            />
            <h1
              style={{
                marginBottom: "25px",
                fontSize: "clamp(18px, 4vw, 25px)",
                fontFamily: '"Stack Sans Text", sans-serif',
                fontWeight: "300",
                color: "#646463",
              }}
              className="not-found-page text-center"
            >
              You didn't get here through the normal way did you?
            </h1>
            <Link
              to="/"
              style={{
                marginBottom: "10px",
                display: "block",
                color: "purple",
                fontFamily: '"Stack Sans Text", sans-serif',
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

      const cart = JSON.parse(localStorage.getItem("cart"));
      orderDoc.products = cart;
      orderDoc.totalAmount = JSON.parse(localStorage.getItem("cart")).reduce(
        (sum, item) => {
          return sum + item.price * item.quantity;
        },
        0,
      );
    }
  }
  return (
    <>
      <div className="Details-Page d-flex flex-column vh-100 align-items-center ">
        <Navbar
          cart={prop.cart}
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
          isCheckout={true}
        />
        <div
          className="  flex-grow-1"
          style={{ maxWidth: "1400px", width: "100% " }}
        >
          <OrderForm
            activatePopup={prop.activatePopup}
            order={prop.order}
            setOrder={prop.setOrder}
            shippingFee={prop.shippingFee}
            setShippingFee={prop.setShippingFee}
            orderDoc={orderDoc}
            shippingPrice={prop.shippingPrice}
            allStates={prop.allStates}
          />
          ;
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Checkout;
