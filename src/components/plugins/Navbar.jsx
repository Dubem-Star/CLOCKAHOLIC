import UserIcon from "@/assets/icons/flaticons/circle-user.svg?react";
import SearchIcon from "@/assets/icons/flaticons/search.svg?react";
import CartIcon from "@/assets/icons/flaticons/shopping-bag.svg?react";
import HamburgerIcon from "@/assets/icons/flaticons/hamburger.svg?react";
import WishlistIcon from "@/assets/icons/flaticons/wishlist.svg?react";
import brandLogo from "@/assets/images/Logo/clockaholic_only_logo.png";
import Sidebar from "./Sliders/SliderMenu";
import Search from "./Sliders/SliderSearch";

import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar(prop) {
  const [isHidden, setHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const navHeightRef = useRef();
  const lastScrollY = useRef(0);

  const totalQuantity =
    prop.cart.length > 0
      ? prop.cart.reduce((sum, item) => sum + item.quantity, 0)
      : 0;

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
        id="navbar"
      >
        <nav
          className="navbar d-flex  justify-content-between main-page-wrapper"
          style={{ maxWidth: "2000px" }}
        >
          <Link className="navbar-image-cont" to="/">
            <img src={brandLogo} className="navbar-image ms-2" alt="" />
          </Link>

          {/* **********************Nav Links******************************* */}
          <ul className="navbar-links n-ul d-flex">
            <li>
              <Link className="underline" to="/">
                Home
              </Link>
            </li>

            <li>
              <a className="underline" href="#">
                NEW
              </a>
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
          </ul>
          {/* ****************************Icons***************************** */}

          <div className="icon-wrapper">
            <div className="nav-icons d-flex  me-4">
              {/* ********************SEARCH ICON******************** */
              /* ********************SEARCH ICON******************** */}
              <SearchIcon
                className="nav-icon"
                onClick={() => {
                  prop.setIsSearchMode(true);
                  prop.setDarken(true);
                  prop.setSearchResults([]);
                }}
              />
              {/* /* ************************************************ */}

              <UserIcon className="nav-icon" />
              <WishlistIcon className="nav-icon" />

              {/* ********************CART ICON******************** */
              /* ********************CART ICON******************** */}

              <div className="d-flex align-item-center position-relative cart-box">
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    prop.isCheckout || prop.is404
                      ? navigate("/cart")
                      : prop.activatePopup(true);
                  }}
                  className="text-reset d-flex align-content-center"
                >
                  <CartIcon className="nav-icon cart-icon" />
                  <span
                    className=" position-absolute text-light d-flex align-items-center justify-content-center rounded-circle"
                    style={{ bottom: "-6px" }}
                  >
                    {totalQuantity}
                  </span>
                </Link>
              </div>
              {/* /* ************************************************ */}
            </div>

            <HamburgerIcon
              className="nav-icon hamburger"
              onClick={() => {
                setIsOpen(true);
                prop.setDarken(true);
              }}
            />
          </div>
        </nav>
      </header>

      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setDarken={prop.setDarken}
        darken={prop.darken}
        handleSearch={prop.handleSearch}
        handleSubmit={prop.handleSubmit}
        searchResults={prop.searchResults}
        setSearchResults={prop.setSearchResults}
        value={prop.value}
        setValue={prop.setValue}
        isResult={prop.isResult}
        setIsResult={prop.setIsResult}
        isSearchLoading={prop.isSearchLoading}
        setIsSearchLoading={prop.setIsSearchLoading}
        isSearchMode={prop.isSearchMode}
        setIsSearchMode={prop.setIsSearchMode}
      />

      <Search
        setDarken={prop.setDarken}
        darken={prop.darken}
        isSearchMode={prop.isSearchMode}
        setIsSearchMode={prop.setIsSearchMode}
        searchResults={prop.searchResults}
        setSearchResults={prop.setSearchResults}
        handleSearch={prop.handleSearch}
        handleSubmit={prop.handleSubmit}
        value={prop.value}
        setValue={prop.setValue}
        isSearchLoading={prop.isSearchLoading}
        setIsSearchLoading={prop.setIsSearchLoading}
        isResult={prop.isResult}
        setIsResult={prop.setIsResult}
      />
    </>
  );
}

export default Navbar;
