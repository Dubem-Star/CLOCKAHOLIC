import YourCart from "../components/Cart/YourCart";
import Navbar from "@/components/plugins/Navbar";
import Footer from "@/components/plugins/Footer";

function Cart(prop) {
  return (
    <>
      <Navbar cart={prop.cart} />
      <YourCart />
      <Footer />
    </>
  );
}

export default Cart;
