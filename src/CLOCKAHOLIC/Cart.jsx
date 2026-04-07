import YourCart from "../components/Cart/YourCart";
import Navbar from "@/components/plugins/Navbar";
import Footer from "@/components/plugins/Footer";

function Cart(prop) {
  return (
    <>
      <div className="Details-Page d-flex flex-column vh-100 align-items-center ">
        <Navbar cart={prop.cart} />
        <div
          className="  flex-grow-1"
          style={{ maxWidth: "1400px", width: "100% " }}
        >
          <YourCart
            activatePopup={prop.activatePopup}
            setAppCart={prop.setAppCart}
            cart={prop.cart}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Cart;
