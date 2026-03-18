import "@/assets/css/App.css";
import { useRef, useEffect } from "react";

const PaginationDots = (props) => {
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

  const index = [1, 2, 3];
  return (
    <div className="dots" ref={dotRef}>
      <button
        className={`dot ${props.activeIndex === index[0] ? "default" : ""}`}
        onClick={() => props.dotHandler(index[0])}
      ></button>
      <button
        className={`dot ${props.activeIndex === index[1] ? "default" : ""}`}
        onClick={() => props.dotHandler(index[1])}
      ></button>
      <button
        className={`dot ${props.activeIndex === index[2] ? "default" : ""}`}
        onClick={() => props.dotHandler(index[2])}
      ></button>
    </div>
  );
};

export default PaginationDots;
