import React from 'react';
import './AppIntegrationsMarquee.css';

// SVG Icon Helpers for clean vector brand logos
const MailchimpIcon = () => (
  <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
    <path
      d="M26 13c0-1.5-1-2.5-2.2-2.8-.5-2.2-2.3-4-4.8-4.2-3-.3-5.7 1.2-6.8 3.8-1-.1-2.2.4-3 1.3-1.2 1.3-1.4 3.3-.5 4.9.2.4.5.7.8 1-.2.7-.2 1.4-.1 2.1.3 1.9 1.6 3.4 3.4 4 2.2.7 4.7.1 6.4-1.5.9.3 1.8.3 2.7.1 1.6-.3 2.9-1.5 3.4-3.1.6-1.7.1-3.7-1.2-4.9.3-1 .2-2.1-.3-3.1z"
      fill="#000000"
    />
    <circle cx="13.5" cy="11.5" r="1.5" fill="#FFFFFF" />
    <circle cx="19.5" cy="11.5" r="1.5" fill="#FFFFFF" />
    <path d="M12 17c1.5 2 4.5 2 6 0" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const AsanaIcon = () => (
  <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
    <circle cx="16" cy="9.5" r="4.5" fill="url(#asana-g1)" />
    <circle cx="9.5" cy="20.5" r="4.5" fill="url(#asana-g2)" />
    <circle cx="22.5" cy="20.5" r="4.5" fill="url(#asana-g3)" />
    <defs>
      <linearGradient id="asana-g1" x1="16" y1="5" x2="16" y2="14" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F9655B" />
        <stop offset="1" stopColor="#FF8282" />
      </linearGradient>
      <linearGradient id="asana-g2" x1="9.5" y1="16" x2="9.5" y2="25" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F9655B" />
        <stop offset="1" stopColor="#FC9F72" />
      </linearGradient>
      <linearGradient id="asana-g3" x1="22.5" y1="16" x2="22.5" y2="25" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F9655B" />
        <stop offset="1" stopColor="#FF7A85" />
      </linearGradient>
    </defs>
  </svg>
);

const GoogleDocsIcon = () => (
  <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
    <rect x="7" y="4" width="18" height="24" rx="3" fill="#4285F4" />
    <path d="M19 4L25 10H19V4Z" fill="#A1C2FA" />
    <line x1="11" y1="14" x2="21" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <line x1="11" y1="18" x2="21" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <line x1="11" y1="22" x2="17" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ShopifyIcon = () => (
  <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
    <path d="M22.5 8L20 4H12L9.5 8H5V25C5 26.1 5.9 27 7 27H25C26.1 27 27 26.1 27 25V8H22.5Z" fill="#96BF48" />
    <path d="M16 11C13.5 11 12 12.5 12 14.5C12 18 20 17 20 20.5C20 22.5 18.5 24 16 24C13.5 24 12 22.5 12 22.5L11 25.5C11 25.5 13 27 16 27C20 27 23.5 24.5 23.5 20.5C23.5 15.5 15.5 16.5 15.5 14C15.5 12.5 17 12.5 18 12.5C19.5 12.5 21 13.5 21 13.5L22.5 10.5C22.5 10.5 20 9.5 18 9.5L16 11Z" fill="white" />
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 32 32" width="28" height="28" fill="#0F172A">
    <path fillRule="evenodd" clipRule="evenodd" d="M16 4C9.37 4 4 9.37 4 16c0 5.3 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C24.566 25.797 28 21.3 28 16c0-6.63-5.37-12-12-12z" />
  </svg>
);

const JiraIcon = () => (
  <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
    <path d="M15.4 4.5L7.2 12.7C6.4 13.5 6.4 14.8 7.2 15.6L15.4 23.8C16.2 24.6 17.5 24.6 18.3 23.8L26.5 15.6C27.3 14.8 27.3 13.5 26.5 12.7L18.3 4.5C17.5 3.7 16.2 3.7 15.4 4.5Z" fill="#0052CC" />
    <path d="M15.4 12.5L11.2 16.7C10.4 17.5 10.4 18.8 11.2 19.6L15.4 23.8C16.2 24.6 17.5 24.6 18.3 23.8L22.5 19.6C23.3 18.8 23.3 17.5 22.5 16.7L18.3 12.5C17.5 11.7 16.2 11.7 15.4 12.5Z" fill="#2684FF" />
  </svg>
);

const HubspotIcon = () => (
  <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
    <path d="M21.5 13.5V10.2L24.2 8.6C24.7 8.3 25 7.7 25 7C25 5.9 24.1 5 23 5C22.2 5 21.5 5.5 21.2 6.2L18.5 7.8V6C18.5 4.9 17.6 4 16.5 4C15.4 4 14.5 4.9 14.5 6V13.5C13.6 14.1 13 15.1 13 16.2C13 17.3 13.6 18.3 14.5 18.9V26C14.5 27.1 15.4 28 16.5 28C17.6 28 18.5 27.1 18.5 26V18.9C19.4 18.3 20 17.3 20 16.2C20 15.1 19.4 14.1 18.5 13.5H21.5Z" fill="#FF7A59" />
    <circle cx="23" cy="16.5" r="3.5" fill="#FF7A59" />
  </svg>
);

const ZapierIcon = () => (
  <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
    <rect width="32" height="32" rx="6" fill="#FF4F00" />
    <path d="M8 17H14.5L12 25L24 15H17.5L20 7L8 17Z" fill="white" />
  </svg>
);

const SlackIcon = () => (
  <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
    <path d="M9.5 19C8.1 19 7 17.9 7 16.5C7 15.1 8.1 14 9.5 14H12V16.5C12 17.9 10.9 19 9.5 19Z" fill="#E01E5A" />
    <path d="M12 9.5C12 8.1 13.1 7 14.5 7C15.9 7 17 8.1 17 9.5V12H14.5C13.1 12 12 10.9 12 9.5Z" fill="#36C5F0" />
    <path d="M22.5 13C23.9 13 25 14.1 25 15.5C25 16.9 23.9 18 22.5 18H20V15.5C20 14.1 21.1 13 22.5 13Z" fill="#2EB67D" />
    <path d="M20 22.5C20 23.9 18.9 25 17.5 25C16.1 25 15 23.9 15 22.5V20H17.5C18.9 20 20 21.1 20 22.5Z" fill="#ECB22E" />
  </svg>
);

const SalesforceIcon = () => (
  <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
    <path d="M13.5 9C15.1 7.2 17.6 6 20.5 6C24.5 6 27.8 9 28.4 12.8C29.9 13.7 30.8 15.4 30.8 17.3C30.8 20.2 28.5 22.5 25.6 22.5H8.2C5.3 22.5 3 20.2 3 17.3C3 14.9 4.6 12.8 6.9 12.3C7.6 9.4 10.2 7.2 13.5 7.2" fill="#00A1E0" />
    <path d="M10 17.5C10.5 16.5 11.5 16 12.5 16C13.5 16 14 16.5 14.5 17.5C15 18.5 15.5 19 16.5 19C17.5 19 18 18.5 18.5 17.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const OpenAIIcon = () => (
  <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
    <path d="M25.6 13.2C25.2 11.3 23.9 9.8 22.1 9.1C21.7 6.9 20.1 5.2 18 4.6C15.9 4 13.6 4.7 12.2 6.3C10.4 5.9 8.5 6.4 7.2 7.7C5.9 9 5.5 11 6 12.8C4.5 14 3.8 16 4.2 18C4.6 20 6 21.5 7.9 22.1C8.3 24.3 9.9 26 12 26.6C14.1 27.2 16.4 26.5 17.8 24.9C19.6 25.3 21.5 24.8 22.8 23.5C24.1 22.2 24.5 20.2 24 18.4C25.5 17.2 26.2 15.2 25.6 13.2Z" stroke="#000000" strokeWidth="2" strokeLinejoin="round" />
    <path d="M16 11V21M11 13.5L21 18.5M21 13.5L11 18.5" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const GoogleSheetsIcon = () => (
  <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
    <rect x="7" y="4" width="18" height="24" rx="3" fill="#0F9D58" />
    <path d="M19 4L25 10H19V4Z" fill="#87CEAC" />
    <rect x="11" y="14" width="10" height="9" fill="white" rx="1" />
    <line x1="11" y1="17" x2="21" y2="17" stroke="#0F9D58" strokeWidth="1.5" />
    <line x1="16" y1="14" x2="16" y2="23" stroke="#0F9D58" strokeWidth="1.5" />
  </svg>
);

const NotionIcon = () => (
  <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
    <rect x="5" y="5" width="22" height="22" rx="5" fill="#000000" />
    <path d="M10 21V11L14.5 18L19.5 11V21" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IntercomIcon = () => (
  <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
    <rect width="32" height="32" rx="8" fill="#1F8CEB" />
    <path d="M9 11C9 9.9 9.9 9 11 9H21C22.1 9 23 9.9 23 11V18C23 19.1 22.1 20 21 20H13L9 23V11Z" fill="white" />
    <path d="M12 14H20M12 17H17" stroke="#1F8CEB" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Default brand icon datasets as matched in screenshot
const DEFAULT_TOP_ICONS = [
  { id: '1', name: 'Mailchimp', iconSvg: <MailchimpIcon /> },
  { id: '2', name: 'Asana', iconSvg: <AsanaIcon /> },
  { id: '3', name: 'Google Docs', iconSvg: <GoogleDocsIcon /> },
  { id: '4', name: 'Shopify', iconSvg: <ShopifyIcon /> },
  { id: '5', name: 'GitHub', iconSvg: <GithubIcon /> },
  { id: '6', name: 'Jira', iconSvg: <JiraIcon /> },
  { id: '7', name: 'HubSpot', iconSvg: <HubspotIcon /> },
];

const DEFAULT_BOTTOM_ICONS = [
  { id: '8', name: 'Zapier', iconSvg: <ZapierIcon /> },
  { id: '9', name: 'Slack', iconSvg: <SlackIcon /> },
  { id: '10', name: 'Salesforce', iconSvg: <SalesforceIcon /> },
  { id: '11', name: 'OpenAI', iconSvg: <OpenAIIcon /> },
  { id: '12', name: 'Google Sheets', iconSvg: <GoogleSheetsIcon /> },
  { id: '13', name: 'Notion', iconSvg: <NotionIcon /> },
  { id: '14', name: 'Intercom', iconSvg: <IntercomIcon /> },
];

const AppIntegrationsMarquee = ({
  headline = 'All Your Apps,\nTalking to Each Other',
  subtitle = 'Automate seamlessly connects with thousands of business applications.',
  counterText = 'And 50+ more..',
  topRowIcons = DEFAULT_TOP_ICONS,
  bottomRowIcons = DEFAULT_BOTTOM_ICONS,
}) => {
  // Quadruple arrays for flawless infinite marquee loop with zero gaps
  const topLoop = [...topRowIcons, ...topRowIcons, ...topRowIcons, ...topRowIcons];
  const bottomLoop = [...bottomRowIcons, ...bottomRowIcons, ...bottomRowIcons, ...bottomRowIcons];

  return (
    <section className="app-integrations-section">
      <div className="app-integrations-container">
        {/* Left Column: Text & Messaging Area */}
        <div className="app-integrations-left-col">
          <h2 className="app-integrations-headline">
            {headline.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {index > 0 && <br />}
                {line.includes('Each Other') ? (
                  <>
                    {line.replace('Each Other', '')}
                    <span className="app-integrations-highlight">Each Other</span>
                  </>
                ) : (
                  line
                )}
              </React.Fragment>
            ))}
          </h2>
          <p className="app-integrations-subtitle">{subtitle}</p>
        </div>

        {/* Right Column: Dual-Row Auto-Scrolling Marquee */}
        <div className="app-integrations-right-col">
          <div className="app-integrations-marquee-viewport">
            {/* Row 1: Top Marquee Row (Sliding Left to Right) */}
            <div className="app-integrations-marquee-row top-row">
              <div className="app-integrations-track track-left-to-right">
                {topLoop.map((item, idx) => (
                  <div className="app-icon-squircle" key={`top-${item.id}-${idx}`} title={item.name}>
                    {item.iconUrl ? (
                      <img src={item.iconUrl} alt={item.name} className="app-icon-img" />
                    ) : (
                      item.iconSvg
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: Bottom Marquee Row (Sliding Right to Left) */}
            <div className="app-integrations-marquee-row bottom-row">
              <div className="app-integrations-track track-right-to-left">
                {bottomLoop.map((item, idx) => (
                  <div className="app-icon-squircle" key={`bottom-${item.id}-${idx}`} title={item.name}>
                    {item.iconUrl ? (
                      <img src={item.iconUrl} alt={item.name} className="app-icon-img" />
                    ) : (
                      item.iconSvg
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom-Right Counter Note */}
          <div className="app-integrations-counter">{counterText}</div>
        </div>
      </div>
    </section>
  );
};

export default AppIntegrationsMarquee;
