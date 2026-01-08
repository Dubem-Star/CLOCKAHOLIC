import "@/assets/css/App.css";
import { useEffect, useRef } from "react";
import tomiLogo from "@/assets/images/watch_logos/new_tomi.png";
import casioLogo from "@/assets/images/watch_logos/new_casio.png";
import cartierLogo from "@/assets/images/watch_logos/new_cartier-2.png";
import gShockCasioLogo from "@/assets/images/watch_logos/new_g-shock-casio.png";
import seikoLogo from "@/assets/images/watch_logos/new_seiko.png";
import tissotLogo from "@/assets/images/watch_logos/new_tissot.png";
import tommyHilfigerLogo from "@/assets/images/watch_logos/new_tommy-hilfiger.png";
import rolexLogo from "@/assets/images/watch_logos/new_rolex-logo.png";
import tagHeurLogo from "@/assets/images/watch_logos/new_tag-heuer.png";
import hublotLogo from "@/assets/images/watch_logos/new_hublot.png";
import pumaLogo from "@/assets/images/watch_logos/new_puma.png";
import patekLogo from "@/assets/images/watch_logos/new_patek-philippe.png";
import constantinLogo from "@/assets/images/watch_logos/new_vacheron-constantin.png";
import poedagarLogo from "@/assets/images/watch_logos/new_poedagar.png";
import currenLogo from "@/assets/images/watch_logos/new_curren.png";
import APLogo from "@/assets/images/watch_logos/new_audemars-piguet.png";
import tudorLogo from "@/assets/images/watch_logos/new_tudor.png";
import citizenLogo from "@/assets/images/watch_logos/new_citizen.png";
import montBlancLogo from "@/assets/images/watch_logos/new_montblanc.png";
import naviforceLogo from "@/assets/images/watch_logos/new_naviforce.png";
import chromeHeartsLogo from "@/assets/images/watch_logos/new_Chrome_Hearts_Logo.png";

const brandedIcons = [
  chromeHeartsLogo,
  tomiLogo,
  casioLogo,
  cartierLogo,
  gShockCasioLogo,
  seikoLogo,
  tissotLogo,
  tommyHilfigerLogo,
];

function FeaturedBrands() {
  const brandContRef = useRef(null);
  const isRunningRef = useRef(false);

  function loopScroll(container, duration) {
    const maxScroll = container.scrollWidth - container.clientWidth;
    isRunningRef.current = true;

    function scrollRight() {
      if (!isRunningRef.current) return;
      smoothScroll(container, maxScroll, duration, scrollLeftCallback);
    }

    function scrollLeft() {
      if (!isRunningRef.current) return;
      smoothScroll(container, 0, duration, scrollRight);
    }

    // Callback when one scrollRight finishes
    function scrollLeftCallback() {
      scrollLeft();
    }

    // start the loop
    scrollRight();
  }

  function smoothScroll(container, to, duration, callback) {
    const start = container.scrollLeft;
    const change = to - start;
    const startTime = performance.now();

    function animate(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      container.scrollLeft = start + change * progress;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else if (callback) {
        callback();
      }
    }
    requestAnimationFrame(animate);
  }

  useEffect(() => {
    const scrollContainer = brandContRef.current;
    if (!scrollContainer) return;

    if (window.innerWidth <= 970) {
      loopScroll(scrollContainer, 10000);
    }

    return () => {
      isRunningRef.current = false;
    };
  }, []);

  return (
    <>
      <div
        className="Featured-Brand-Container"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="left-liner FB">
          <h1>Featured Brands</h1>
        </div>

        <div className="brand-cont-container">
          <div className="brand-cont" ref={brandContRef}>
            {/* *******************Individual Watch Logo Placement******************* */}
            <div className="logo-cont rolly-cont">
              <img src={rolexLogo} className="rolly" />
            </div>

            <div className="logo-cont tag-heuer-cont">
              <img className="tag-heuer" src={tagHeurLogo} />
            </div>

            <div className="logo-cont hublot-cont">
              <img className="hublot" src={hublotLogo} />
            </div>

            <div className="logo-cont puma-cont">
              <img src={pumaLogo} className="puma" />
            </div>

            <div className="logo-cont patek-cont">
              <img src={patekLogo} className="patek" />
            </div>

            <div className="logo-cont constantin-cont">
              <img src={constantinLogo} className="constantin" />
            </div>

            <div className="logo-cont poedagar-cont">
              <img src={poedagarLogo} className=" icon poedagar" />
            </div>

            <div className="logo-cont curren-cont">
              <img src={currenLogo} className=" icon curren" />
            </div>

            <div className="logo-cont naviforce-cont">
              <img src={naviforceLogo} className=" icon naviforce" />
            </div>

            {/* *******************Watch Logo Loop******************* */}
            {brandedIcons.map((icon, index) => (
              <div key={index} className="logo-cont">
                <img src={icon} className="icon" />
              </div>
            ))}

            {/* *******************Individual Watch Logo Placement******************* */}
            <div className="logo-cont AP-cont">
              <img src={APLogo} className="AP" />
            </div>

            <div className="logo-cont tudor-cont">
              <img src={tudorLogo} className="tudor" />
            </div>

            <div className="logo-cont citizen-cont pt-3">
              <img src={citizenLogo} className="citizen" />
            </div>

            <div className="logo-cont montblanc-cont ">
              <img src={montBlancLogo} className="montblanc" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeaturedBrands;
