import React from 'react';
import './DeploymentTemplatesSection.css';

// SVG Vector Brand Icons for Cards
const SalesforceIcon = () => (
  <svg viewBox="0 0 32 32" width="24" height="24" fill="none">
    <path d="M13.5 9C15.1 7.2 17.6 6 20.5 6C24.5 6 27.8 9 28.4 12.8C29.9 13.7 30.8 15.4 30.8 17.3C30.8 20.2 28.5 22.5 25.6 22.5H8.2C5.3 22.5 3 20.2 3 17.3C3 14.9 4.6 12.8 6.9 12.3C7.6 9.4 10.2 7.2 13.5 7.2" fill="#00A1E0" />
    <path d="M10 17.5C10.5 16.5 11.5 16 12.5 16C13.5 16 14 16.5 14.5 17.5C15 18.5 15.5 19 16.5 19C17.5 19 18 18.5 18.5 17.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const GoogleSheetsIcon = () => (
  <svg viewBox="0 0 32 32" width="24" height="24" fill="none">
    <rect x="7" y="4" width="18" height="24" rx="3" fill="#0F9D58" />
    <path d="M19 4L25 10H19V4Z" fill="#87CEAC" />
    <rect x="11" y="14" width="10" height="9" fill="white" rx="1" />
    <line x1="11" y1="17" x2="21" y2="17" stroke="#0F9D58" strokeWidth="1.5" />
    <line x1="16" y1="14" x2="16" y2="23" stroke="#0F9D58" strokeWidth="1.5" />
  </svg>
);

const SlackIcon = () => (
  <svg viewBox="0 0 32 32" width="24" height="24" fill="none">
    <path d="M9.5 19C8.1 19 7 17.9 7 16.5C7 15.1 8.1 14 9.5 14H12V16.5C12 17.9 10.9 19 9.5 19Z" fill="#E01E5A" />
    <path d="M12 9.5C12 8.1 13.1 7 14.5 7C15.9 7 17 8.1 17 9.5V12H14.5C13.1 12 12 10.9 12 9.5Z" fill="#36C5F0" />
    <path d="M22.5 13C23.9 13 25 14.1 25 15.5C25 16.9 23.9 18 22.5 18H20V15.5C20 14.1 21.1 13 22.5 13Z" fill="#2EB67D" />
    <path d="M20 22.5C20 23.9 18.9 25 17.5 25C16.1 25 15 23.9 15 22.5V20H17.5C18.9 20 20 21.1 20 22.5Z" fill="#ECB22E" />
  </svg>
);

const HubspotIcon = () => (
  <svg viewBox="0 0 32 32" width="24" height="24" fill="none">
    <path d="M21.5 13.5V10.2L24.2 8.6C24.7 8.3 25 7.7 25 7C25 5.9 24.1 5 23 5C22.2 5 21.5 5.5 21.2 6.2L18.5 7.8V6C18.5 4.9 17.6 4 16.5 4C15.4 4 14.5 4.9 14.5 6V13.5C13.6 14.1 13 15.1 13 16.2C13 17.3 13.6 18.3 14.5 18.9V26C14.5 27.1 15.4 28 16.5 28C17.6 28 18.5 27.1 18.5 26V18.9C19.4 18.3 20 17.3 20 16.2C20 15.1 19.4 14.1 18.5 13.5H21.5Z" fill="#FF7A59" />
    <circle cx="23" cy="16.5" r="3.5" fill="#FF7A59" />
  </svg>
);

const AsanaIcon = () => (
  <svg viewBox="0 0 32 32" width="24" height="24" fill="none">
    <circle cx="16" cy="9.5" r="4.5" fill="#F9655B" />
    <circle cx="9.5" cy="20.5" r="4.5" fill="#F9655B" />
    <circle cx="22.5" cy="20.5" r="4.5" fill="#F9655B" />
  </svg>
);

const ShopifyIcon = () => (
  <svg viewBox="0 0 32 32" width="24" height="24" fill="none">
    <path d="M22.5 8L20 4H12L9.5 8H5V25C5 26.1 5.9 27 7 27H25C26.1 27 27 26.1 27 25V8H22.5Z" fill="#96BF48" />
    <path d="M16 11C13.5 11 12 12.5 12 14.5C12 18 20 17 20 20.5C20 22.5 18.5 24 16 24C13.5 24 12 22.5 12 22.5L11 25.5C11 25.5 13 27 16 27C20 27 23.5 24.5 23.5 20.5C23.5 15.5 15.5 16.5 15.5 14C15.5 12.5 17 12.5 18 12.5C19.5 12.5 21 13.5 21 13.5L22.5 10.5C22.5 10.5 20 9.5 18 9.5L16 11Z" fill="white" />
  </svg>
);

const GoogleDocsIcon = () => (
  <svg viewBox="0 0 32 32" width="24" height="24" fill="none">
    <rect x="7" y="4" width="18" height="24" rx="3" fill="#4285F4" />
    <path d="M19 4L25 10H19V4Z" fill="#A1C2FA" />
    <line x1="11" y1="14" x2="21" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <line x1="11" y1="18" x2="21" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <line x1="11" y1="22" x2="17" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const OpenAIIcon = () => (
  <svg viewBox="0 0 32 32" width="24" height="24" fill="none">
    <path d="M25.6 13.2C25.2 11.3 23.9 9.8 22.1 9.1C21.7 6.9 20.1 5.2 18 4.6C15.9 4 13.6 4.7 12.2 6.3C10.4 5.9 8.5 6.4 7.2 7.7C5.9 9 5.5 11 6 12.8C4.5 14 3.8 16 4.2 18C4.6 20 6 21.5 7.9 22.1C8.3 24.3 9.9 26 12 26.6C14.1 27.2 16.4 26.5 17.8 24.9C19.6 25.3 21.5 24.8 22.8 23.5C24.1 22.2 24.5 20.2 24 18.4C25.5 17.2 26.2 15.2 25.6 13.2Z" stroke="#000000" strokeWidth="2" strokeLinejoin="round" />
    <path d="M16 11V21M11 13.5L21 18.5M21 13.5L11 18.5" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const IntercomIcon = () => (
  <svg viewBox="0 0 32 32" width="24" height="24" fill="none">
    <rect width="32" height="32" rx="8" fill="#1F8CEB" />
    <path d="M9 11C9 9.9 9.9 9 11 9H21C22.1 9 23 9.9 23 11V18C23 19.1 22.1 20 21 20H13L9 23V11Z" fill="white" />
    <path d="M12 14H20M12 17H17" stroke="#1F8CEB" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const MetaIcon = () => (
  <svg viewBox="0 0 32 32" width="24" height="24" fill="none">
    <path d="M25.5 10C24.1 10 22.8 10.9 21.6 12.3C20.3 10.8 18.9 10 17.5 10C14.5 10 12.5 12.5 12.5 16C12.5 19.5 14.5 22 17.5 22C18.9 22 20.3 21.2 21.6 19.7C22.8 21.1 24.1 22 25.5 22C28.5 22 30.5 19.5 30.5 16C30.5 12.5 28.5 10 25.5 10Z" stroke="#0081FB" strokeWidth="2.2" />
  </svg>
);

const MailchimpIcon = () => (
  <svg viewBox="0 0 32 32" width="24" height="24" fill="none">
    <path d="M26 13c0-1.5-1-2.5-2.2-2.8-.5-2.2-2.3-4-4.8-4.2-3-.3-5.7 1.2-6.8 3.8-1-.1-2.2.4-3 1.3-1.2 1.3-1.4 3.3-.5 4.9.2.4.5.7.8 1-.2.7-.2 1.4-.1 2.1.3 1.9 1.6 3.4 3.4 4 2.2.7 4.7.1 6.4-1.5.9.3 1.8.3 2.7.1 1.6-.3 2.9-1.5 3.4-3.1.6-1.7.1-3.7-1.2-4.9.3-1 .2-2.1-.3-3.1z" fill="#000000" />
    <circle cx="13.5" cy="11.5" r="1.5" fill="#FFFFFF" />
    <circle cx="19.5" cy="11.5" r="1.5" fill="#FFFFFF" />
  </svg>
);

const DeploymentTemplatesSection = () => {
  const templates = [
    {
      id: 1,
      title: 'Autonomous Sales Pipeline Management',
      author: 'Created by Automate Team',
      icons: [<SalesforceIcon key="1" />, <GoogleSheetsIcon key="2" />, <SlackIcon key="3" />, <HubspotIcon key="4" />]
    },
    {
      id: 2,
      title: 'Automated Employee Onboarding Setup',
      author: 'Created by Automate Team',
      icons: [<AsanaIcon key="1" />, <SlackIcon key="2" />]
    },
    {
      id: 3,
      title: 'Predictive Inventory Reordering System',
      author: 'Created by Automate Team',
      icons: [<ShopifyIcon key="1" />, <GoogleSheetsIcon key="2" />, <HubspotIcon key="3" />]
    },
    {
      id: 4,
      title: 'AI-Powered Contract Review Approval',
      author: 'Created by Automate Team',
      icons: [<GoogleDocsIcon key="1" />, <SlackIcon key="2" />, <OpenAIIcon key="3" />]
    },
    {
      id: 5,
      title: 'Dynamic Marketing Campaign Optimization',
      author: 'Created by Automate Team',
      icons: [<IntercomIcon key="1" />, <HubspotIcon key="2" />, <MetaIcon key="3" />, <MailchimpIcon key="4" />]
    },
    {
      id: 6,
      title: 'Intelligent Data Cleanup and Enrichment',
      author: 'Created by Automate Team',
      icons: [<GoogleSheetsIcon key="1" />, <IntercomIcon key="2" />, <ShopifyIcon key="3" />]
    }
  ];

  return (
    <section className="deploy-templates-section">
      <div className="deploy-templates-container">
        {/* Section Header */}
        <div className="deploy-templates-header">
          <h2 className="deploy-templates-title">
            Deployment Starts with<br />
            a Simple Template
          </h2>
          <p className="deploy-templates-subtitle">
            Deploy a pre-built template or customize one of these core samples in minutes.
          </p>
        </div>

        {/* 6-Card Grid (3 Columns x 2 Rows) */}
        <div className="deploy-templates-grid">
          {templates.map((item) => (
            <div className="template-card" key={item.id}>
              <div className="template-card-header">
                <h3 className="template-card-title">{item.title}</h3>
                <p className="template-card-author">{item.author}</p>
              </div>

              {/* App Icons Row at Bottom (Arrow buttons excluded as requested) */}
              <div className="template-card-footer">
                <div className="template-icons-row">
                  {item.icons.map((icon, idx) => (
                    <div className="template-icon-wrap" key={idx}>
                      {icon}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeploymentTemplatesSection;
