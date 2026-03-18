import "@/assets/css/App.css";
import { useEffect, useRef } from "react";
import TopButton from "@/assets/icons/flaticons/up-arrow.svg?react";
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
      <TopButton className="general-slide-btn" />
    </a>
  );
}

export default BackToTop;
