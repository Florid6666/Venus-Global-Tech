import React, { useState } from 'react';
import './UpfooterOfficesV2.css';

const DEFAULT_OFFICES = [
  {
    id: 'usa',
    city: 'Michigan, USA',
    region: 'Michigan, USA',
    country: 'USA',
    flag: 'https://flagcdn.com/w40/us.png',
    address: '880 W Long Lake Rd Ste 225 | Troy, MI 48098',
    phones: [
      { number: '248-275-1077', whatsapp: 'https://wa.me/12482751077' },
      { number: '718-715-0770', whatsapp: 'https://wa.me/17187150770' }
    ],
    hours: 'Mon - Fri: 8:30 AM - 5:30 PM EST',
    mapQuery: '880+W+Long+Lake+Rd+Ste+225+Troy+MI+48098'
  },
  {
    id: 'canada',
    city: 'Toronto, Canada',
    region: 'Ontario, Canada',
    country: 'Canada',
    flag: 'https://flagcdn.com/w40/ca.png',
    address: '100 King Street West, Suite 5600, Toronto, ON M5X 1C9',
    phones: [
      { number: '+1 (416) 555-0144', whatsapp: 'https://wa.me/14165550144' }
    ],
    hours: 'Mon - Fri: 9:00 AM - 6:00 PM EST',
    mapQuery: '100+King+Street+West+Toronto'
  },
  {
    id: 'india',
    city: 'Bhubaneswar, India',
    region: 'Odisha, India',
    country: 'India',
    flag: 'https://flagcdn.com/w40/in.png',
    address: 'DLF Cybercity, Patia, Bhubaneswar, Odisha 751024',
    phones: [
      { number: '+91 98765 43210', whatsapp: 'https://wa.me/919876543210' }
    ],
    hours: 'Mon - Fri: 9:30 AM - 6:30 PM IST',
    mapQuery: 'DLF+Cybercity+Patia+Bhubaneswar'
  }
];

const UpfooterOfficesV2 = ({ offices }) => {
  const [activeOffice, setActiveOffice] = useState(null);

  const officesList = (offices && offices.length > 0) ? offices : DEFAULT_OFFICES;

  return (
    <section className="v2-upfooter-section" id="global-offices">
      {/* Background Radial Glow */}
      <div className="v2-upfooter-glow glow-center"></div>

      <div className="v2-upfooter-container">
        
        {/* HEADER SECTION */}
        <div className="v2-upfooter-header">
          <div className="v2-upfooter-badge">
            <span className="v2-upfooter-badge-icon">🌐</span>
            <span className="v2-upfooter-badge-text">GLOBAL PRESENCE</span>
          </div>

          <h2 className="v2-upfooter-heading">
            Our Worldwide Offices & Engineering Hubs
          </h2>

          <p className="v2-upfooter-paragraph">
            Connect with our principal AI engineers, cloud architects, and technology leaders across North America and Asia.
          </p>
        </div>

        {/* 3-COLUMN OFFICE LOCATION CARDS GRID */}
        <div className="v2-offices-cards-grid">
          {officesList.map((office, index) => {
            const isHovered = activeOffice === index;
            const flagUrl = office.flag || DEFAULT_OFFICES[index % DEFAULT_OFFICES.length].flag;
            const mapQuery = office.mapQuery || `${office.city}+${office.address || office.country}`;

            return (
              <div 
                key={office.id || index}
                className={`v2-office-card ${isHovered ? 'is-hovered' : ''}`}
                onMouseEnter={() => setActiveOffice(index)}
                onMouseLeave={() => setActiveOffice(null)}
              >
                {/* Top Header */}
                <div className="v2-office-card-header">
                  {flagUrl && (
                    <div className="v2-office-flag-container">
                      <img 
                        src={flagUrl} 
                        alt={`${office.country || 'Office'} Flag`}
                        className="v2-office-flag-img"
                      />
                    </div>
                  )}
                  <div className="v2-office-title-wrap">
                    <h3 className="v2-office-city">{office.city || office.country}</h3>
                    <span className="v2-office-region">{office.region || office.country}</span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="v2-office-card-body">
                  
                  {/* Address */}
                  {office.address && (
                    <div className="v2-office-info-row">
                      <span className="v2-info-icon"><i className="fas fa-map-marker-alt"></i></span>
                      <span className="v2-info-text">{office.address}</span>
                    </div>
                  )}

                  {/* Hours */}
                  {office.hours && (
                    <div className="v2-office-info-row">
                      <span className="v2-info-icon"><i className="far fa-clock"></i></span>
                      <span className="v2-info-text">{office.hours}</span>
                    </div>
                  )}

                  {/* Phone & WhatsApp Links */}
                  {office.phones && office.phones.length > 0 && (
                    <div className="v2-office-info-row phones-row">
                      <span className="v2-info-icon"><i className="fas fa-phone-alt"></i></span>
                      <div className="v2-phones-list">
                        {office.phones.map((phoneObj, pIdx) => {
                          const phoneNum = typeof phoneObj === 'string' ? phoneObj : phoneObj.number;
                          const waLink = (typeof phoneObj === 'object' && phoneObj.whatsapp) 
                            ? phoneObj.whatsapp 
                            : `https://wa.me/${phoneNum.replace(/[^0-9]/g, '')}`;
                          return (
                            <a 
                              key={pIdx} 
                              href={waLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="v2-phone-link"
                            >
                              <span>{phoneNum}</span>
                              <i className="fab fa-whatsapp v2-wa-icon"></i>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>

                {/* Footer Action: Directions Link */}
                <div className="v2-office-card-footer">
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(mapQuery)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="v2-office-map-btn"
                  >
                    <span>Get Directions</span>
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default UpfooterOfficesV2;
