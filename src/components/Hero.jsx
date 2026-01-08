import "@/assets/css/App.css";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import React from "react";
import seikoWatch from "@/assets/images/watch_wallpapers/watch_brown.jpg";
import fossilWatch from "@/assets/images/watch_wallpapers/watch_fossil.jpg";
import natureWatch from "@/assets/images/watch_wallpapers/watch_nature.jpg";
import sideView from "@/assets/images/watch_wallpapers/watch_side-view.jpg";
import anneKleinWatch from "@/assets/images/watch_wallpapers/watch_anne_klein.jpg";
import timexWatch from "@/assets/images/watch_wallpapers/watch_timex.jpg";
import fiyreLeurWatch from "@/assets/images/watch_wallpapers/watch_fiyre-leur.jpg";
function Hero() {
  // const images = [
  //   "/images/watch_wallpapers/watch_brown.jpg",
  //   "/images/watch_wallpapers/watch_fossil.jpg",
  //   "/images/watch_wallpapers/watch_nature.jpg",
  //   "/images/watch_wallpapers/watch_side-view.jpg",
  //   "/images/watch_wallpapers/watch_anne_klein.jpg",
  //   "/images/watch_wallpapers/watch_timex.jpg",
  //   "/images/watch_wallpapers/watch_fiyre-leur.jpg",
  // ];

  const images = [
    seikoWatch,
    fossilWatch,
    natureWatch,
    sideView,
    anneKleinWatch,
    timexWatch,
    fiyreLeurWatch,
  ];

  const titles = [
    {
      title: "MASTER EVERY SECOND",
      paragraph:
        "At <span>Clockaholic</span> , we believe time isn’t just measured— it’s valued. Every second shapes <br /> who we become, and every moment is an opportunity. Our craft exists to remind you of <br />  one truth: time waits for no one.",
    },

    {
      title: "THE ONLY CONSTANT IS PRECISION",
      paragraph:
        "Each instrument we craft is a dedication to engineering excellence. Beyond mere aesthetics, <br /> this is the relentless accuracy required to command your schedule— the constant force <br /> driving your day forward.",
    },

    {
      title: "YOUR NEXT MOVE, ON TIME",
      paragraph:
        "Stop chasing opportunities and start owning them. From the boardroom to the open road, <br /> <span>CLOCKAHOLIC</span> provides the definitive instrument built not just to keep up with your ambition, <br /> but to lead it.",
    },
  ];

  // React State Definitions***********************************************
  const [mounted, setMounted] = useState(false);
  const [currentContainerHeight, setContainerHeight] = useState(null);
  const [currentBgImg, setCurrentBgImg] = useState(0);
  const [currentTitle, setCurrentTitle] = useState(0);
  const [h1TotalHeight, setH1Height] = useState(0);
  const h1Ref = useRef(null);
  const contRef = useRef(null);
  let middleman;

  // Hero-Background-Image-Transition Life Cylce*******************************************
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgImg((prev) => (prev + 1) % images.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Hero-Text-Slideshow Life Cylce*******************************************
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((textContent) => (textContent + 1) % titles.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Second-Animation-Frame Timer *******************************************
  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

  // Absolute-H1-Height-Calculation *******************************************
  useLayoutEffect(() => {
    if (h1Ref.current) {
      const h1Height = h1Ref.current.offsetHeight;
      const styles = window.getComputedStyle(h1Ref.current);

      const marginBottom = parseFloat(styles.marginBottom);
      const totalHeight = h1Height + marginBottom;
      setH1Height(totalHeight);
    }
  }, [currentTitle]);

  // Static/Invincible-Text-Container-Height-Calculation *******************************************
  useLayoutEffect(() => {
    if (contRef.current) {
      const containerHeight = contRef.current.offsetHeight;
      setContainerHeight(containerHeight);
    }
  }, [currentTitle]);

  // *******************************Virtual DOM***********************************************
  return (
    <>
      <section className="Hero">
        {images.map((img, index) => (
          <div
            key={index}
            className={`hero-bg ${
              mounted && index === currentBgImg ? "active" : ""
            }`}
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}

        <div className="intro-space">
          <div className="inner-space">
            <div
              className="text-measurement-container"
              style={{
                height:
                  currentContainerHeight === null
                    ? "auto"
                    : `${currentContainerHeight}px`,
              }}
            >
              <div ref={contRef} className="inner-wrapper">
                <h1 className="invicibleH1">{titles[currentTitle].title}</h1>
                <p
                  className="invicibleP"
                  dangerouslySetInnerHTML={{
                    __html: titles[currentTitle].paragraph,
                  }}
                ></p>
              </div>
            </div>

            {titles.map((text, index) => (
              <React.Fragment key={index}>
                <h1
                  ref={index === currentTitle ? h1Ref : null}
                  className={` ${index === currentTitle ? "active" : "hide"}`}
                >
                  {text.title}
                </h1>

                <p
                  style={{ top: h1TotalHeight }}
                  className={`animated ${
                    index === currentTitle ? "active" : "hide"
                  }`}
                  dangerouslySetInnerHTML={{ __html: text.paragraph }}
                ></p>
              </React.Fragment>
            ))}

            <a href="#newArrivalsSection">
              <button className="btn btn-lg text-light shop-btn">
                Shop Now
              </button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
