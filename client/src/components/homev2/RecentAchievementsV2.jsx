import React from 'react';
import './RecentAchievementsV2.css';

const DEFAULT_PROJECTS = [
  {
    id: "1",
    title: "Technology Strategy",
    description: "Strategic roadmaps aligned with business growth objectives and ROI.",
    image: "/images/homev2/achieve_card1_amber.png"
  },
  {
    id: "2",
    title: "Digital Innovation",
    description: "Emerging tech integration and transformative digital business models.",
    image: "/images/homev2/achieve_card2_emerald.png"
  },
  {
    id: "3",
    title: "Enterprise Architecture",
    description: "Scalable systems design built for complex enterprise ecosystems.",
    image: "/images/homev2/achieve_card3_purple.png"
  },
  {
    id: "4",
    title: "Cloud Modernization",
    description: "Legacy migration and cloud-native infrastructure optimization.",
    image: "/images/homev2/achieve_card4_cyan.png"
  },
  {
    id: "5",
    title: "AI Adoption",
    description: "Enterprise-wide AI strategy, governance, and agentic enablement.",
    image: "/images/homev2/achieve_card5_rose.png"
  },
  {
    id: "6",
    title: "Business Technology",
    description: "End-to-end process optimization and automated digital workflows.",
    image: "/images/homev2/achieve_card6_orange.png"
  },
  {
    id: "7",
    title: "Enterprise Software",
    description: "Custom mission-critical platforms and seamless API integrations.",
    image: "/images/homev2/achieve_card7_sage.png"
  },
  {
    id: "8",
    title: "Digital Business Solutions",
    description: "Data-driven analytics and executive business intelligence systems.",
    image: "/images/homev2/achieve_card8_cobalt.png"
  }
];

const RecentAchievementsV2 = ({ content }) => {
  const projects = content?.items || DEFAULT_PROJECTS;

  // Duplicated array to create smooth seamless 100% infinite marquee scroll
  const extendedProjects = [...projects, ...projects];

  return (
    <section className="achievements-v2-section" id="recent-achievements">
      <div className="achievements-v2-container">

        {/* HEADER ARCHITECTURE */}
        <div className="achievements-v2-header-grid">
          <div className="achievements-v2-title-col">
            <h2 className="achievements-v2-heading">
              {content?.title || "Business Technology Beyond Software Development"}
            </h2>
            <p className="achievements-v2-subheading">
              {content?.subheading || "We are more than a software development firm—Venus Global Technology serves as a trusted technology consulting partner. We bridge the gap between strategic vision and scalable engineering to drive long-term business value."}
            </p>
            
            {/* CTA BUTTON ON LEFT COLUMN */}
            <div className="achievements-v2-left-cta-wrap">
              <a href="/contact" className="achievements-v2-btn-cta">
                <span>Schedule a Strategy Session</span>
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* CONTINUOUS INFINITE RIGHT-TO-LEFT MARQUEE VIEWPORT (ZERO GAP, NO CURVED CORNERS) */}
      <div className="achievements-v2-slider-viewport">
        <div className="achievements-v2-slider-track">
          {extendedProjects.map((project, idx) => (
            <div key={`${project.id}-${idx}`} className="achievements-v2-card">
              
              {/* Full-bleed Portrait Image */}
              <div className="achievements-v2-card-image-wrap">
                <img
                  src={project.image}
                  alt={project.title}
                  className="achievements-v2-card-img"
                />
              </div>

              {/* Ambient Dark Shadow Overlay for Text Contrast at Rest */}
              <div className="achievements-v2-card-gradient" />

              {/* Exact Top Grayish, Mid-to-Bottom Blue Duotone Overlay */}
              <div className="achievements-v2-card-overlay" />
              <div className="achievements-v2-card-tint" />

              {/* Bottom Center White Title Badge */}
              <div className="achievements-v2-title-badge">
                <h3 className="achievements-v2-badge-title-text">{project.title}</h3>
                {project.description && (
                  <p className="achievements-v2-badge-desc-text">{project.description}</p>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentAchievementsV2;
