import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@/assets/icons/flaticons/search.svg?react";
function Search(prop) {
  // Define the animation states
  const sidebarVariants = {
    open: {
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      y: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const searchInput = useRef(null);
  const [top, setTop] = useState(0);

  useEffect(() => {
    document.body.style.overflow = prop.isSearchMode ? "hidden" : "unset";
    document.body.style.overflow = prop.isSearchMode ? "hidden" : "unset";

    const timer = setTimeout(() => {
      if (searchInput.current) {
        const srTop =
          searchInput.current.offsetHeight +
          searchInput.current.getBoundingClientRect().top;
        console.log(srTop);
        setTop(srTop);
      }
    }, 700);

    return () => {
      clearTimeout(timer);
    };
  }, [prop.isSearchMode]);

  const box =
    prop.searchResults.length > 0
      ? { border: "solid 1px rgb(222, 226, 230)" }
      : { border: "none" };

  useEffect(() => {
    if (searchInput.current) {
      searchInput.current.focus();
    }
  }, [prop.isSearchMode]);

  return (
    <>
      <AnimatePresence>
        {prop.isSearchMode && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="bg-white search d-flex flex-column p-4  position-fixed top-0  w-100 "
            style={{
              overscrollBehavior: "none",
              zIndex: "9999",
              height: "150px",
            }}
          >
            <button
              onClick={() => {
                prop.setIsSearchMode(false);
                prop.setDarken(false);
                prop.setSearchResults([]);
                prop.setValue("");
                prop.setIsSearchLoading(false);
                prop.setIsResult(true);
              }}
              className="btn btn-close btn-close-black mb-4 close-btn"
            ></button>

            {/*  ************************Search Inputs Section ******************************
  //   ************************Search Inputs Section ****************************** */}

            <form
              onSubmit={prop.handleSubmit}
              onInput={prop.handleSearch}
              className="search-container position-relative align-self-center d-flex justify-content-center  mx-auto"
              style={{ width: "100%", maxWidth: "750px" }}
            >
              <input
                type="text"
                className="form-control w-100 mb-4 search-input"
                placeholder="Search for a product"
                ref={searchInput}
                data-input="sliderSearch"
              />
              <SearchIcon
                className="position-absolute top-50 "
                style={{
                  color: "#72716e",
                  width: "20px",
                  transform: "translateY(-100%)",
                  right: "10px",
                }}
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/*  ************************Search Results Section ******************************
  //   ************************Search Results Section ****************************** */}
      <div
        className={`spinner-border text-black  position-sticky start-50 ${prop.isSearchLoading === "sliderSearch" ? "opacity-1 visible" : "opacity-0 invisible"}`}
        role="status"
        style={{
          zIndex: "10000",
          top: `115px`,
          width: "25px",
          height: "25px",
        }}
      ></div>

      <div
        className={`search-results-desktop position-fixed d-flex flex-column rounded mx-auto overflow-y-auto bg-white ${prop.isSearchMode ? "" : "unmount"} `}
        style={{
          overscrollBehavior: "none",
          maxHeight: "400px",
          top: `${top}px`,
          ...box,
        }}
      >
        {prop.searchResults.length < 1 ? (
          !prop.isResult ? (
            <>
              <p className="text-black text-center mt-4">No products found.</p>
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
                className="text-reset text-decoration-none item-link d-block  "
              >
                <div className="d-flex mb-1 pe-3 gap-3 ps-2 py-1">
                  <img
                    src={result.images[0]}
                    className=" flex-shrink-0 align-self-center "
                    style={{ width: "50px", aspectRatio: "1/1" }}
                  />
                  <div className="d-flex w-100 justify-content-between align-items-center">
                    <p
                      className="text-black m-0  fw-normal"
                      style={{ fontSize: "16px" }}
                    >
                      {result.version}
                    </p>
                    <p
                      className=" m-0"
                      style={{ color: "#b8860b", fontSize: "15px" }}
                    >
                      ₦{result.price.toLocaleString()}
                    </p>
                  </div>
                </div>
                <hr className="w-100 text-black bg-dark mt-1 mb-0 d-block" />
              </Link>
            );
          })
        )}
      </div>
    </>
  );
}

export default Search;
