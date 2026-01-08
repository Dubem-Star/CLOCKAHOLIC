import "@/assets/css/App.css";
import "@/assets/css/App2.css";
import { useState } from "react";

import tissotPoster from "@/assets/images/watch_posters/Tissot_Poster_2.jpg";
import citizenPoster from "@/assets/images/watch_posters/Citizen_Poster_2.jpg";
import edificePoster from "@/assets/images/watch_posters/Edifice_Poster_1.jpg";
import seikoPoster from "@/assets/images/watch_posters/Seiko_Poster_4.jpg";
import tissotSRVPoster from "@/assets/images/watch_posters/Tissot_SRV.png";

// AD BANNER COMPONENT*******************************
// AD BANNER COMPONENT*******************************

export const AdBanner = () => {
  const [bannerName, setBannerName] = useState("");

  function handleHover(e) {
    const currentBannerItem = e.target.dataset.brandName;
    setBannerName(currentBannerItem);
  }

  return (
    <div
      className="Ad-Banner-Wallpaper"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <div className="Ad-Banner-Container">
        <a
          href="#"
          className="banner-link banner-link-1"
          title={`Shop ${bannerName}`}
          onMouseEnter={handleHover}
        >
          <div className=" banner-item-container w-40">
            <img src={tissotPoster} />
            <div className="banner-item" data-brand-name="Tissot"></div>
            <button className="btn bt ab-shop-btn">Shop Now</button>
          </div>
        </a>

        <a
          href="#"
          className="banner-link banner-link-2"
          onMouseEnter={handleHover}
          title={`Shop ${bannerName}`}
        >
          <div className=" banner-item-container w-30">
            <img src={citizenPoster} />
            <div className="banner-item" data-brand-name="Citizen"></div>
            <button className="btn btn-sm ab-shop-btn">Shop Now</button>
          </div>
        </a>

        <div className="banner-link-3">
          <div className=" w-20">
            <a
              href="#"
              className="banner-link"
              data-brand-name="Edifice"
              onMouseEnter={handleHover}
              title={`Shop ${bannerName}`}
            >
              <div className="banner-item-container">
                <img src={edificePoster} />
                <div className="banner-item" data-brand-name="Edifice"></div>
                <button className="btn btn-sm ab-shop-btn">Shop Now</button>
              </div>
            </a>

            <a
              href="#"
              className="banner-link"
              data-brand-name="Seiko"
              onMouseEnter={handleHover}
              title={`Shop ${bannerName}`}
            >
              <div className="banner-item-container">
                <img src={seikoPoster} />
                <div className="banner-item" data-brand-name="Seiko"></div>
                <button className="btn btn-sm ab-shop-btn">Shop Now</button>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// EXPLORE BANNER COMPONENT*******************************
// EXPLORE BANNER COMPONENT*******************************

export const ExploreBanner = () => {
  return (
    <>
      <div
        className="ExploreBanner-Container"
        data-aos-delay="200"
        data-aos="fade-up"
      >
        <div className="img-container">
          <img src={tissotSRVPoster} title="explore banner" />
        </div>
        <div className="description">
          <div className="title-container">
            <h1 className="sub-heading">Time Well Kept</h1>
            <p className="sub-text">
              Watches are the only accessory that never goes out of style. It’s
              not just timekeeping, it’s presence.
            </p>
          </div>

          <button className="btn ">Explore More</button>
        </div>
      </div>
    </>
  );
};
