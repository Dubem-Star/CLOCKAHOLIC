import "@/assets/css/App.css";
import "@/assets/css/App2.css";
import { useState } from "react";

import citizenPoster1 from "@/assets/images/watch_posters/Citizen_Poster_1.jpg";

import tissotSRVPoster from "@/assets/images/watch_posters/Tissot_SRV.png";

// AD BANNER COMPONENT*******************************
// AD BANNER COMPONENT*******************************

export const AdBanner = () => {
  // const [bannerName, setBannerName] = useState("");

  // function handleHover(e) {
  //   const currentBannerItem = e.target.dataset.brandName;
  //   setBannerName(currentBannerItem);
  // }

  return (
    <div
      className="Ad-Banner-Container"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <div className="banner-description">
        <div className="title-container ">
          <h1 className="banner-heading">Time, Perfected</h1>
          <p className="sub-text">
            A watch isn’t just worn, it’s carried with intention. Precision on
            your wrist. Presence in every moment.
          </p>
        </div>

        <button className="banner-button">Explore More</button>
      </div>

      <div className="banner-img-container">
        <img src={citizenPoster1} title="explore banner" />
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
        <div className="banner-img-container">
          <img src={tissotSRVPoster} title="explore banner" />
        </div>
        <div className="banner-description">
          <div className="title-container">
            <h1 className="banner-heading">Time Well Kept</h1>
            <p className="sub-text">
              Watches are the only accessory that never goes out of style. It’s
              not just timekeeping, it’s presence.
            </p>
          </div>

          <button className="banner-button">Explore More</button>
        </div>
      </div>
    </>
  );
};
