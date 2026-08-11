import React from 'react';
import './IntegrationsBannerV2.css';

// SVG Vector Icons for Enterprise & Reference Integrations
const INTEGRATION_SVGS = {
  salesforce: (
    <svg viewBox="0 0 24 24" fill="none" className="v2-brand-svg">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#00A1E0"/>
    </svg>
  ),
  sap: (
    <svg viewBox="0 0 24 24" fill="none" className="v2-brand-svg">
      <rect width="24" height="24" rx="4" fill="#008FD3"/>
      <path d="M3.5 16.5L8 7.5H11.5L7 16.5H3.5ZM12 7.5H19.5C19.5 7.5 20.5 9.8 18 12C20.5 14.2 19.5 16.5 19.5 16.5H12V7.5ZM15 10.5V9.2H17C17 9.2 18 9.2 18 10.5C18 11.8 17 11.8 17 11.8H15V10.5Z" fill="#FFFFFF"/>
    </svg>
  ),
  aws: (
    <svg viewBox="0 0 24 24" fill="none" className="v2-brand-svg">
      <path d="M6.7 13.3c0-.6.1-1.1.4-1.5.3-.4.7-.6 1.3-.6.5 0 .9.2 1.2.5.3.3.4.8.4 1.4v2.7c0 .5-.1 1-.4 1.3-.3.4-.7.6-1.2.6-.6 0-1-.2-1.3-.6-.3-.4-.4-.9-.4-1.5v-2.3zm-2.3 3.6c.7.7 1.7 1.1 2.8 1.1 1 0 1.9-.3 2.5-.9v.7h2.1v-6.9h-2.1v.7c-.6-.6-1.5-.9-2.5-.9-1.2 0-2.1.4-2.8 1.1-.7.8-1.1 1.8-1.1 3.1 0 1.3.4 2.3 1.1 3.1zM18.8 17.8l-1.3-4.5-1.3 4.5h-2.1l-2-6.9h2.2l1.1 4.5 1.3-4.5h1.7l1.3 4.5 1.1-4.5h2.2l-2 6.9h-2.5z" fill="#FF9900"/>
      <path d="M4 19.5c5 2.5 11 2.5 16-1" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  snowflake: (
    <svg viewBox="0 0 24 24" fill="none" className="v2-brand-svg">
      <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" stroke="#29B5E8" strokeWidth="2.2" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="2.8" fill="#29B5E8"/>
    </svg>
  ),
  hubspot: (
    <svg viewBox="0 0 24 24" fill="none" className="v2-brand-svg">
      <path d="M17.5 10.5V7.8a2.5 2.5 0 1 0-2 0v2.7A5.5 5.5 0 0 0 11 15.5v.3a3.5 3.5 0 1 0 2 0v-.3a3.5 3.5 0 0 1 3.5-3.5h.3a2.5 2.5 0 1 0 0-2h-.3z" fill="#FF7A59"/>
    </svg>
  ),
  jira: (
    <svg viewBox="0 0 24 24" fill="none" className="v2-brand-svg">
      <path d="M11.57 11.43L6.05 5.91a.8.8 0 0 0-1.13 0L.37 10.46a.8.8 0 0 0 0 1.13l5.52 5.52 5.68-5.68z" fill="#2684FF"/>
      <path d="M23.63 11.43l-5.52-5.52a.8.8 0 0 0-1.13 0l-4.55 4.55 5.68 5.68 5.52-5.52a.8.8 0 0 0 0-1.21z" fill="#0052CC"/>
    </svg>
  ),
  slack: (
    <svg viewBox="0 0 24 24" fill="none" className="v2-brand-svg">
      <path d="M6 15a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0-2.5H3.5a2.5 2.5 0 1 1 0-5H6v5.5z" fill="#E01E5A"/>
      <path d="M9 6a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0zm2.5 0V3.5a2.5 2.5 0 1 1 5 0V6h-5.5z" fill="#36C5F0"/>
      <path d="M18 9a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zm0 2.5h2.5a2.5 2.5 0 1 1 0 5H18v-5.5z" fill="#2EB67D"/>
      <path d="M15 18a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zm-2.5 0v2.5a2.5 2.5 0 1 1-5 0V18h5.5z" fill="#ECB22E"/>
    </svg>
  ),
  azure: (
    <svg viewBox="0 0 24 24" fill="none" className="v2-brand-svg">
      <path d="M13.05 2.45L4.85 15.65h6.35l-3.3 5.9 11.25-11.45h-6.1l3.05-7.65z" fill="#0089D6"/>
    </svg>
  ),
  duolingo: (
    <svg viewBox="0 0 24 24" fill="none" className="v2-brand-svg">
      <path d="M12 3C7 3 4 6 4 11c0 4 2 7 5 9v1a1 1 0 0 0 2 0v-1h2v1a1 1 0 0 0 2 0v-1c3-2 5-5 5-9 0-5-3-8-8-8z" fill="#78C800"/>
      <circle cx="9.5" cy="10.5" r="2.5" fill="#FFFFFF"/>
      <circle cx="14.5" cy="10.5" r="2.5" fill="#FFFFFF"/>
      <circle cx="9.5" cy="10.5" r="1" fill="#4B4B4B"/>
      <circle cx="14.5" cy="10.5" r="1" fill="#4B4B4B"/>
      <path d="M10 14.5c1 1 3 1 4 0" stroke="#FFC800" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  messenger: (
    <svg viewBox="0 0 24 24" fill="none" className="v2-brand-svg">
      <path d="M12 2C6.48 2 2 6.03 2 11c0 2.87 1.47 5.42 3.76 7.07V22l3.83-2.11C10.45 20.27 11.21 20.36 12 20.36c5.52 0 10-4.03 10-9.03S17.52 2 12 2z" fill="url(#msgGrad)"/>
      <path d="M6.5 12.5l3.5-3.5 2.5 2.5 4.5-4.5-3.5 3.5-2.5-2.5-4.5 4.5z" fill="#FFFFFF"/>
      <defs>
        <linearGradient id="msgGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0084FF"/>
          <stop offset="0.5" stopColor="#A833E1"/>
          <stop offset="1" stopColor="#FF5252"/>
        </linearGradient>
      </defs>
    </svg>
  ),
  skype: (
    <svg viewBox="0 0 24 24" fill="none" className="v2-brand-svg">
      <path d="M12 2c5.5 0 10 4.5 10 10 0 1.6-.4 3.1-1.1 4.4.2.8.3 1.7.3 2.6 0 3.3-2.7 6-6 6-.9 0-1.8-.1-2.6-.3C15.1 23.6 13.6 24 12 24c-5.5 0-10-4.5-10-10 0-1.6.4-3.1 1.1-4.4C2.9 8.8 2.8 7.9 2.8 7c0-3.3 2.7-6 6-6 .9 0 1.8.1 2.6.3C12.7 0.4 14.2 0 15.8 0" fill="#00AFF0"/>
      <path d="M15.5 14.8c-.5.8-1.4 1.4-2.7 1.7-1.3.3-2.7.2-3.8-.3-.3-.1-.5-.4-.4-.7.1-.3.4-.5.7-.4.9.4 2 .5 3.1.2 1-.2 1.7-.7 2.1-1.3.4-.6.4-1.3.1-1.8-.3-.5-1-.9-2.1-1.2l-1.1-.3c-1.4-.4-2.3-1-2.7-1.7-.4-.7-.4-1.6 0-2.4.5-.8 1.4-1.4 2.6-1.6 1.2-.2 2.5-.1 3.5.3.3.1.5.4.4.7-.1.3-.4.5-.7.4-.8-.3-1.8-.4-2.8-.2-.9.2-1.6.6-1.9 1.1-.3.5-.3 1.1 0 1.6.3.4 1 .8 2 1.1l1.1.3c1.5.4 2.4 1 2.8 1.7.5.8.5 1.8.1 2.8z" fill="#FFFFFF"/>
    </svg>
  ),
  telegram: (
    <svg viewBox="0 0 24 24" fill="none" className="v2-brand-svg">
      <circle cx="12" cy="12" r="10" fill="#24A1DE"/>
      <path d="M7.5 11.8l9.2-3.8c.4-.2.8.1.7.5l-1.6 7.5c-.1.5-.4.6-.8.4l-2.4-1.8-1.2 1.1c-.1.1-.3.2-.5.2l.2-2.5 4.5-4.1c.2-.2 0-.3-.3-.1l-5.6 3.5-2.4-.8c-.5-.1-.5-.5.1-.7z" fill="#FFFFFF"/>
    </svg>
  ),
  discord: (
    <svg viewBox="0 0 24 24" fill="none" className="v2-brand-svg">
      <rect width="24" height="24" rx="6" fill="#5865F2"/>
      <path d="M16.5 7.5s-.6-.7-1.4-.9c0 0-.2.3-.3.5-1-.1-2-.1-3 0-.1-.2-.3-.5-.3-.5-.8.2-1.4.9-1.4.9-1.5 2.3-1.9 4.5-1.7 6.7 1 .7 1.9 1.1 2.9 1.4.2-.3.4-.7.6-1-.3-.1-.7-.3-1-.5.1-.1.2-.1.3-.2 1.9.9 4 .9 5.8 0 .1.1.2.1.3.2-.3.2-.7.4-1 .5.2.3.4.7.6 1 1-.3 1.9-.7 2.9-1.4.3-2.5-.4-4.7-1.9-6.7zM9.5 13.5c-.6 0-1-.5-1-1.2s.4-1.2 1-1.2 1 .5 1 1.2-.4 1.2-1 1.2zm5 0c-.6 0-1-.5-1-1.2s.4-1.2 1-1.2 1 .5 1 1.2-.4 1.2-1 1.2z" fill="#FFFFFF"/>
    </svg>
  )
};

const DEFAULT_ALL_TECHNOLOGIES = [
  // AI & ML (Inner Ring)
  { id: 'openai', name: 'OpenAI', iconUrl: '/images/homev2/tech_openai.png', color: '#10a37f' },
  { id: 'python', name: 'Python', iconFont: 'fa-python', color: '#3776ab', isBrand: true },
  { id: 'langchain', name: 'LangChain', iconUrl: '/images/homev2/tech_langchain.png', color: '#2563eb' },
  { id: 'azure-ai', name: 'Azure AI', iconUrl: '/images/homev2/tech_azure_ai.png', color: '#0078d4' },
  { id: 'vector-db', name: 'Vector DBs', iconFont: 'fa-database', color: '#9333ea', isBrand: false },
  { id: 'ml', name: 'Machine Learning', iconFont: 'fa-microchip', color: '#0891b2', isBrand: false },

  // Languages & Frameworks (Middle Ring)
  { id: 'react', name: 'React', iconFont: 'fa-react', color: '#61dafb', isBrand: true },
  { id: 'nodejs', name: 'Node.js', iconFont: 'fa-node-js', color: '#68a063', isBrand: true },
  { id: 'angular', name: 'Angular', iconFont: 'fa-angular', color: '#dd0031', isBrand: true },
  { id: 'java', name: 'Java', iconFont: 'fa-java', color: '#f89820', isBrand: true },
  { id: 'dotnet', name: '.NET', iconUrl: '/images/homev2/tech_dotnet.png', color: '#512bd4' },
  { id: 'docker', name: 'Docker', iconFont: 'fa-docker', color: '#2496ed', isBrand: true },
  { id: 'kubernetes', name: 'Kubernetes', iconFont: 'fa-dharmachakra', color: '#326ce5', isBrand: false },
  { id: 'devops', name: 'DevOps', iconFont: 'fa-infinity', color: '#ea580c', isBrand: false },

  // Cloud & Enterprise Platforms (Outer Ring)
  { id: 'aws', name: 'AWS', iconFont: 'fa-aws', color: '#ff9900', isBrand: true },
  { id: 'azure', name: 'Microsoft Azure', iconFont: 'fa-microsoft', color: '#0078d4', isBrand: true },
  { id: 'gcp', name: 'Google Cloud', iconFont: 'fa-google', color: '#4285f4', isBrand: true },
  { id: 'salesforce', name: 'Salesforce', iconFont: 'fa-salesforce', color: '#00a1e0', isBrand: true },
  { id: 'sap', name: 'SAP', iconUrl: '/images/homev2/tech_sap.png', color: '#008fd3' },
  { id: 'powerbi', name: 'Power BI', iconUrl: '/images/homev2/tech_powerbi.png', color: '#f2c811' },
  { id: 'dynamics', name: 'Microsoft Dynamics', iconUrl: '/images/homev2/tech_dynamics.png', color: '#002050' }
];

/**
 * Enterprise Technologies Banner Section
 * 
 * Recreates exact asymmetrical notched geometry card with:
 * - Left section: White Title text ("Technologies We Work With"), badge removed.
 * - Right section: Infinite marquee scrolling left to right with all technology rotating components from the upper section.
 * 
 * @param {Object} props
 * @param {string} [props.title] - Dynamic headline text (Default: "Technologies We Work With")
 * @param {string} [props.badgeText] - Optional badge pill label (Default: null)
 * @param {Array} [props.integrations] - List of tech items
 * @param {string} [props.className] - Additional CSS container wrapper class
 */
const IntegrationsBannerV2 = ({
  title = "Technologies We Work With",
  badgeText = null,
  integrations,
  className = ""
}) => {
  const itemsList = (integrations && integrations.length > 0) ? integrations : DEFAULT_ALL_TECHNOLOGIES;
  // Duplicate list to achieve a seamless infinite loop
  const marqueeItems = [...itemsList, ...itemsList];

  return (
    <section className={`v2-integrations-section ${className}`}>
      <div className="v2-integrations-card-outer">

        {/* Precise Asymmetrical Card Background with Bottom-Left Notch SVG */}
        <svg
          className="v2-integrations-card-svg-bg"
          viewBox="0 0 1200 170"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E222D" />
              <stop offset="100%" stopColor="#12141A" />
            </linearGradient>

            <filter id="cardShadow" x="-5%" y="-5%" width="110%" height="120%">
              <feDropShadow dx="0" dy="20" stdDeviation="15" floodColor="#000000" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* Asymmetrical Shell Path with S-Curve Notch at Bottom Left */}
          <path
            d="
              M 28 0
              L 1172 0
              C 1187 0, 1200 13, 1200 28
              L 1200 142
              C 1200 157, 1187 170, 1172 170
              L 470 170
              C 445 170, 440 120, 415 120
              L 28 120
              C 13 120, 0 107, 0 92
              L 0 28
              C 0 13, 13 0, 28 0
              Z
            "
            fill="url(#cardGrad)"
            stroke="rgba(255, 255, 255, 0.09)"
            strokeWidth="1.2"
          />

          {/* Subtle baseline under the notched left section */}
          <line x1="0" y1="170" x2="440" y2="170" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" />
        </svg>

        {/* Foreground Content Stack */}
        <div className="v2-integrations-content-inner">
          
          {/* Left Headline Section */}
          <div className="v2-integrations-left-col">
            {badgeText && (
              <div className="v2-integrations-badge-pill">
                <span className="v2-integrations-pulse-dot" />
                <span className="v2-integrations-badge-text">{badgeText}</span>
              </div>
            )}
            <h2 className="v2-integrations-headline">{title}</h2>
          </div>

          {/* Right Icon Infinite Marquee Container */}
          <div className="v2-integrations-right-col">
            <div className="v2-integrations-marquee-track">
              {marqueeItems.map((item, idx) => {
                const iconElement = item.iconSvg || (item.iconKey && INTEGRATION_SVGS[item.iconKey]) || (
                  item.iconFont ? (
                    <i className={`${item.isBrand ? 'fab' : 'fas'} ${item.iconFont} v2-brand-fa-icon`} style={{ color: item.color || '#3B82F6' }} />
                  ) : item.iconUrl ? (
                    <img src={item.iconUrl} alt={item.name} className="v2-brand-img" />
                  ) : (
                    <div className="v2-brand-fallback">{item.name.charAt(0)}</div>
                  )
                );

                return item.linkUrl ? (
                  <a
                    key={`${item.id || item.name}-${idx}`}
                    className="v2-integration-tile-item"
                    href={item.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="v2-integration-squircle">
                      {iconElement}
                    </div>
                    <span className="v2-integration-tile-label">{item.name}</span>
                  </a>
                ) : (
                  <div
                    key={`${item.id || item.name}-${idx}`}
                    className="v2-integration-tile-item"
                  >
                    <div className="v2-integration-squircle">
                      {iconElement}
                    </div>
                    <span className="v2-integration-tile-label">{item.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IntegrationsBannerV2;

