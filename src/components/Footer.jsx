import "@/assets/css/App.css";
import "@/assets/css/App2.css";
import footerLogo from "@/assets/images/Logo/clockaholic_navbar_logo.png";
import instagramLogo from "@/assets/images/img_icons/instagram.png";
import tiktokLogo from "@/assets/images/img_icons/tiktok.png";
import facebookLogo from "@/assets/images/img_icons/facebook.png";
import twitterLogo from "@/assets/images/img_icons/twitter.png";
export const Footer = () => {
  return (
    <>
      <div className="Footer">
        <div className="inner-cont">
          {/* ****************About Clockaholic Section********************* */}
          {/* ****************About Clockaholic Section********************* */}

          <div className="about-us">
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
          <div className="footer-lists quick-links">
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
          <div className="footer-lists legal">
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

          <div className="social-links">
            <h1>Visit Us</h1>
            <ul>
              <li>
                <a href="#">
                  <img src={instagramLogo} />
                </a>
              </li>
              <li>
                <a href="#">
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

        <div className="bottom-cont">
          <p> © 2025 Clockaholic. All Rights Reserved </p>
          <span className="message">
            made with ❤️ by{" "}
            <span className="dubby">
              <a
                href="https://i.pinimg.com/1200x/44/38/88/443888be638e9c0f6af53609d383fa61.jpg"
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
};
