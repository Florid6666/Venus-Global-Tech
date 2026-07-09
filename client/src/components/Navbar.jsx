import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useContent } from '../hooks/useContent';
import RichText from './RichText';
import './navbar.css';

const Navbar = () => {
  const { content } = useContent('navbar');
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  if (!content) {
    return <nav className="navbar" />;
  }

  const { logo, logoAlt, menuItems = [], callText, phoneNumber, whatsappLink } = content;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/" className="logo-link" onClick={handleLinkClick}>
            <img src={logo} alt={logoAlt} className="logo-img" />
          </Link>
        </div>

        <div className="nav-divider"></div>

        <div className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            {menuItems.map((item) => (
              <li
                key={item.label}
                className={`nav-item ${item.submenu ? 'dropdown' : ''} ${location.pathname === item.path ? 'active' : ''}`}
                {...(item.submenu
                  ? {
                      onMouseEnter: () => setIsServicesOpen(true),
                      onMouseLeave: () => setIsServicesOpen(false),
                      onClick: () => setIsServicesOpen(!isServicesOpen),
                    }
                  : {})}
              >
                {item.submenu ? (
                  <>
                    <a href="#" className="nav-link">
                      <RichText html={item.label} as="span" />
                      <i className="fas fa-chevron-down"></i>
                    </a>
                    {isServicesOpen && (
                      <div className="dropdown-menu">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.label}
                            to={sub.path}
                            className="dropdown-item"
                            onClick={handleLinkClick}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link to={item.path} className="nav-link" onClick={handleLinkClick}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          {/* Mobile-only call option */}
          <div className="mobile-only">
            <div className="nav-call">
              <button className="nav-call-wrap" onClick={() => window.open(whatsappLink, '_blank')}>
                <i className="fas fa-phone"></i>
                <span>Call Us</span>
              </button>
            </div>
          </div>
        </div>

        <div className="nav-divider"></div>

        <div className="nav-contact">
          <div className="contact-info">
            <div className="contact-text">{callText}</div>
            <div className="contact-number" onClick={() => window.open(whatsappLink, '_blank')} style={{cursor: 'pointer'}}>{phoneNumber}</div>
          </div>
          <div className="contact-icon">
            <i className="fas fa-phone"></i>
          </div>
        </div>

        {/* Hamburger Toggle */}
        <button className={`nav-toggle ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="nav-toggle-bar"></span>
          <span className="nav-toggle-bar"></span>
          <span className="nav-toggle-bar"></span>
        </button>
      </div>
      {isMenuOpen && <div className="nav-overlay" onClick={() => setIsMenuOpen(false)}></div>}
    </nav>
  );
};

export default Navbar;
