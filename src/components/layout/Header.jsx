import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Header.css';

const NAV_LINKS = [
  { to: '/collection', label: 'Collection' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/visit', label: 'Visit Us' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  return (
    <>
      <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
        <div className="site-header__inner">
          <Link to="/" className="site-header__logo">
            <span className="logo-wordmark">ZiggyLinks</span>
            <span className="logo-sub">Permanent Jewellery · Accra</span>
          </Link>

          <nav className="site-header__nav">
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'nav-link--active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="site-header__actions">
            <Link to="/visit" className="btn btn--outline header-cta">
              Book a Visit
            </Link>
            <button
              className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
        <nav className="mobile-menu__nav">
          {NAV_LINKS.map((link, i) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="mobile-nav-link"
              style={{ transitionDelay: menuOpen ? `${i * 0.05}s` : '0s' }}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/visit" className="btn btn--primary mobile-cta">
            Book a Visit
          </Link>
        </nav>
        <div className="mobile-menu__footer">
          <span className="t-small">Permanent Jewellery Studio</span>
          <span className="t-small">Accra, Ghana</span>
        </div>
      </div>
    </>
  );
}
