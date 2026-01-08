import "@/assets/css/App.css";
import { useRef, useEffect } from "react";

function PaginationDots() {
  const dotRef = useRef(null);

  useEffect(() => {
    const dotContainer = dotRef.current;
    const dots = dotContainer.querySelectorAll(".dot");

    const dovNav = (e) => {
      for (let inactive of dots) {
        inactive.classList.remove("default");
      }
      e.target.classList.add("default");
    };

    for (let dot of dots) {
      dot.addEventListener("click", dovNav);
    }
    return () => {
      for (let dot of dots) {
        dot.removeEventListener("click", dovNav);
      }
    };
  }, []);

  return (
    <div className="dots" ref={dotRef}>
      <button className="dot default"></button>
      <button className="dot"></button>
      <button className="dot"></button>
    </div>
  );
}

export default PaginationDots;
