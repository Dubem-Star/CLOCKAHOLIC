import "@/assets/css/App.css";
import UserIcon from "@/assets/icons/flaticons/circle-user.svg?react";
import SearchIcon from "@/assets/icons/flaticons/search.svg?react";
import CartIcon from "@/assets/icons/flaticons/shopping-bag.svg?react";
import HamburgerIcon from "@/assets/icons/flaticons/hamburger.svg?react";
import brandLogo from "@/assets/images/Logo/clockaholic_only_logo.png";
import { useEffect, useState, useRef } from "react";

function Navbar() {
  const [isHidden, setHidden] = useState(false);
  const navHeightRef = useRef();
  const lastScrollY = useRef(0);

  useEffect(() => {
    function NavbarHider() {
      const currentScrollY = window.scrollY;
      const navbarHeight = navHeightRef.current.offsetHeight / 2;

      if (
        currentScrollY > lastScrollY.current &&
        currentScrollY > navbarHeight
      ) {
        setHidden(true);
      } else if (
        currentScrollY < lastScrollY.current ||
        currentScrollY < navbarHeight
      ) {
        setHidden(false);
      }

      lastScrollY.current = currentScrollY;
    }

    window.addEventListener("scroll", NavbarHider);
  });

  return (
    <>
      <header
        className={`Navbar container-fluid ${
          isHidden === false ? "show" : "hide"
        }`}
        ref={navHeightRef}
      >
        <nav
          className="navbar d-flex  justify-content-between main-page-wrapper"
          style={{ maxWidth: "1809px" }}
        >
          <a href="#" className="navbar-image-cont">
            <img src={brandLogo} className="navbar-image ms-2" alt="" />
          </a>

          {/* **********************Nav Links******************************* */}
          <ul className="navbar-links d-flex">
            <li>
              <a className="underline" href="#">
                Home
              </a>
              <i className="bi bi-chevron-down   "></i>
            </li>
            <li>
              <a className="underline" href="#">
                Men
              </a>
              <i className="bi bi-chevron-down  "></i>
            </li>
            <li>
              <a className="underline" href="#">
                Women
              </a>
              <i className="bi bi-chevron-down  "></i>
            </li>
            <li>
              <a className="underline" href="#">
                Brands
              </a>
              <i className="bi bi-chevron-down  "></i>
            </li>
            <li>
              <a className="underline" href="#">
                Accessories
              </a>
              <i className="bi bi-chevron-down  "></i>
            </li>
            <li>
              <a className="underline" href="#">
                Sale
              </a>
            </li>
          </ul>
          {/* ****************************Icons***************************** */}

          <div className="icon-wrapper">
            <div className="nav-icons d-flex  me-4">
              <SearchIcon className="nav-icon" />
              <UserIcon className="nav-icon" />
              <CartIcon className="nav-icon" />
            </div>

            <HamburgerIcon className="nav-icon hamburger" />
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
