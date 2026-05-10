import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchIcon from "@/assets/icons/flaticons/search.svg?react";
import {
  newArrivedProducts,
  bestSellingProducts,
  onSaleProducts,
} from "@/data/products.jsx";

const Sidebar = (prop) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);
  const [search, setSearch] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [value, setValue] = useState(0);

  const allProducts = [
    ...newArrivedProducts,
    ...bestSellingProducts,
    ...onSaleProducts,
  ];

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

  //   Sidebar Screen Resize Function ******************************
  //   Sidebar Screen Resize Function ******************************
  window.addEventListener("resize", () => {
    setIsMobile(window.innerWidth <= 991);

    if (window.innerWidth > 991) {
      prop.setDarken(false);
    } else {
      if (prop.isOpen) {
        prop.setDarken(true);
      } else {
        prop.setDarken(false);
      }
    }
  });

  //   Sidebar Screen Lock Function ******************************
  //   Sidebar Screen Lock Function ******************************
  useEffect(() => {
    if (prop.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {};
  }, [prop.isOpen]);

  //   Handle Submit Function ******************************
  //   Handle Submit Function ******************************
  function handleSubmit(e) {
    e.preventDefault();
    const search = e.target.firstElementChild.value;
    alert(search);
  }

  //   Handle Search Function ******************************
  //   Handle Search Function ******************************

  function handleSearch(e) {
    const text = e.target.value.trim().toLowerCase();

    const foundSearch = allProducts
      .filter(
        (item) =>
          item.brandName.toLowerCase().includes(text) ||
          item.version.toLowerCase().includes(text),
      )
      .slice(0, 7);

    if (!text) {
      foundSearch.length = [];
    }
    setValue(text);

    setSearchResults(foundSearch);
  }

  const box =
    searchResults.length > 0
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
            zIndex: 9999,
          }}
        >
          <button
            onClick={() => {
              prop.setIsOpen(false);
              setValue("");
              prop.setDarken(false);
              setSearchResults([]);
            }}
            className="btn btn-close btn-close-black mb-4"
          ></button>

          {/*  ************************Search Inputs Section ******************************
  //   ************************Search Inputs Section ****************************** */}

          <form
            onSubmit={handleSubmit}
            onInput={handleSearch}
            className="search-container position-relative"
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
                transform: "translateY(-50%)",
                right: "10px",
              }}
            />
          </form>

          {/*  ************************Search Results Section ******************************
  //   ************************Search Results Section ****************************** */}

          <div
            className={`search-results-container position-absolute start-0 end-0 top-75 overflow-y-auto  bg-white `}
            style={{
              zIndex: "9999",
              maxHeight: "calc(100vh - 150px)",

              ...box,
            }}
          >
            {searchResults.length < 1 ? (
              value.length > 0 ? (
                <>
                  <p className="text-black text-center">No products found.</p>
                </>
              ) : (
                <></>
              )
            ) : (
              searchResults.map((result, index) => {
                return (
                  <Link
                    key={result.id}
                    to={`/product/${result.id}`}
                    onClick={() => {
                      prop.setDarken(false);
                      prop.isOpen(false);
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
                        <p
                          className="text-black m-0 "
                          style={{ fontSize: "14px" }}
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
