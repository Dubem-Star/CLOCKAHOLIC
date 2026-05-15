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

  const searchResultsDesktop = useRef(null);

  useEffect(() => {
    document.body.style.overflow = prop.isSearchMode ? "hidden" : "unset";
    document.body.style.overflow = prop.isSearchMode ? "hidden" : "unset";

    // if (prop.isSearchMode) {
    //   searchResultsDesktop.current.classList.toggle("unmount");
    // } else {
    //   searchResultsDesktop.current.classList.toggle("mount");
    // }
  }, [prop.isSearchMode]);

  const box =
    prop.searchResults.length > 0
      ? { border: "solid 1px rgb(222, 226, 230)" }
      : { border: "none" };

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
              }}
              className="btn btn-close btn-close-black mb-4"
            ></button>

            <form
              onSubmit={prop.handleSubmit}
              onInput={prop.handleSearch}
              className="search-container position-relative align-self-center d-flex justify-content-center w-50"
            >
              <input
                type="text"
                className="form-control w-100 mb-4 search-input"
                placeholder="Search for a product"
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

      <div
        className={`search-results-desktop position-fixed d-flex flex-column rounded mx-auto overflow-y-auto bg-white ${prop.isSearchMode ? "" : "unmount"} `}
        ref={searchResultsDesktop}
        style={{
          overscrollBehavior: "none",
          maxHeight: "calc(100dvh - 150px)",
          ...box,
        }}
      >
        {prop.searchResults.length < 1 ? (
          prop.value.length > 0 ? (
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
                <div className="d-flex mb-1 pe-3">
                  <img
                    src={result.images[0]}
                    className=" flex-shrink-0 align-self-center"
                    style={{ width: "20%", aspectRatio: "1/1" }}
                  />
                  <div className="d-flex flex-column justify-content-center">
                    <p className="text-black m-0 " style={{ fontSize: "14px" }}>
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
    </>
  );
}

export default Search;
