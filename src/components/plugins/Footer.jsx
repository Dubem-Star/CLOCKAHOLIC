import footerLogo from "@/assets/images/Logo/clockaholic_navbar_logo.png";
import instagramLogo from "@/assets/images/img_icons/instagram.png";
import tiktokLogo from "@/assets/images/img_icons/tiktok.png";
import facebookLogo from "@/assets/images/img_icons/facebook.png";
import twitterLogo from "@/assets/images/img_icons/twitter.png";

function Footer() {
  return (
    <>
      <div className="Footer">
        <div className="inner-cont main-page-wrapper row gy-5 gx-5">
          {/* ****************About Clockaholic Section********************* */}
          {/* ****************About Clockaholic Section********************* */}

          <div className="about-us col-sm-12 col-md-7 col-lg-4">
            <a href="#">
              <img src={footerLogo} alt="footer-logo" />
            </a>

            <p>
              <span>Clockaholic</span> is the one stop online watch store for
              genuine affordable luxury watches from global brands. Established
              in 2024, we are committed to bringing you the best products.
            </p>
          </div>

          {/* ***************Quick Links Section********************* */}
          {/* ***************Quick Links Section********************* */}
          <div className="col-sm-3 col-md-6 col-lg-2 footer-lists quick-links">
            <h1>Quick Links</h1>
            <ul>
              <li>
                <a href="#" className="underline">
                  My Account
                </a>
              </li>
              <li>
                <a href="#" className="underline">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="underline">
                  News
                </a>
              </li>
              <li>
                <a href="#" className="underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="underline">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* ***************Legal Section********************* */}
          {/* ***************Legal Section********************* */}
          <div className="col-sm-3 col-md-6 col-lg-2 footer-lists legal">
            <h1>Legal</h1>
            <ul>
              <li>
                <a href="#" className="underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="underline">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="underline">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="#" className="underline">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#" className="underline">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="underline">
                  Terms and Condition
                </a>
              </li>
            </ul>
          </div>

          {/* ***************Social Links Section********************* */}
          {/* ***************Social Links Section********************* */}

          <div className="col-sm-3 col-md-5 col-lg-3 social-links">
            <h1>Visit Us</h1>
            <ul>
              <li>
                <a href="https://instagram.com/Clockaholic_hq">
                  <img src={instagramLogo} />
                </a>
              </li>
              <li>
                <a href="https://tiktok.com/@Clockaholic89">
                  <img src={tiktokLogo} />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={facebookLogo} />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={twitterLogo} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="bottom-cont main-page-wrapper">
          <p> © 2025 Clockaholic. All Rights Reserved </p>
          <span className="message">
            made with ❤️ by{" "}
            <span className="dubby">
              <a
                href="https://dubem-star.github.io/PERSONAL-PORTFOLIO/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-reset text-decoration-none"
              >
                dubby
              </a>
            </span>
          </span>
        </div>
      </div>
    </>
  );
}

export default Footer;
