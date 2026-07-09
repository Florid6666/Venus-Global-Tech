import React from 'react';
import { useContent } from '../hooks/useContent';
import RichText from './RichText';
import './footer.css'; // Import the dedicated footer CSS file

const Footer = () => {
  const { content } = useContent('footer');

  if (!content) {
    return <footer className="footer" />;
  }

  const { brand, quickLinks, services, contact, copyright, bottomLinks = [] } = content;

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">{brand?.name}</div>
            <RichText html={brand?.description} as="p" className="footer-description" />
            <div className="footer-social">
              {brand?.socialLinks?.map((social) => (
                <a key={social.platform} href={social.url} className="social-link" aria-label={social.platform}>
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>{quickLinks?.title}</h3>
            <ul className="footer-links">
              {quickLinks?.links?.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    target={link.url?.startsWith('http') ? '_blank' : undefined}
                    rel={link.url?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h3>{services?.title}</h3>
            <ul className="footer-links">
              {services?.links?.map((link) => (
                <li key={link.label}><a href={link.url}>{link.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Connect With Us */}
          <div className="footer-section">
            <h3>{contact?.title}</h3>
            <div className="footer-contact">
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <span>
                  <a
                    href={`mailto:${contact?.email}?subject=Inquiry from Venus Global Technology Website&body=Hello,%0D%0A%0D%0AI am interested in learning more about your services. Please contact me at your earliest convenience.%0D%0A%0D%0AThank you!`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contact?.email}
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            {copyright}
          </div>
          <div className="footer-bottom-links">
            {bottomLinks.map((link) => (
              <a key={link.label} href={link.url}>{link.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
