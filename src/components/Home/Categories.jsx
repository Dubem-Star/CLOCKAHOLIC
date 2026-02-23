import "@/assets/css/App.css";

import blackModelMan from "@/assets/images/Categories/male_watch_2.jpg";
import AsianModelWoman from "@/assets/images/Categories/female_watch.jpg";
import whiteModelWoman from "@/assets/images/Categories/accessories.jpg";

function Categories() {
  const categories = [
    {
      title: "Men's Collection",
      image: blackModelMan,
      alt: "men's category",
    },
    {
      title: "Women's Collection",
      image: AsianModelWoman,
      alt: "women's category",
    },
    {
      title: "Accessories",
      image: whiteModelWoman,
      alt: "jewelry category",
    },
  ];

  return (
    <>
      <div
        className="Categories"
        // data-aos="fade-up"
        // data-aos-delay="200"
      >
        <div className="left-liner">
          <h1>Shop By Categories</h1>
        </div>

        <div className="cat-container row  justify-content-center">
          {categories.map((cat, index) => (
            <a
              href="#"
              className="text-decoration-none text-reset col-4 d-flex justify-content-center"
              key={index}
            >
              <div className="cat-grid ">
                <img className="cat-img fake" src={cat.image} alt={cat.alt} />
                <img className="cat-img" src={cat.image} alt={cat.alt} />
                <h2 className="cat-title">{cat.title}</h2>
                <button className="cat-shop-btn btn btn-sm text-light">
                  Shop Now
                </button>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

export default Categories;
