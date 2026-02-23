import "@/assets/css/App.css";
import "@/assets/css/App2.css";

import fireBurn from "@/assets/images/img_icons/fire-burn.gif";

export const NewBadge = () => {
  return (
    <div className="product-badge new-badge">
      <span>NEW</span>
    </div>
  );
};

export const HotBadge = () => {
  return (
    <div className="product-badge hot-badge">
      <span>HOT</span>
      <img src={fireBurn} alt="fire-gif" className="fake" />
      <img src={fireBurn} alt="fire-gif" className="real" />
    </div>
  );
};
