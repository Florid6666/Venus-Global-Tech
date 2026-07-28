import React from 'react';
import { useContent } from '../../hooks/useContent';
import './FooterV2.css';

const DEFAULT_FOOTER = {
  brand: {
    name: 'Venus Global Tech',
    tagline: 'ENTERPRISE AI • CLOUD • SOFTWARE',
    description: 'Leading provider of innovative technology solutions, digital transformation, and cutting-edge software development services. We help businesses stay competitive and future-proof through technology, compliance & innovation.',
    socialLinks: [
      { platform: 'Facebook', icon: 'fab fa-facebook-f', url: 'https://facebook.com' },
      { platform: 'Twitter', icon: 'fab fa-twitter', url: 'https://twitter.com' },
      { platform: 'Instagram', icon: 'fab fa-instagram', url: 'https://instagram.com' },
      { platform: 'LinkedIn', icon: 'fab fa-linkedin-in', url: 'https://linkedin.com' }
    ]
  },
  // Fallback only for before content.json loads — kept identical in shape and
  // content to the real (admin-editable) footer.quickLinks/services/bottomLinks
  // data below, so there's no flash of different links. Every url here must
  // resolve to a real route or a real anchor id on the home page — no
  // placeholder pages (e.g. a bare /services or /privacy that doesn't exist).
  companyLinks: [
    { label: 'Home', url: '/' },
    { label: 'About Us', url: '/about' },
    { label: 'Why Choose Us', url: '/#why-choose-us' },
    { label: 'Working Process', url: '/#strategy-to-technology' },
    { label: 'Technologies', url: '/#technology-stack' },
    { label: 'ESG & Compliance', url: '/#esg-compliance-services' },
    { label: 'Contact Us', url: '/contact' },
    { label: 'Get Free Quote', url: 'https://wa.me/16477616277' }
  ],
  serviceLinks: [
    { label: 'Software & Data AI', url: '/software-data-ai' },
    { label: 'Agentic AI Solutions', url: '/agentic-ai' },
    { label: 'Cloud Services', url: '/cloud-service' },
    { label: 'Digital Marketing', url: '/digital-reach' },
    { label: 'ESG Solutions', url: '/esg' },
    { label: 'IATF Auditing', url: '/iatf-auditing' },
    { label: 'ERP AI', url: '/erp-ai' }
  ],
  contact: {
    email: 'info@venusglobaltech.com',
    phone: '647-722-0837',
    whatsapp: 'https://wa.me/16477220837',
    hours: 'Mon - Fri: 8:30 AM - 5:30 PM EST'
  },
  copyright: '© 2024 Venus Global Technology. All rights reserved.',
  legalLinks: [
    { label: 'Security & Compliance', url: '/#esg-compliance-services' }
  ]
};

const FooterV2 = () => {
  const { content: footerContent } = useContent('footer');
  const { content: navbarContent } = useContent('navbar');

  const brand = footerContent?.brand || DEFAULT_FOOTER.brand;
  const companyLinks = footerContent?.quickLinks?.links?.length > 0 ? footerContent.quickLinks.links : DEFAULT_FOOTER.companyLinks;
  const serviceLinks = footerContent?.services?.links?.length > 0 ? footerContent.services.links : DEFAULT_FOOTER.serviceLinks;
  const contact = footerContent?.contact || DEFAULT_FOOTER.contact;
  const copyright = footerContent?.copyright || DEFAULT_FOOTER.copyright;
  const legalLinks = footerContent?.bottomLinks?.length > 0 ? footerContent.bottomLinks : DEFAULT_FOOTER.legalLinks;

  const logoImg = footerContent?.brand?.logo || footerContent?.brand?.logoImg || navbarContent?.logo;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="v2-footer" id="main-footer">
      {/* Top Border Accent Line */}
      <div className="v2-footer-accent-line"></div>
      
      {/* Background Ambient Glows */}
      <div className="v2-footer-glow glow-1"></div>
      <div className="v2-footer-glow glow-2"></div>

      <div className="v2-footer-container">
        
        {/* TOP SECTION: 4-COLUMN ENTERPRISE GRID */}
        <div className="v2-footer-grid">
          
          {/* Column 1: Brand & Mission */}
          <div className="v2-footer-col col-brand">
            <div className="v2-footer-logo-wrap" onClick={scrollToTop}>
              {logoImg ? (
                <img 
                  src={logoImg} 
                  alt={brand.name || 'Venus Global Tech Logo'} 
                  className="v2-footer-logo-img" 
                />
              ) : (
                <div className="v2-footer-logo-icon">VGT</div>
              )}
              <div className="v2-footer-logo-text">
                <span className="v2-brand-title">{brand.name || 'Venus Global Tech'}</span>
                <span className="v2-brand-sub">{brand.tagline || 'ENTERPRISE AI • CLOUD • SOFTWARE'}</span>
              </div>
            </div>

            <p className="v2-footer-brand-desc">
              {brand.description || DEFAULT_FOOTER.brand.description}
            </p>

            {/* Social Links Circle Icons */}
            <div className="v2-footer-socials">
              {(brand.socialLinks || DEFAULT_FOOTER.brand.socialLinks).map((social, idx) => (
                <a 
                  key={social.platform || idx} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="v2-social-btn"
                  aria-label={social.platform}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Company Links */}
          <div className="v2-footer-col">
            <h4 className="v2-footer-col-title">{footerContent?.quickLinks?.title || 'Company'}</h4>
            <ul className="v2-footer-links-list">
              {companyLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.url}>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Solutions & Services */}
          <div className="v2-footer-col">
            <h4 className="v2-footer-col-title">{footerContent?.services?.title || 'Solutions & Services'}</h4>
            <ul className="v2-footer-links-list">
              {serviceLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.url}>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Direct Support */}
          <div className="v2-footer-col col-contact">
            <h4 className="v2-footer-col-title">Connect With Us</h4>
            
            <div className="v2-footer-contact-details">
              
              {/* Email */}
              <div className="v2-contact-item">
                <span className="v2-contact-icon"><i className="fas fa-envelope"></i></span>
                <a href={`mailto:${contact.email}`} className="v2-contact-link">
                  {contact.email}
                </a>
              </div>

              {/* Phone */}
              {contact.phone && (
                <div className="v2-contact-item">
                  <span className="v2-contact-icon"><i className="fas fa-phone-alt"></i></span>
                  <a href={`tel:${contact.phone}`} className="v2-contact-link">
                    {contact.phone}
                  </a>
                </div>
              )}

              {/* Direct Strategy Whatsapp CTA */}
              <div className="v2-footer-wa-badge">
                <a
                  href={contact.phoneWhatsapp || contact.whatsapp || 'https://wa.me/16477220837'}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="v2-wa-chat-btn"
                >
                  <i className="fab fa-whatsapp"></i>
                  <span>Live Strategy Support</span>
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* BOTTOM BAR: COPYRIGHT & LEGAL LINKS */}
        <div className="v2-footer-bottom">
          <div className="v2-copyright-text">
            {copyright}
          </div>

          <div className="v2-footer-bottom-right">
            <div className="v2-legal-links">
              {legalLinks.map((link, idx) => (
                <a key={idx} href={link.url}>{link.label}</a>
              ))}
            </div>

            {/* Back to Top Floating Button */}
            <button 
              className="v2-back-to-top-btn" 
              onClick={scrollToTop}
              aria-label="Back to top"
              title="Back to top"
            >
              <i className="fas fa-arrow-up"></i>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default FooterV2;
