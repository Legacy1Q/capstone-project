import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTiktok,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__container">
        <h1>Fusion</h1>
        <Link to="/movies">
          <p>Movies</p>
        </Link>
        <Link to="/tv">
          <p>TV</p>
        </Link>
        <Link to="/games">
          <p>Games</p>
        </Link>
      </div>

      <div className="footer__links">
        <Link to="https://www.instagram.com">
          <FontAwesomeIcon icon={faInstagram} />
        </Link>
        <Link to="https://www.tiktok.com">
          <FontAwesomeIcon icon={faTiktok} />
        </Link>
        <Link to="https://www.twitter.com">
          <FontAwesomeIcon icon={faTwitter} />
        </Link>
      </div>
    </div>
  );
}

export default Footer;
