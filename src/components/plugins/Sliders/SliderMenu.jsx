import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import SearchIcon from "@/assets/icons/flaticons/search.svg?react";

const Sidebar = (prop) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);
  const [search, setSearch] = useState(null);
  const searchResultsCont = useRef(null);
  const searchInput = useRef(null);

  // Define the animation states
  const sidebarVariants = {
    open: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      x: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  //   Creative search resize function ******************************
  //   Creative search resize function ******************************

  useEffect(() => {
    function resizeFunction() {
      setIsMobile(window.innerWidth <= 991);
      const desktop = window.innerWidth > 991;
      if (desktop) {
        if (prop.isSearchMode) {
          prop.setIsOpen(false);
          prop.setDarken(true);
        } else {
          prop.setDarken(false);
        }
      } else {
        if (prop.isOpen) {
          prop.setDarken(true);
        } else {
          prop.setDarken(false);
          prop.setIsSearchMode(false);
          if (prop.searchResults.length > 0) {
            prop.setIsOpen(true);
            console.log(prop.value);
            setTimeout(() => {
              if (searchInput.current) {
                searchInput.current.value = prop.value;
                searchInput.current.focus();
                console.log(
                  "Input successfully synced and focused!",
                  prop.value,
                );
              } else {
              }
            }, 50); // 50 milliseconds is all the browser needs to paint the UI
          }
        }
      }
    }

    window.addEventListener("resize", resizeFunction);
    return () => {
      window.removeEventListener("resize", resizeFunction);
    };
  }, [
    isMobile,
    prop.searchResults,
    prop.value,
    prop.setDarken,
    prop.isSearchMode,
  ]);

  //   Sidebar Screen Lock Function ******************************
  //   Sidebar Screen Lock Function ******************************
  useEffect(() => {
    if (prop.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = `unset`;
    }
    return () => {};
  }, [prop.isOpen]);

  //Search Result height Resize ******************************
  //Search Result height Resize ******************************
  const initialAppHeight = window.visualViewport.height;

  window.visualViewport.addEventListener("resize", () => {
    const currentHeight = window.visualViewport.height;
    const newHeight = `${currentHeight - 140}px`;
    if (searchResultsCont.current) {
      searchResultsCont.current.style.maxHeight =
        currentHeight < initialAppHeight ? newHeight : "calc(100dvh - 150px)";
    }
  });

  const box =
    prop.searchResults.length > 0
      ? { boxShadow: " 0 4px 10px rgba(0, 0, 0, 0.3)" }
      : { boxShadow: " 0 4px 10px rgba(0, 0, 0, 0)", paddingTop: "0" };

  return (
    <AnimatePresence>
      {prop.isOpen && isMobile && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={sidebarVariants}
          className="bg-white slider text-white p-4 vh-100 position-fixed top-0 left-0 "
          style={{
            overscrollBehavior: "none",
            zIndex: "9999",
          }}
        >
          <button
            onClick={() => {
              prop.setIsOpen(false);
              prop.setValue("");
              prop.setDarken(false);
              prop.setSearchResults([]);
            }}
            className="btn btn-close btn-close-black mb-4 close-btn"
          ></button>

          {/*  ************************Search Inputs Section ******************************
  //   ************************Search Inputs Section ****************************** */}

          <form
            onSubmit={prop.handleSubmit}
            onInput={prop.handleSearch}
            className="search-container position-relative"
          >
            <input
              type="text"
              className="form-control w-100 mb-4 search-input"
              placeholder="Search for a product"
              data-input="sliderMenu"
              ref={searchInput}
            />
            <SearchIcon
              className="position-absolute top-50 "
              style={{
                color: "#72716e",
                width: "20px",
                transform: "translateY(-50%)",
                right: "10px",
              }}
            />
          </form>

          <div
            className={`spinner-border text-black  position-absolute start-0 end-0 mx-auto ${prop.isSearchLoading === "sliderMenu" ? "opacity-1 visible" : "opacity-0 invisible"}`}
            role="status"
            style={{
              zIndex: "10000",
              top: `120px`,
              width: "20px",
              height: "20px",
            }}
          ></div>

          {/*  ************************Search Results Section ******************************
  //   ************************Search Results Section ****************************** */}

          <div
            className={`search-results-container position-absolute start-0 end-0 top-75 overflow-y-auto  bg-white `}
            ref={searchResultsCont}
            style={{
              zIndex: "9999",
              maxHeight: "calc(100dvh - 150px)",
              overscrollBehavior: "none",
              ...box,
            }}
          >
            {prop.searchResults.length < 1 ? (
              !prop.isResult ? (
                <>
                  <p className="text-black text-center">No products found.</p>
                </>
              ) : (
                <></>
              )
            ) : (
              prop.searchResults.map((result, index) => {
                return (
                  <Link
                    key={result.id}
                    to={`/product/${result.id}`}
                    onClick={() => {
                      prop.setDarken(false);
                      prop.setIsOpen(false);
                    }}
                    className="text-reset text-decoration-none item-link d-block pt-3"
                  >
                    <div className="d-flex mb-1 pe-3 gap-2">
                      <img
                        src={result.images[0]}
                        className=" flex-shrink-0 align-self-center"
                        style={{ width: "50px", aspectRatio: "1/1" }}
                      />
                      <div className="d-flex flex-column justify-content-center">
                        <p
                          className="text-black m-0 "
                          style={{ fontSize: "13px" }}
                        >
                          {result.version}
                        </p>
                        <p
                          className=" m-0"
                          style={{ color: "#b8860b", fontSize: "13px" }}
                        >
                          ₦{result.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <hr className="w-100 text-black bg-dark mt-3 mb-5 d-block" />
                  </Link>
                );
              })
            )}
          </div>

          {/*  ************************NavLinks Section ******************************
  //   ************************NavLinks Section ****************************** */}

          <ul className="navbar-links align-items-start n-ul d-flex flex-column gap-3 ps-1">
            <li className="p-1">
              <Link className="underline " to="/">
                Home {search}
              </Link>
            </li>

            <li className="p-1">
              <a className="underline" href="#">
                NEW
              </a>
            </li>

            <li className="p-1">
              <a className="underline" href="#">
                Men
              </a>
              <i className="bi bi-chevron-down ps-1 text-black "></i>
            </li>

            <li className="p-1">
              <a className="underline" href="#">
                Women
              </a>
              <i className="bi bi-chevron-down ps-1 text-black"></i>
            </li>

            <li className="p-1">
              <a className="underline" href="#">
                Brands
              </a>
              <i className="bi bi-chevron-down ps-1 text-black "></i>
            </li>

            <li className="p-1">
              <a className="underline" href="#">
                Accessories
              </a>
              <i className="bi bi-chevron-down  "></i>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
