export function SkeletonLayout() {
  const dummyArray = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <>
      <div className="products-container row gy-4 justify-content-center skeleton-container">
        {dummyArray.map((product, index) => {
          return (
            <a
              to=""
              className="atag text-reset col-6 col-xl-3 col-lg-4 col-md-6 col-sm-6  "
              key={index}
            >
              <div className="product-grid">
                <div className="product-img-cont">
                  <img
                    src="/CLOCKAHOLIC/watch_products/naviforce/Naviforce_7116_light-grey_1.png"
                    className="one opacity-0"
                  />
                </div>
                {/* ↑↑ .product-img-cont end */}

                <div className="product-info">
                  <h2 className="brand-name skeleton"></h2>
                  <p className="version skeleton"></p>
                  <p className="price skeleton"></p>
                </div>
              </div>
              {/* </a> */}
            </a>
          );
          {
            /* ↑↑ .products-card end */
          }
        })}
      </div>
    </>
  );
}
