import { useEffect } from "react";

function YourCart() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div style={{ marginTop: "200px", textAlign: "center" }}>
        <p> CART PAGE ACTIVE</p>
      </div>
    </>
  );
}

export default YourCart;
