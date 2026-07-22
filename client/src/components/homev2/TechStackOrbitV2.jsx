import React, { useState } from 'react';
import './TechStackOrbitV2.css';

const INNER_RING_NODES = [
  { id: 'openai', name: 'OpenAI', category: 'Generative AI • LLM Orchestration', icon: 'fa-robot', color: '#10a37f' },
  { id: 'python', name: 'Python', category: 'AI Models • Data Engineering', icon: 'fa-python', color: '#3776ab', isBrand: true },
  { id: 'langchain', name: 'LangChain', category: 'Agentic AI • RAG Pipelines', icon: 'fa-diagram-project', color: '#2563eb' },
  { id: 'azure-ai', name: 'Azure AI', category: 'Enterprise AI & Cognitive Services', icon: 'fa-brain', color: '#0078d4' },
  { id: 'vector-db', name: 'Vector DBs', category: 'Semantic Search • Embeddings', icon: 'fa-database', color: '#9333ea' },
  { id: 'ml', name: 'Machine Learning', category: 'Predictive Analytics & Deep Learning', icon: 'fa-microchip', color: '#0891b2' }
];

const MIDDLE_RING_NODES = [
  { id: 'react', name: 'React', category: 'Frontend Development • Modern UI', icon: 'fa-react', color: '#61dafb', isBrand: true },
  { id: 'nodejs', name: 'Node.js', category: 'Scalable Microservices & APIs', icon: 'fa-node-js', color: '#68a063', isBrand: true },
  { id: 'angular', name: 'Angular', category: 'Enterprise Web Applications', icon: 'fa-angular', color: '#dd0031', isBrand: true },
  { id: 'java', name: 'Java', category: 'Mission-Critical Backend Systems', icon: 'fa-java', color: '#f89820', isBrand: true },
  { id: 'dotnet', name: '.NET', category: 'Enterprise Software Architecture', icon: 'fa-cubes', color: '#512bd4' },
  { id: 'docker', name: 'Docker', category: 'Containerization & Dev Ops', icon: 'fa-docker', color: '#2496ed', isBrand: true },
  { id: 'kubernetes', name: 'Kubernetes', category: 'Cloud Container Orchestration', icon: 'fa-dharmachakra', color: '#326ce5' },
  { id: 'devops', name: 'DevOps', category: 'CI/CD & Infrastructure Automation', icon: 'fa-infinity', color: '#ea580c' }
];

const OUTER_RING_NODES = [
  { id: 'aws', name: 'AWS', category: 'Global Cloud Infrastructure', icon: 'fa-aws', color: '#ff9900', isBrand: true },
  { id: 'azure', name: 'Microsoft Azure', category: 'Enterprise Cloud & Hybrid Infra', icon: 'fa-microsoft', color: '#0078d4', isBrand: true },
  { id: 'gcp', name: 'Google Cloud', category: 'Big Data & AI Infrastructure', icon: 'fa-google', color: '#4285f4', isBrand: true },
  { id: 'salesforce', name: 'Salesforce', category: 'CRM & Enterprise Platforms', icon: 'fa-salesforce', color: '#00a1e0', isBrand: true },
  { id: 'sap', name: 'SAP', category: 'Enterprise Resource Planning', icon: 'fa-layer-group', color: '#008fd3' },
  { id: 'powerbi', name: 'Power BI', category: 'Business Intelligence & Analytics', icon: 'fa-chart-pie', color: '#f2c811' },
  { id: 'dynamics', name: 'Microsoft Dynamics', category: 'Intelligent Business Applications', icon: 'fa-grip-vertical', color: '#002050' }
];

const withIcon = (node) => ({ ...node, isBrand: node.iconPrefix ? node.iconPrefix === 'fab' : node.isBrand });

// Light tint of the node's brand color for the mobile card's icon badge
// background, without needing color-mix() (not supported in older Safari).
const hexToRgba = (hex, alpha) => {
  const clean = hex?.replace('#', '');
  if (!clean || clean.length !== 6) return `rgba(37, 99, 235, ${alpha})`;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const TECH_GROUPS = [
  { key: 'inner', title: 'AI & Machine Learning', icon: 'fa-brain' },
  { key: 'middle', title: 'Languages & Frameworks', icon: 'fa-code' },
  { key: 'outer', title: 'Cloud & Enterprise Platforms', icon: 'fa-cloud' },
];

const TechStackOrbitV2 = ({ content }) => {
  const [isPaused, setIsPaused] = useState(false);

  const badgeText = content?.badge || 'TECHNOLOGY STACK';
  const headingText = content?.title || 'Technologies We Work With';
  const paragraphText = content?.description || 'We leverage modern programming languages, cloud platforms, AI frameworks, enterprise technologies, and DevOps tools to build scalable digital products that power business transformation.';

  const innerNodes = (content?.innerRing?.length > 0 ? content.innerRing : INNER_RING_NODES).map(withIcon);
  const middleNodes = (content?.middleRing?.length > 0 ? content.middleRing : MIDDLE_RING_NODES).map(withIcon);
  const outerNodes = (content?.outerRing?.length > 0 ? content.outerRing : OUTER_RING_NODES).map(withIcon);
  const nodesByGroup = { inner: innerNodes, middle: middleNodes, outer: outerNodes };

  const handleNodeMouseEnter = () => setIsPaused(true);
  const handleNodeMouseLeave = () => setIsPaused(false);

  // Helper to compute node position on ring (in percentages or angles)
  const getNodeStyle = (index, total, radius) => {
    const angle = (index / total) * 360;
    const rad = (angle * Math.PI) / 180;
    // Calculate x and y offset from center
    const x = radius * Math.cos(rad);
    const y = radius * Math.sin(rad);

    return {
      transform: `translate(${x}px, ${y}px)`
    };
  };

  return (
    <section className="v2-orbit-section" id="technology-stack">
      {/* Background Radial Glow Effects */}
      <div className="v2-orbit-ambient-glow glow-1"></div>
      <div className="v2-orbit-ambient-glow glow-2"></div>

      <div className="v2-orbit-container">
        
        {/* HEADER SECTION */}
        <div className="v2-orbit-header v2-reveal-on-scroll v2-reveal-up">
          <div className="v2-orbit-badge">
            <span className="v2-orbit-badge-icon">
              <i className="fas fa-layer-group"></i>
            </span>
            <span className="v2-orbit-badge-text">{badgeText}</span>
          </div>

          <h2 className="v2-orbit-heading">
            {headingText}
          </h2>

          <p className="v2-orbit-paragraph">
            {paragraphText}
          </p>
        </div>

        {/* ORBITAL ECOSYSTEM MAIN VISUAL */}
        <div className="v2-orbit-visual-wrapper v2-reveal-on-scroll v2-reveal-scale">
          
          <div className={`v2-orbit-system ${isPaused ? 'is-paused' : ''}`}>

            {/* FIXED CENTER CONTAINER: Venus Global Technology */}
            <div className="v2-orbit-center-node">
              <div className="v2-orbit-center-inner">
                <div className="v2-orbit-center-logo">
                  <span className="v2-center-vgt">VGT</span>
                </div>
                <div className="v2-orbit-center-text">
                  <strong>Venus Global Technology</strong>
                  <span>Enterprise AI • Cloud • Software</span>
                </div>
              </div>
              <div className="v2-orbit-center-pulse"></div>
            </div>

            {/* INNER ORBITAL RING (AI & ML) */}
            <div className="v2-orbit-ring ring-inner">
              <div className="v2-orbit-ring-line"></div>
              <div className="v2-orbit-ring-rotate">
                {innerNodes.map((node, i) => (
                  <div
                    key={node.id || node.name}
                    className="v2-tech-node node-inner"
                    style={getNodeStyle(i, innerNodes.length, 175)}
                    onMouseEnter={() => handleNodeMouseEnter(node)}
                    onMouseLeave={handleNodeMouseLeave}
                    tabIndex={0}
                    aria-label={`${node.name} - ${node.category}`}
                  >
                    <div className="v2-tech-node-circle">
                      <i className={`${node.isBrand ? 'fab' : 'fas'} ${node.icon}`} style={{ color: node.color }}></i>
                    </div>

                    {/* Node Hover Tooltip */}
                    <div className="v2-node-tooltip">
                      <strong>{node.name}</strong>
                      <span>{node.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MIDDLE ORBITAL RING (Languages & Frameworks) */}
            <div className="v2-orbit-ring ring-middle">
              <div className="v2-orbit-ring-line"></div>
              <div className="v2-orbit-ring-rotate rotate-reverse">
                {middleNodes.map((node, i) => (
                  <div
                    key={node.id || node.name}
                    className="v2-tech-node node-middle"
                    style={getNodeStyle(i, middleNodes.length, 305)}
                    onMouseEnter={() => handleNodeMouseEnter(node)}
                    onMouseLeave={handleNodeMouseLeave}
                    tabIndex={0}
                    aria-label={`${node.name} - ${node.category}`}
                  >
                    <div className="v2-tech-node-circle">
                      <i className={`${node.isBrand ? 'fab' : 'fas'} ${node.icon}`} style={{ color: node.color }}></i>
                    </div>

                    {/* Node Hover Tooltip */}
                    <div className="v2-node-tooltip">
                      <strong>{node.name}</strong>
                      <span>{node.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* OUTER ORBITAL RING (Cloud & Enterprise Platforms) */}
            <div className="v2-orbit-ring ring-outer">
              <div className="v2-orbit-ring-line"></div>
              <div className="v2-orbit-ring-rotate">
                {outerNodes.map((node, i) => (
                  <div
                    key={node.id || node.name}
                    className="v2-tech-node node-outer"
                    style={getNodeStyle(i, outerNodes.length, 435)}
                    onMouseEnter={() => handleNodeMouseEnter(node)}
                    onMouseLeave={handleNodeMouseLeave}
                    tabIndex={0}
                    aria-label={`${node.name} - ${node.category}`}
                  >
                    <div className="v2-tech-node-circle">
                      <i className={`${node.isBrand ? 'fab' : 'fas'} ${node.icon}`} style={{ color: node.color }}></i>
                    </div>

                    {/* Node Hover Tooltip */}
                    <div className="v2-node-tooltip">
                      <strong>{node.name}</strong>
                      <span>{node.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* MOBILE / TABLET LAYOUT — the orbit's fixed pixel-radius rings and
            hover-only tooltips don't work on touch screens, so below 860px
            this stacked, tappable card grid replaces it entirely (see CSS). */}
        <div className="v2-tech-stack-mobile">
          {TECH_GROUPS.map((group) => (
            <div className="v2-tech-mobile-group" key={group.key}>
              <h3 className="v2-tech-mobile-group-title">
                <i className={`fas ${group.icon}`}></i> {group.title}
              </h3>
              <div className="v2-tech-mobile-grid">
                {nodesByGroup[group.key].map((node) => (
                  <div className="v2-tech-mobile-card" key={node.id || node.name}>
                    <span
                      className="v2-tech-mobile-icon"
                      style={{ color: node.color, backgroundColor: hexToRgba(node.color, 0.12) }}
                    >
                      <i className={`${node.isBrand ? 'fab' : 'fas'} ${node.icon}`}></i>
                    </span>
                    <span className="v2-tech-mobile-info">
                      <strong>{node.name}</strong>
                      <span>{node.category}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TechStackOrbitV2;
