import React from 'react';
import '../components/home.css';

const GlobalOffices = ({ offices }) => {
  const officesToDisplay = offices || [];

  return (
    <section className="upper-footer">
      <div className="upper-footer-container">
        <div className="upper-footer-header">
          <h2>Our Office Locations</h2>
          <p>Connect with us across multiple locations worldwide</p>
        </div>
        
        <div className="offices-grid">
          {officesToDisplay.map((office, index) => (
            <div key={index} className="office-card">
              <div className="office-header">
                <div className="office-flag">
                  <img 
                    src={office.flag} 
                    alt={`${office.country} Flag`} 
                    style={{width: '24px', height: '16px', objectFit: 'cover'}} 
                  />
                </div>
                <h3>{office.city}</h3>
              </div>
              <div className="office-details">
                <div className="office-address">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{office.address}</span>
                </div>
                {office.phones && office.phones.length > 0 && (
                  <div className={office.phones.length > 1 ? "office-phones" : "office-phone"}>
                    {office.phones.map((phone, phoneIndex) => (
                      <div key={phoneIndex} className={office.phones.length > 1 ? "office-phone" : ""}>
                        <i className="fas fa-phone"></i>
                        <a href={phone.whatsapp} target="_blank" rel="noopener noreferrer">
                          {phone.number}
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalOffices;



