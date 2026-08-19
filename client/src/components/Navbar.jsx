import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useContent } from '../hooks/useContent';
import defaultContent from '../data/defaultContent.json';
import RichText from './RichText';
import './navbar.css';

// Touch browsers commonly fire a synthetic mouseenter right before click (for
// :hover compatibility), so wiring both hover-to-open and click-to-toggle on
// the same element made a single tap open then immediately re-close itself —
// the dropdown only ever seemed to respond on the second tap. Only wire up
// the hover handlers on devices that actually have a real pointer to hover
// with; touch-only devices get pure click/tap toggling with no interference.
const supportsHover = typeof window !== 'undefined' && window.matchMedia
  ? window.matchMedia('(hover: hover) and (pointer: fine)').matches
  : true;

const Navbar = () => {
  const { content } = useContent('navbar');
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const closeTimeoutRef = useRef(null);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Closing on a short delay (instead of the instant mouseleave) makes the
  // dropdown forgiving of the brief moment the cursor crosses the gap
  // between the "Services" link and the menu below it while moving toward it.
  const openServicesMenu = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsServicesOpen(true);
  };

  const closeServicesMenu = () => {
    closeTimeoutRef.current = setTimeout(() => setIsServicesOpen(false), 250);
  };

  // Tapping/clicking (mobile, or a deliberate desktop click) should toggle
  // right away — only the passive mouseleave gets the forgiving delay above.
  const toggleServicesMenu = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsServicesOpen((prev) => !prev);
  };

  const defaultNav = defaultContent.navbar || {};
  const logo = content?.logo || defaultNav.logo || "/images/02.png";
  const logoAlt = content?.logoAlt || defaultNav.logoAlt || "Venus Global Tech";
  const menuItems = (content?.menuItems && content.menuItems.length > 0) ? content.menuItems : (defaultNav.menuItems || []);
  const callText = content?.callText || defaultNav.callText || "Call Any Time";
  const phoneNumber = content?.phoneNumber || defaultNav.phoneNumber || "647-722-0837";
  const whatsappLink = content?.whatsappLink || defaultNav.whatsappLink || "https://wa.me/16477220837";

  return (
    <nav className={`navbar ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className={`nav-container ${isMenuOpen ? 'menu-open' : ''}`}>
        
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
                {...(item.submenu && supportsHover
                  ? { onMouseEnter: openServicesMenu, onMouseLeave: closeServicesMenu }
                  : {})}
              >
                {item.submenu ? (
                  <>
                    <a
                      href="#"
                      className="nav-link"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleServicesMenu();
                      }}
                    >
                      <RichText html={item.label} as="span" />
                      <i className="fas fa-chevron-down nav-chevron"></i>
                    </a>
                    <div className={`dropdown-menu ${isServicesOpen ? 'open' : ''}`}>
                      {item.submenu.map((sub) => {
                        const isErpAi = sub.label?.trim() === 'ERP AI' || sub.path === '/erp-ai' || sub.path === 'https://vgt-erp-ai-2.vercel.app/';
                        const targetPath = isErpAi ? 'https://vgt-erp-ai-2.vercel.app/' : sub.path;
                        const isExternal = isErpAi || sub.isExternal || targetPath?.startsWith('http');

                        if (isExternal) {
                          return (
                            <a
                              key={sub.label}
                              href={targetPath}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="dropdown-item"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsServicesOpen(false);
                                setIsMenuOpen(false);
                                window.open(targetPath, '_blank', 'noopener,noreferrer');
                              }}
                            >
                              {sub.label}
                            </a>
                          );
                        }
                        return (
                          <Link
                            key={sub.label}
                            to={sub.path}
                            className="dropdown-item"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsServicesOpen(false);
                              setIsMenuOpen(false);
                            }}
                          >
                            {sub.label}
                          </Link>
                        );
                      })}
                    </div>
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
                <span>Book a Call</span>
                <i className="fas fa-phone-alt"></i>
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

        {/* Must stay inside .nav-container: that element's backdrop-filter
            creates its own stacking context, which traps .nav-menu's
            z-index inside it. As a sibling of .nav-container instead (both
            direct children of .navbar), this overlay would paint above the
            entire container — menu included — no matter how high the
            menu's z-index is, since that number only competes against other
            elements sharing its own stacking context. */}
        {isMenuOpen && <div className="nav-overlay" onClick={() => setIsMenuOpen(false)}></div>}

      </div>
    </nav>
  );
};

export default Navbar;
