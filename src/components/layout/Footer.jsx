import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">ZiggyLinks</div>
            <p className="footer-tagline">
              Permanent jewellery, welded with care.<br />
              Studio visits by appointment — Accra, Ghana.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <p className="t-label footer-col-title">Explore</p>
              <Link to="/collection">Collection</Link>
              <Link to="/gallery">Gallery</Link>
              <Link to="/how-it-works">How It Works</Link>
              <Link to="/about">About Us</Link>
            </div>
            <div className="footer-col">
              <p className="t-label footer-col-title">Visit</p>
              <Link to="/visit">Book a Visit</Link>
              <Link to="/faq">FAQ</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/events">Events</Link>
            </div>
            <div className="footer-col">
              <p className="t-label footer-col-title">Care</p>
              <Link to="/aftercare">Jewellery Aftercare</Link>
              <Link to="/policies">Policies</Link>
              <Link to="/testimonials">Testimonials</Link>
            </div>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="t-small">© {year} ZiggyLinks. All rights reserved. Accra, Ghana.</p>
          <div className="footer-socials">
            <a href="https://www.instagram.com/ziggylinks.gh/" target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a>
            <span className="footer-dot">·</span>
            <a href="https://wa.me/233551888606" target="_blank" rel="noopener noreferrer" className="social-link">WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
