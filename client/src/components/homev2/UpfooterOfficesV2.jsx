import React, { useState, useEffect } from 'react';
import './UpfooterOfficesV2.css';

const DEFAULT_OFFICES = [
  {
    id: 'toronto',
    tabLabel: 'Toronto, Canada',
    title: 'Toronto, Canada Headquarters',
    flag: 'https://flagcdn.com/w40/ca.png',
    address: '#205 - 1085 Bellamy Road North, Toronto, ON',
    phones: [
      { number: '647-722-0837', whatsapp: 'https://wa.me/16477220837' }
    ],
    hours: 'Mon - Fri: 9:00 AM - 5:00 PM EST',
    status: 'Open Now',
    mapQuery: '1085+Bellamy+Road+North+Toronto+ON'
  },
  {
    id: 'michigan',
    tabLabel: 'Michigan, USA',
    title: 'Michigan, USA Regional Hub',
    flag: 'https://flagcdn.com/w40/us.png',
    address: '880 W Long Lake Rd Ste 225 | Troy, MI 48098',
    phones: [
      { number: '248-275-1077', whatsapp: 'https://wa.me/12482751077' },
      { number: '718-715-0770', whatsapp: 'https://wa.me/17187150770' }
    ],
    hours: 'Mon - Fri: 8:30 AM - 5:30 PM EST',
    status: 'Open Now',
    mapQuery: '880+W+Long+Lake+Rd+Ste+225+Troy+MI+48098'
  },
  {
    id: 'india',
    tabLabel: 'India',
    title: 'India Development & Engineering Hub',
    flag: 'https://flagcdn.com/w40/in.png',
    address: 'Mumbai, Surat, Chennai, Hyderabad',
    phones: [
      { number: '+91-261-2601177', whatsapp: 'https://wa.me/912612601177' },
      { number: '+91-261-391177', whatsapp: 'https://wa.me/91261391177' }
    ],
    hours: 'Mon - Fri: 9:30 AM - 6:30 PM IST',
    status: 'Open Now',
    mapQuery: 'Mumbai+Surat+Chennai+Hyderabad+India'
  }
];

const renderFlag = (flag) => {
  if (!flag) return null;
  if (
    typeof flag === 'string' &&
    (flag.startsWith('http') || flag.startsWith('/') || flag.includes('.png') || flag.includes('.svg') || flag.includes('.jpg') || flag.includes('.webp'))
  ) {
    return <img src={flag} alt="Flag" className="v2-flag-img" />;
  }
  return <span className="v2-tab-flag">{flag}</span>;
};

const UpfooterOfficesV2 = ({ offices }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isManual, setIsManual] = useState(false);
  const [detectedHub, setDetectedHub] = useState(null);

  const officesList = (offices && offices.length > 0) ? offices : DEFAULT_OFFICES;
  const currentOffice = officesList[activeTab] || officesList[0];

  // 1. AUTOMATIC LOCATION DETECTION ON INITIAL MOUNT (Timezone + IP fallback)
  useEffect(() => {
    try {
      const tz = (Intl && Intl.DateTimeFormat) ? Intl.DateTimeFormat().resolvedOptions().timeZone || '' : '';
      if (tz.includes('Kolkata') || tz.includes('Calcutta') || tz.includes('India') || tz.includes('Asia/Kolkata')) {
        setActiveTab(2); // India
        setDetectedHub('India');
      } else if (tz.includes('Toronto') || tz.includes('Canada') || tz.includes('Vancouver') || tz.includes('Edmonton')) {
        setActiveTab(0); // Toronto, Canada
        setDetectedHub('Toronto, Canada');
      } else if (tz.includes('America') || tz.includes('Detroit') || tz.includes('New_York') || tz.includes('Chicago')) {
        setActiveTab(1); // Michigan, USA
        setDetectedHub('Michigan, USA');
      }
    } catch (e) {
      // Fallback ignore
    }

    // IP-based coarse country auto-detection
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data && data.country_code) {
          if (data.country_code === 'CA') {
            setActiveTab(0);
            setDetectedHub('Toronto, Canada');
          } else if (data.country_code === 'US') {
            setActiveTab(1);
            setDetectedHub('Michigan, USA');
          } else if (data.country_code === 'IN') {
            setActiveTab(2);
            setDetectedHub('India');
          }
        }
      })
      .catch(() => {});
  }, []);

  // 2. AUTOMATIC ROTATION TIMER (Runs automatically when NOT manually overridden)
  useEffect(() => {
    if (isManual) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % officesList.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isManual, officesList.length]);

  const handleManualSelect = (idx) => {
    setActiveTab(idx);
    setIsManual(true);
  };

  const handleToggleAuto = () => {
    setIsManual(false);
  };

  return (
    <section className="v2-upfooter-section" id="global-offices">
      <div className="v2-upfooter-container">
        
        {/* TWO-COLUMN SPLIT GRID LAYOUT */}
        <div className="v2-upfooter-grid">
          
          {/* LEFT COLUMN: Text Content & Location Selector */}
          <div className="v2-upfooter-left">
            <div className="v2-upfooter-badge">
              <span className="v2-upfooter-badge-icon">🌐</span>
              <span className="v2-upfooter-badge-text">GLOBAL PRESENCE</span>
            </div>

            <h2 className="v2-upfooter-heading">
              Our Global Office Locations
            </h2>

            <p className="v2-upfooter-paragraph">
              Connect with our principal AI engineers, cloud architects, and technology leaders across North America and Asia.
            </p>

            {/* Location Selector Header Row with Auto/Manual Status */}
            <div className="v2-office-tabs-col">
              <div className="v2-tabs-header-row">
                <span className="v2-tabs-label">SELECT LOCATION</span>
                {!isManual ? (
                  <span className="v2-auto-status-pill" title="Automatically detected & cycling. Click any tab for manual control.">
                    <span className="v2-pulse-dot"></span>
                    <span>Auto-Detected {detectedHub ? `(${detectedHub})` : ''}</span>
                  </span>
                ) : (
                  <button 
                    className="v2-auto-resume-btn" 
                    onClick={handleToggleAuto}
                    title="Switch back to automatic location cycling"
                  >
                    <i className="fas fa-play v2-play-icon"></i>
                    <span>Resume Auto</span>
                  </button>
                )}
              </div>

              {/* Location Selector Tabs List */}
              <div className="v2-office-tabs-list">
                {officesList.map((office, idx) => {
                  const isActive = idx === activeTab;
                  const tabLabel = office.tabLabel || office.city || office.country || office.region;
                  const flag = office.flag || DEFAULT_OFFICES[idx % DEFAULT_OFFICES.length].flag;
                  return (
                    <button
                      key={office.id || idx}
                      className={`v2-office-tab-btn ${isActive ? 'active' : ''}`}
                      onClick={() => handleManualSelect(idx)}
                      aria-selected={isActive}
                    >
                      <div className="v2-tab-left">
                        {renderFlag(flag)}
                        <span className="v2-tab-name">{tabLabel}</span>
                        {detectedHub && tabLabel.includes(detectedHub.split(',')[0]) && (
                          <span className="v2-nearest-tag">Nearest</span>
                        )}
                      </div>
                      <i className="fas fa-chevron-right v2-tab-arrow"></i>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Active Location Details Card Panel */}
          <div className="v2-upfooter-right">
            <div className="v2-office-main-panel">
              {/* Panel Header */}
              <div className="v2-panel-header">
                {renderFlag(currentOffice.flag)}
                <h3 className="v2-panel-title">{currentOffice.title || currentOffice.city || currentOffice.country}</h3>
              </div>

              {/* Details Grid */}
              <div className="v2-panel-grid">
                {/* Address */}
                <div className="v2-panel-info-block">
                  <div className="v2-info-label-wrap">
                    <i className="fas fa-map-marker-alt v2-panel-icon"></i>
                    <span className="v2-panel-label">Address</span>
                  </div>
                  <p className="v2-panel-value">{currentOffice.address}</p>
                </div>

                {/* Phone */}
                <div className="v2-panel-info-block">
                  <div className="v2-info-label-wrap">
                    <i className="fas fa-phone-alt v2-panel-icon"></i>
                    <span className="v2-panel-label">Phone Number</span>
                  </div>
                  <div className="v2-panel-phones">
                    {currentOffice.phones?.map((phoneObj, pIdx) => {
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
                          className="v2-panel-phone-link"
                        >
                          <span>{phoneNum}</span>
                          <i className="fab fa-whatsapp"></i>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Business Hours & Status Strip */}
              <div className="v2-panel-hours-strip">
                <div className="v2-hours-left">
                  <i className="far fa-clock v2-clock-icon"></i>
                  <span><strong>Business Hours:</strong> {currentOffice.hours}</span>
                </div>
                <div className="v2-status-badge">
                  <span className="v2-status-dot"></span>
                  <span>{currentOffice.status || 'Open Now'}</span>
                </div>
              </div>

              {/* Full-width CTA Button */}
              <div className="v2-panel-cta-wrap">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(currentOffice.mapQuery || currentOffice.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="v2-panel-map-btn"
                >
                  <i className="fas fa-location-arrow"></i>
                  <span>GET DIRECTIONS</span>
                  <i className="fas fa-arrow-up-right"></i>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default UpfooterOfficesV2;
