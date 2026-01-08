import "@/assets/css/App.css";
import { useEffect, useRef } from "react";
import bttImg from "@/assets/images/img_icons/up-arrow.png";
function BackToTop() {
  const upIconRef = useRef(null);

  useEffect(() => {
    const bttIcon = upIconRef.current;

    function bttLogic() {
      const isScrollYPassed1k = window.scrollY >= 500;
      bttIcon.classList.toggle("show", isScrollYPassed1k);
    }

    window.addEventListener("scroll", bttLogic);
    return () => {
      window.removeEventListener("scroll", bttLogic);
    };
  }, []);

  return (
    <a
      href="#"
      ref={upIconRef}
      className="back-to-top-wrapper text-reset"
      title="back to top"
    >
      <img src={bttImg} />
    </a>
  );
}

export default BackToTop;
