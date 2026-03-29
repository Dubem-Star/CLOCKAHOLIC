import cartIcon from "@/assets/images/img_icons/shopping-bag.png";
import viewIcon from "@/assets/images/img_icons/visibility.png";
import CartIcon from "@/assets/icons/flaticons/shopping-bag.svg?react";
export const ProductCardNav = () => {
  return (
    <>
      <div className="grid-icon-container">
        <img
          title="add to cart"
          src={cartIcon}
          className="add-to-cart-product-grid"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            alert("hi");
          }}
        />

        <img
          title="view image"
          src={viewIcon}
          className="view-pop-up"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            alert("hi");
          }}
        />
      </div>
    </>
  );
};
