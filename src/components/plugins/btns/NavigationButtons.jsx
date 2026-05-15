import { useRef, useEffect } from "react";

export const PaginationDots = (props) => {
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
      {Array.from({ length: props.totalDots }).map((_, i) => {
        const dotKey = i + 1;
        return (
          <button
            key={dotKey}
            className={`dot ${props.activeIndex === dotKey ? "default" : ""}`}
            onClick={() => props.dotHandler(dotKey)}
          ></button>
        );
      })}
    </div>
  );
};

export const ViewMore = () => {
  return (
    <>
      <button
        className="btn banner-button mt-5"
        style={{ width: "clamp(100px ,15vw, 130px)" }}
        onClick={() => alert("calm down fool.")}
      >
        View All
      </button>
    </>
  );
};
