import UserIcon from "@/assets/icons/flaticons/circle-user.svg?react";
import SearchIcon from "@/assets/icons/flaticons/search.svg?react";
import CartIcon from "@/assets/icons/flaticons/shopping-bag.svg?react";
import HamburgerIcon from "@/assets/icons/flaticons/hamburger.svg?react";
import WishlistIcon from "@/assets/icons/flaticons/wishlist.svg?react";
import brandLogo from "@/assets/images/Logo/clockaholic_only_logo.png";

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isHidden, setHidden] = useState(false);
  const navHeightRef = useRef();
  const lastScrollY = useRef(0);

  useEffect(() => {
    function NavbarHider() {
      const currentScrollY = window.scrollY;
      let navbarHeight;
      if (navHeightRef.current) {
        navbarHeight = navHeightRef.current.offsetHeight / 2;
      } else {
        return;
      }

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
    return () => {
      window.removeEventListener("scroll", NavbarHider);
    };
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
          style={{ maxWidth: "2000px" }}
        >
          <Link className="navbar-image-cont" to="/">
            <img src={brandLogo} className="navbar-image ms-2" alt="" />
          </Link>

          {/* **********************Nav Links******************************* */}
          <ul className="navbar-links d-flex">
            <li>
              <Link className="underline" to="/">
                Home
              </Link>

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
              <WishlistIcon className="nav-icon" />

              <div className="d-flex align-item-center position-relative cart-box">
                <Link
                  to="/cart"
                  className="text-reset d-flex align-content-center"
                >
                  <CartIcon className="nav-icon" />
                  <span
                    className=" position-absolute text-light d-flex align-items-center justify-content-center rounded-circle"
                    style={{ bottom: "-6px" }}
                  >
                    0
                  </span>
                </Link>
              </div>
            </div>

            <HamburgerIcon className="nav-icon hamburger" />
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
