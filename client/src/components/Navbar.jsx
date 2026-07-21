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
        
        {/* Left Side Logo */}
        <div className="nav-logo">
          <Link to="/" className="logo-link" onClick={handleLinkClick}>
            <img src={logo} alt={logoAlt || "Venus Global Tech"} className="logo-img" />
          </Link>
        </div>

        {/* Center Navigation Menu */}
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
                      <i className="fas fa-chevron-down nav-chevron"></i>
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

          {/* Mobile-only CTA */}
          <div className="mobile-only">
            <div className="nav-mobile-cta">
              <button 
                className="nav-btn-primary full-width" 
                onClick={() => {
                  handleLinkClick();
                  window.open(whatsappLink || 'https://wa.me/16477220837', '_blank');
                }}
              >
                <i className="fas fa-phone-alt"></i>
                <span>Book a Call</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side Call Info & Book a Call Button */}
        <div className="nav-right-actions">
          
          {/* Call Any Time Block */}
          <div 
            className="nav-call-block" 
            onClick={() => window.open(whatsappLink || 'https://wa.me/16477220837', '_blank')}
          >
            <div className="nav-call-icon-badge">
              <i className="fas fa-phone-alt"></i>
            </div>
            <div className="nav-call-text-wrap">
              <span className="nav-call-label">{callText || 'Call Any Time'}</span>
              <span className="nav-call-number">{phoneNumber || '647-722-0837'}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="nav-action-divider"></div>

          {/* Book a Call CTA Pill Button */}
          <button 
            className="nav-btn-primary"
            onClick={() => window.open(whatsappLink || 'https://wa.me/16477220837', '_blank')}
          >
            Book a Call
          </button>

        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className={`nav-toggle ${isMenuOpen ? 'open' : ''}`} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Navigation"
        >
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
