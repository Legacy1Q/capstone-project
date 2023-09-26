import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

function Footer() {
  return (
    <div className='footer'>
      <div className="footer__container">
        <h1>Fusion</h1>
        <a href="/movies">
            <p>Movies</p>
        </a>
        <a href="/tv">
            <p>TV</p>
        </a>
        <a href="/games">
            <p>Games</p>
        </a>
      </div>

      <div className="footer__links">
      <a href="https://www.instagram.com"><FontAwesomeIcon icon={faInstagram} /></a>
      <a href="https://www.tiktok.com"><FontAwesomeIcon icon={faTiktok} /></a>
      <a href="https://www.twitter.com"><FontAwesomeIcon icon={faTwitter} /></a>

      </div>
    </div>
  )
}

export default Footer;
