import { useState, useEffect } from "react";

function QuantityPill(prop) {
  /* ********************Product Detail Quantity Logic******************** */
  /* ********************Product Detail Quantity Logic******************** */
  const [quantity, setQuantity] = useState(1);
  const itemQuantity = prop.cartQuantity ? prop.cartQuantity : 1;
  const [cartItemQuantity, setCartItemQuantity] = useState(itemQuantity);

  function handleIncrement() {
    if (prop.isCart) {
      setCartItemQuantity((prev) => prev + 1);
      const newQty = itemQuantity + 1;
      prop.cart.find((item) => item.id == prop.item.id).quantity = newQty;

      prop.setAppCart([...prop.cart]);
      prop.setCart([...prop.cart]);

      localStorage.setItem("cart", JSON.stringify([...prop.cart]));
    } else {
      setQuantity((prev) => prev + 1);
    }
  }

  function handleDecrement() {
    if (prop.isCart) {
      setCartItemQuantity((prev) => (prev < 2 ? prev : prev - 1));
      const newQty = itemQuantity < 2 ? itemQuantity : itemQuantity - 1;
      prop.cart.find((item) => item.id == prop.item.id).quantity = newQty;

      prop.setCart([...prop.cart]);
      prop.setAppCart([...prop.cart]);
      localStorage.setItem("cart", JSON.stringify([...prop.cart]));
    } else {
      if (quantity > 1) setQuantity((prev) => prev - 1);
    }
  }

  useEffect(() => {
    setCartItemQuantity(prop.cartQuantity);
    return () => {};
  }, [prop.cartQuantity]);
  /* ********************************************************************** */

  const style = {
    width: `${prop.isCart ? "70px" : "20%"}`,
    height: `${prop.isCart ? "25px" : "38px"}`,
  };

  return (
    <>
      <div className="input-group  quantity-buttons  " style={style}>
        <button className="btn border p-0" onClick={handleDecrement}>
          -
        </button>
        <input
          className="form-control text-center border p-0"
          value={prop.isCart ? cartItemQuantity : quantity}
          type="number"
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            setQuantity(val);
          }}
        />
        <button className="btn border p-0" onClick={handleIncrement}>
          +
        </button>
      </div>
    </>
  );
}

export default QuantityPill;
