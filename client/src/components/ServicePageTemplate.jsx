import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import FooterV2 from './homev2/FooterV2';
import UpfooterOfficesV2 from './homev2/UpfooterOfficesV2';
import FaqV2 from './homev2/FaqV2';
import RichText from './RichText';
import AppIntegrationsMarquee from './AppIntegrationsMarquee';
import { useContent } from '../hooks/useContent';
import { stripHtml } from '../utils/stripHtml';

const iconClass = (icon) => (icon && icon.includes(' ') ? icon : `fas ${icon || ''}`);

// Hardcoded per-page, not content/admin-driven: routing the Lottie file
// through content.json (fetched via an admin-editable path) hit the CRA
// dev-proxy bug where any asset path needing URL-encoding (spaces in these
// filenames) got misrouted to the backend and 404'd. Hardcoding the path
// here avoids that entirely.
const LOTTIE_BY_PREFIX = {
  agentic: { path: '/lottie/actable-ai-landing-page-animation.json', fallbackIcon: 'fa-robot' },
  esg: { path: '/lottie/esg-environmental-social-governance.json', fallbackIcon: 'fa-leaf' },
  digital: { path: '/lottie/digital-marketing-services.json', fallbackIcon: 'fa-bullhorn' },
  'software-data': { path: '/lottie/software-development.json', fallbackIcon: 'fa-code' },
  cloud: { path: '/lottie/automation-process.json', fallbackIcon: 'fa-cloud' },
  iatf: { path: '/lottie/hotf-4.json', fallbackIcon: 'fa-clipboard-check' },
};

const TOOL_PANEL_DATA = {
  "Carbon Tracking": {
    badge: "+34% OEE Metric",
    title: "Carbon Tracking & Scope 1-3 Accounting",
    description: "Autonomous telemetry integration, real-time GHG protocol calculation, and predictive offset procurement across complex global operations.",
    capabilitiesHeader: "CORE INDUSTRIAL CAPABILITIES",
    capabilities: [
      "Real-time IoT telemetry synchronization across 500+ assembly nodes",
      "Predictive Scope 1, 2 & 3 emissions reordering with sub-second supplier inventory checks",
      "GHG Protocol, ISO 14064, and SEC automated compliance audit logs"
    ],
    ctaText: "Request Carbon Tracking Spec Sheet →",
    image: "/images/ESG.jpg"
  },
  "ESG Analytics": {
    badge: "AI Insights",
    title: "ESG Analytics & Risk Intelligence",
    description: "AI-driven predictive analytics engine delivering enterprise ESG risk scoring, market benchmarking, and continuous scenario modeling.",
    capabilitiesHeader: "ANALYTICAL CAPABILITIES",
    capabilities: [
      "Real-time executive dashboards with custom ESG risk indicators",
      "Automated peer benchmarking & industry compliance gap identification",
      "Predictive scenario modeling for climate transition & regulatory shifts"
    ],
    ctaText: "Request ESG Analytics Spec Sheet →",
    image: "/images/05.jpg"
  },
  "Reporting Tools": {
    badge: "Audit-Ready",
    title: "Automated Multi-Framework ESG Reporting",
    description: "One-click generation of investor-ready ESG disclosures aligned with CSRD, GRI, SASB, TCFD, and BRSR reporting standards.",
    capabilitiesHeader: "REPORTING CAPABILITIES",
    capabilities: [
      "Automated multi-standard export including CSRD, GRI, SASB, and BRSR",
      "Immutable audit trails with direct data lineage tracing for verification",
      "Seamless integration with enterprise SAP, Oracle, and ERP ledgers"
    ],
    ctaText: "Request Reporting Tools Spec Sheet →",
    image: "/images/software-data.jpg"
  },
  "Compliance": {
    badge: "100% Compliant",
    title: "ESG Compliance & Regulatory Management",
    description: "Continuous global regulatory monitoring and automated compliance orchestration to mitigate litigation and penalty risks.",
    capabilitiesHeader: "COMPLIANCE CAPABILITIES",
    capabilities: [
      "Real-time global ESG regulatory monitoring with automated penalty alerts",
      "ISO 9001, ISO 14001, and IATF 16949 automated compliance audit logs",
      "Automated gap analysis and policy enforcement across global subsidiaries"
    ],
    ctaText: "Request Compliance Spec Sheet →",
    image: "/images/IATF.jpg"
  },
  "Stakeholder": {
    badge: "Stakeholder Hub",
    title: "Stakeholder Engagement & Materiality Portal",
    description: "Centralized digital portal for double materiality assessments, supplier sustainability onboarding, and investor disclosures.",
    capabilitiesHeader: "ENGAGEMENT CAPABILITIES",
    capabilities: [
      "Interactive double materiality assessment surveys for board & investors",
      "Supplier ESG scorecarding, onboarding, and carbon footprint collection",
      "Public & investor sustainability transparency portal with verified data"
    ],
    ctaText: "Request Stakeholder Spec Sheet →",
    image: "/images/about_team_collaboration.png"
  },
  "Data Management": {
    badge: "Unified Data Lake",
    title: "Unified Enterprise ESG Data Lake",
    description: "Enterprise data aggregation engine connecting raw environmental, operational, and financial telemetry into a single source of truth.",
    capabilitiesHeader: "DATA LAKE CAPABILITIES",
    capabilities: [
      "Centralized data lake integrating ERP, CRM, IoT, and supply chain streams",
      "Automated data cleaning, anomaly detection, and schema validation",
      "Enterprise-grade role-based access controls and encrypted storage"
    ],
    ctaText: "Request Data Management Spec Sheet →",
    image: "/images/ai-cloud.jpg"
  },
  "Automation": {
    badge: "Workflow Automation",
    title: "ESG Workflow & Process Automation",
    description: "Intelligent process orchestration that automates data collection cycles, escalation rules, audit schedules, and corrective actions.",
    capabilitiesHeader: "AUTOMATION CAPABILITIES",
    capabilities: [
      "Automated data collection schedules and automated team reminder triggers",
      "AI-driven corrective action assignment and escalation path orchestration",
      "End-to-end sustainability process automation across global facilities"
    ],
    ctaText: "Request Automation Spec Sheet →",
    image: "/images/agentic-ai.jpg"
  },
  "AWS": {
    badge: "AWS Certified",
    title: "Amazon Web Services (AWS) Cloud Architecture",
    description: "Enterprise-grade cloud infrastructure automation, serverless microservices, multi-region auto-scaling, and high-availability compute engines.",
    capabilitiesHeader: "AWS CLOUD CAPABILITIES",
    capabilities: [
      "Automated EC2 & EKS cluster auto-scaling with multi-AZ failover architecture",
      "Serverless Lambda & DynamoDB event-driven microservices orchestration",
      "AWS Well-Architected Framework compliance & continuous cost optimization"
    ],
    ctaText: "Request AWS Cloud Spec Sheet →",
    image: "/images/ai-cloud.jpg"
  },
  "Azure": {
    badge: "Azure Enterprise",
    title: "Microsoft Azure Enterprise Cloud Solutions",
    description: "Hybrid cloud integration, Enterprise Entra ID sync, Azure Kubernetes Service (AKS), and mission-critical cloud platform governance.",
    capabilitiesHeader: "AZURE CLOUD CAPABILITIES",
    capabilities: [
      "Seamless hybrid cloud migration & Microsoft 365 / Entra ID sync",
      "Enterprise Azure Kubernetes Service (AKS) container orchestration",
      "Automated Sentinel SIEM threat detection & Azure Policy compliance"
    ],
    ctaText: "Request Azure Cloud Spec Sheet →",
    image: "/images/AI & Cloud (1).jpg"
  },
  "Google Cloud": {
    badge: "GCP Infrastructure",
    title: "Google Cloud Platform (GCP) Solutions",
    description: "High-performance GCP BigQuery data analytics, Anthos hybrid multi-cloud management, and global low-latency network infrastructure.",
    capabilitiesHeader: "GCP CLOUD CAPABILITIES",
    capabilities: [
      "BigQuery & Vertex AI petabyte-scale data warehouse analytics",
      "Google Kubernetes Engine (GKE) zero-downtime cluster deployment",
      "Global VPC networking with private Cloud Interconnect links"
    ],
    ctaText: "Request GCP Cloud Spec Sheet →",
    image: "/images/software-data.jpg"
  },
  "Kubernetes": {
    badge: "K8s Orchestration",
    title: "Kubernetes Container Orchestration",
    description: "Production-grade Kubernetes cluster management, Helm chart deployments, service mesh telemetry, and automated pod autoscaling.",
    capabilitiesHeader: "KUBERNETES CAPABILITIES",
    capabilities: [
      "Production cluster deployment with Istio / Linkerd service mesh",
      "Automated Horizontal Pod Autoscaling (HPA) & GitOps CD pipelines",
      "Zero-downtime rolling updates & multi-cloud cluster federation"
    ],
    ctaText: "Request Kubernetes Spec Sheet →",
    image: "/images/agentic-ai.jpg"
  },
  "Docker": {
    badge: "Containerized Apps",
    title: "Docker Containerization & Microservices",
    description: "Lightweight container packaging, immutable microservice builds, multi-stage Dockerfile optimization, and secure container registries.",
    capabilitiesHeader: "DOCKER CAPABILITIES",
    capabilities: [
      "Microservice containerization with multi-stage build optimization",
      "Automated vulnerability scanning & Docker Content Trust signing",
      "Development-to-production environment parity with Compose stacks"
    ],
    ctaText: "Request Docker Spec Sheet →",
    image: "/images/03.jpg"
  },
  "Database": {
    badge: "Managed Databases",
    title: "Cloud Database & Enterprise Data Lakes",
    description: "Fully managed relational, NoSQL, and vector database architectures designed for zero-data-loss replication and sub-millisecond query latency.",
    capabilitiesHeader: "DATABASE CAPABILITIES",
    capabilities: [
      "Multi-region database replication with zero-RPO disaster recovery",
      "Managed PostgreSQL, MongoDB, Redis & Pinecone vector stores",
      "Automated continuous backups, point-in-time recovery & encryption"
    ],
    ctaText: "Request Database Spec Sheet →",
    image: "/images/05.jpg"
  },
  "Security": {
    badge: "Zero Trust Security",
    title: "Cloud Security & Compliance Infrastructure",
    description: "Zero-Trust cloud security architecture, automated IAM policy enforcement, continuous posture monitoring, and SOC2 / ISO 27001 compliance.",
    capabilitiesHeader: "SECURITY CAPABILITIES",
    capabilities: [
      "Zero-Trust Network Access (ZTNA) & Identity Provider (IdP) integration",
      "Automated Cloud Security Posture Management (CSPM) & threat alerts",
      "SOC2 Type II, ISO 27001, HIPAA & PCI-DSS automated audit logs"
    ],
    ctaText: "Request Cloud Security Spec Sheet →",
    image: "/images/IATF.jpg"
  },
  "Checklists": {
    badge: "Audit Checklists",
    title: "Automated IATF 16949 Audit Checklists",
    description: "Standardized digital audit checklists mapping every clause of IATF 16949, ISO 9001, and OEM customer-specific requirements (CSRs).",
    capabilitiesHeader: "AUDIT CHECKLIST CAPABILITIES",
    capabilities: [
      "Pre-configured clause-by-clause IATF 16949 & ISO 9001 compliance audit templates",
      "Automated OEM customer-specific requirement (CSR) gap matrix generation",
      "Real-time scoring and instant non-conformance flag assignments"
    ],
    ctaText: "Request Checklists Spec Sheet →",
    image: "/images/IATF.jpg"
  },
  "Risk Assessment": {
    badge: "Risk Matrix",
    title: "FMEA & Automotive Process Risk Assessment",
    description: "Advanced AI-assisted Failure Mode and Effects Analysis (AIAG-VDA FMEA) and automotive process risk evaluation engine.",
    capabilitiesHeader: "RISK ASSESSMENT CAPABILITIES",
    capabilities: [
      "AIAG-VDA FMEA methodology alignment with automated RPN / Action Priority scoring",
      "Real-time manufacturing line risk mitigation and prevention tracking",
      "Integrated control plan & Process Flow Diagram (PFD) synchronization"
    ],
    ctaText: "Request Risk Assessment Spec Sheet →",
    image: "/images/05.jpg"
  },
  "Documentation": {
    badge: "QMS Documentation",
    title: "Quality Management Documentation Hub",
    description: "Centralized, version-controlled quality management repository for standard operating procedures (SOPs), work instructions, and records.",
    capabilitiesHeader: "DOCUMENTATION CAPABILITIES",
    capabilities: [
      "Automated document revision control with electronic signature approvals",
      "Instant cross-referencing between quality manual, SOPs, and audit logs",
      "Role-based access control and continuous audit-readiness archival"
    ],
    ctaText: "Request Documentation Spec Sheet →",
    image: "/images/software-data.jpg"
  },
  "Interviews": {
    badge: "Auditor Portal",
    title: "Auditor Interview & Evidence Portal",
    description: "Structured audit interviewing workflows with real-time competency assessments, evidence attachments, and staff interviews.",
    capabilitiesHeader: "INTERVIEW CAPABILITIES",
    capabilities: [
      "Structured operator and process owner interview questionnaire guides",
      "Direct mobile & tablet photo/video audit evidence attachment",
      "Competency matrix verification & training record cross-checking"
    ],
    ctaText: "Request Interviews Spec Sheet →",
    image: "/images/about_team_collaboration.png"
  },
  "Observation": {
    badge: "Process Gemba",
    title: "On-Site Gemba & Process Observation",
    description: "Real-time shop-floor process observation software capturing manufacturing line compliance, Pokayoke validation, and 5S adherence.",
    capabilitiesHeader: "OBSERVATION CAPABILITIES",
    capabilities: [
      "Digital Gemba walk audit logs with automated Pokayoke verification",
      "Real-time shop-floor non-conformance capturing with instant notification",
      "First-Time-Through (FTT) quality & SPC chart integration"
    ],
    ctaText: "Request Observation Spec Sheet →",
    image: "/images/ai-cloud.jpg"
  },
  "Data Analysis": {
    badge: "Statistical Quality",
    title: "Automotive Quality SPC & Data Analytics",
    description: "Statistical Process Control (SPC), Cpk / Ppk capability analysis, and root-cause Pareto analytics for zero-defect automotive manufacturing.",
    capabilitiesHeader: "DATA ANALYSIS CAPABILITIES",
    capabilities: [
      "Real-time SPC control charts, Cpk / Ppk machine capability calculation",
      "Automated 8D problem solving & 5-Why root cause analysis workflows",
      "Defect Pareto analytics and corrective action effectiveness tracking"
    ],
    ctaText: "Request Data Analysis Spec Sheet →",
    image: "/images/03.jpg"
  },
  "Reporting": {
    badge: "Audit Reports",
    title: "IATF Audit Reporting & CAR Automation",
    description: "Instant generation of formal IATF 16949 audit reports, Corrective Action Requests (CARs), and executive management review packages.",
    capabilitiesHeader: "REPORTING CAPABILITIES",
    capabilities: [
      "One-click IATF 16949 formal audit summary report generation",
      "Automated Corrective Action Request (CAR) tracking with deadline escalations",
      "Executive Management Review (MR) dashboards & ISO audit readiness package"
    ],
    ctaText: "Request Audit Reporting Spec Sheet →",
    image: "/images/agentic-ai.jpg"
  }
};

// Shared layout for the 6 near-identical service pages (Hero / Benefits /
// Process / Tools / Why Choose / FAQ / Offices / Footer). Each page supplies
// its own CSS file (for the `${prefix}-*` class names) and its own content
// slice from content.services.<key>; the Lottie animation is hardcoded per
// prefix above, and the static hero image (used only if there's no Lottie
// entry for this prefix) lives on content.hero itself.
const ServicePageTemplate = ({
  pageClass,
  prefix,
  content,
  customHero,
  belowHero,
  hideBenefits = false,
  hideProcess = false,
  hideTools = false,
  hideWhyChoose = false,
  hideStandardSections = false,
}) => {
  const [animationData, setAnimationData] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [activeTool, setActiveTool] = useState(null);
  const { content: home } = useContent('home');

  const hero = content?.hero || {};
  const benefits = content?.benefits || {};
  const process = content?.process || {};
  const tools = content?.tools || {};
  const whyChoose = content?.whyChoose || {};
  const faq = content?.faq || {};

  const lottie = LOTTIE_BY_PREFIX[prefix];

  useEffect(() => {
    if (!lottie) return;
    fetch(encodeURI(lottie.path))
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error('Error loading Lottie animation:', error));
  }, [lottie]);

  const toolRows = [];
  const items = tools.items || [];
  for (let i = 0; i < items.length; i += 4) {
    toolRows.push(items.slice(i, i + 4));
  }

  return (
    <div className={pageClass}>
      {/* Hero Section */}
      {customHero ? (
        customHero
      ) : (
        <section className={`${prefix}-hero`}>
          <div className={`${prefix}-hero-container`}>
            <div className={`${prefix}-hero-content`}>
              <div className={`${prefix}-hero-badge`}>
                <RichText html={hero.badge} as="span" />
              </div>
              <h1 className={`${prefix}-hero-title`}>
                <span className="title-line">{hero.titleLine1}</span>
                <span className="title-line">{hero.titleLine2}</span>
              </h1>
              <RichText html={hero.description} as="p" className={`${prefix}-hero-description`} />
              <div className={`${prefix}-hero-cta`}>
                <button className={`${prefix}-hero-button`} onClick={() => window.location.href = '/contact'}>{hero.ctaButton}</button>
              </div>
            </div>
            {lottie ? (
              <div className={`${prefix}-hero-lottie`}>
                <div className={`${prefix}-lottie-container`}>
                  <Lottie
                    animationData={animationData}
                    loop
                    autoplay
                    style={{ width: '100%', height: '100%' }}
                    rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
                  />
                  {!animationData && (
                    <div className="lottie-placeholder">
                      <div className="lottie-placeholder-content">
                        <i className={iconClass(lottie.fallbackIcon)}></i>
                        <p>Lottie Animation</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : hero.image ? (
              <div className={`${prefix}-hero-image`}>
                <div className={`${prefix}-image-container`}>
                  <img src={hero.image} alt={stripHtml(hero.badge)} className={`${prefix}-hero-img`} />
                </div>
              </div>
            ) : null}
          </div>
        </section>
      )}

      {/* Dual-Row Infinite App Integration Carousel Section */}
      {belowHero ? belowHero : prefix === 'agentic' ? <AppIntegrationsMarquee /> : null}

      {/* Benefits Section */}
      {!hideStandardSections && !hideBenefits && benefits?.title && (
        <section className={`${prefix}-benefits`}>
          <div className={`${prefix}-benefits-container`}>
            <div className={`${prefix}-benefits-header`}>
              <div className={`${prefix}-benefits-badge`}>
                <i className="fas fa-star"></i>
                <RichText html={benefits.badge} as="span" />
              </div>
              <h2 className={`${prefix}-benefits-title`}>{benefits.title}</h2>
              <RichText html={benefits.description} as="p" className={`${prefix}-benefits-description`} />
            </div>

            <div className={`${prefix}-benefits-grid`}>
              {benefits.items?.map((item) => (
                <div className={`${prefix}-benefit-flip-card`} key={item.title}>
                  <div className={`${prefix}-benefit-flip-inner`}>
                    <div className={`${prefix}-benefit-flip-front`}>
                      <div className={`${prefix}-benefit-icon`}>
                        <i className={iconClass(item.icon)}></i>
                      </div>
                      <h3 className={`${prefix}-benefit-title`}>
                        <RichText html={item.title} as="span" />
                      </h3>
                    </div>
                    <div className={`${prefix}-benefit-flip-back`}>
                      <RichText html={item.description} as="p" className={`${prefix}-benefit-description`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      {!hideStandardSections && !hideProcess && process?.title && (
        <section className={`${prefix}-process`}>
          <div className={`${prefix}-process-container`}>
            <div className={`${prefix}-process-header`}>
              <div className={`${prefix}-process-badge`}>
                <i className="fas fa-cogs"></i>
                <RichText html={process.badge} as="span" />
              </div>
              <h2 className={`${prefix}-process-title`}>{process.title}</h2>
              {process.description && (
                <RichText html={process.description} as="p" className={`${prefix}-process-description`} />
              )}
            </div>

            <div className={`${prefix}-process-timeline`}>
              {process.steps?.map((step, index) => (
                <React.Fragment key={step.number}>
                  {index > 0 && (
                    <div className={`${prefix}-process-arrow process-arrow`}>
                      <i className="fas fa-arrow-right"></i>
                    </div>
                  )}
                  <div className={`${prefix}-process-step process-step`} data-step={index + 1}>
                    <div className={`${prefix}-process-step-content process-step-content`}>
                      <div className={`${prefix}-process-step-number process-step-number`}>{step.number}</div>
                      <div className={`${prefix}-process-step-icon process-step-icon`}>
                        <i className={iconClass(step.icon)}></i>
                      </div>
                      <h3 className={`${prefix}-process-step-title process-step-title`}>
                        <RichText html={step.title} as="span" />
                      </h3>
                      {(step.description || (prefix === 'cloud' && [
                        "Assess your existing infrastructure, workloads, and business requirements to create a secure, scalable, and cost-effective cloud strategy.",
                        "Design modern cloud architectures tailored to your needs, with a focus on performance, security, reliability, and seamless scalability.",
                        "Move applications, data, and workloads to the cloud with minimal disruption through structured migration, deployment, and integration processes.",
                        "Continuously optimize cloud performance, costs, and resources while providing ongoing monitoring, maintenance, and technical support."
                      ][index]) || (prefix === 'iatf' && [
                        "Evaluate your current quality management system against IATF 16949 requirements to identify readiness and key improvement areas.",
                        "Review quality manuals, process documentation, risk assessments, and compliance records to ensure full regulatory alignment.",
                        "Conduct rigorous on-site audit evaluations of manufacturing processes, operational controls, and quality management performance.",
                        "Deliver comprehensive audit reports with actionable insights, non-conformance findings, and guidance for continuous improvement."
                      ][index]) || (prefix === 'esg' && [
                        "Evaluate your current ESG performance, identify key gaps, and build a practical sustainability strategy aligned with your business goals and industry requirements.",
                        "Develop structured ESG frameworks, policies, and measurable KPIs that help embed environmental, social, and governance principles across your organization.",
                        "Turn ESG strategies into action with implementation support, employee training, and clear processes that make sustainable practices part of everyday operations.",
                        "Track ESG performance through meaningful metrics, automated insights, and transparent reporting to continuously improve impact and stay accountable."
                      ][index])) && (
                        <p className={`${prefix}-process-step-desc ${prefix}-process-step-description process-step-desc process-step-description`}>
                          <RichText html={step.description || (prefix === 'cloud' && [
                            "Assess your existing infrastructure, workloads, and business requirements to create a secure, scalable, and cost-effective cloud strategy.",
                            "Design modern cloud architectures tailored to your needs, with a focus on performance, security, reliability, and seamless scalability.",
                            "Move applications, data, and workloads to the cloud with minimal disruption through structured migration, deployment, and integration processes.",
                            "Continuously optimize cloud performance, costs, and resources while providing ongoing monitoring, maintenance, and technical support."
                          ][index]) || (prefix === 'iatf' && [
                            "Evaluate your current quality management system against IATF 16949 requirements to identify readiness and key improvement areas.",
                            "Review quality manuals, process documentation, risk assessments, and compliance records to ensure full regulatory alignment.",
                            "Conduct rigorous on-site audit evaluations of manufacturing processes, operational controls, and quality management performance.",
                            "Deliver comprehensive audit reports with actionable insights, non-conformance findings, and guidance for continuous improvement."
                          ][index]) || [
                            "Evaluate your current ESG performance, identify key gaps, and build a practical sustainability strategy aligned with your business goals and industry requirements.",
                            "Develop structured ESG frameworks, policies, and measurable KPIs that help embed environmental, social, and governance principles across your organization.",
                            "Turn ESG strategies into action with implementation support, employee training, and clear processes that make sustainable practices part of everyday operations.",
                            "Track ESG performance through meaningful metrics, automated insights, and transparent reporting to continuously improve impact and stay accountable."
                          ][index]} as="span" />
                        </p>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Section */}
      {!hideStandardSections && !hideWhyChoose && whyChoose?.title && (
        <section className={`${prefix}-why-choose`}>
          <div className={`${prefix}-why-choose-container`}>
            <div className={`${prefix}-why-choose-image`}>
              <img src={whyChoose.image} alt="" />
            </div>
            <div className={`${prefix}-why-choose-content`}>
              {whyChoose.badge && (
                <div className={`${prefix}-why-choose-badge`}>
                  <i className="fas fa-cube"></i>
                  <RichText html={whyChoose.badge} as="span" />
                </div>
              )}
              {whyChoose.title && <h2 className={`${prefix}-why-choose-title`}>{whyChoose.title}</h2>}
              {whyChoose.description && (
                <RichText html={whyChoose.description} as="p" className={`${prefix}-why-choose-description`} />
              )}
              <div className={`${prefix}-why-choose-divider`}></div>
              <div className={`${prefix}-why-choose-benefits`}>
                {whyChoose.items?.map((item) => (
                  <div className={`${prefix}-why-choose-benefit-flip-card`} key={item.title}>
                    <div className={`${prefix}-why-choose-benefit-flip-inner`}>
                      <div className={`${prefix}-why-choose-benefit-flip-front`}>
                        <div className={`${prefix}-why-choose-benefit-icon`}>
                          <i className={iconClass(item.icon)}></i>
                        </div>
                        <h3 className={`${prefix}-why-choose-benefit-title`}>
                          <RichText html={item.title} as="span" />
                        </h3>
                      </div>
                      <div className={`${prefix}-why-choose-benefit-flip-back`}>
                        <RichText html={item.description} as="p" className={`${prefix}-why-choose-benefit-description`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tools Section */}
      {!hideStandardSections && !hideTools && tools?.title && (
        <section className={`${prefix}-tools`}>
          <div className={`${prefix}-tools-container`}>
            <div className={`${prefix}-tools-header`}>
              <div className={`${prefix}-tools-badge`}>
                <i className="fas fa-cube"></i>
                <RichText html={tools.badge} as="span" />
              </div>
              <h2 className={`${prefix}-tools-title`}>{tools.title}</h2>
              {tools.description && (
                <RichText html={tools.description} as="p" className={`${prefix}-tools-description`} />
              )}
            </div>

            <div className={`${prefix}-tools-grid`}>
              {toolRows.map((row, rowIndex) => (
                <div className={`${prefix}-tools-row`} key={rowIndex}>
                  {row.map((tool) => {
                    const isSelected = (activeTool || items[0]?.name) === tool.name;
                    return (
                      <div
                        className={`${prefix}-tool-item ${isSelected ? 'active' : ''}`}
                        key={tool.name}
                        onClick={() => setActiveTool(tool.name)}
                      >
                        <div className={`${prefix}-tool-icon`}>
                          <i className={iconClass(tool.icon)}></i>
                          <span className={`${prefix}-tool-name`}>{tool.name}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Interactive Tool Detail Panel (Matching User Reference Image) */}
            {(() => {
              const selectedToolName = activeTool || items[0]?.name || 'Carbon Tracking';
              const panelData = TOOL_PANEL_DATA[selectedToolName] || {
                badge: '+34% OEE',
                title: `${selectedToolName} Solutions`,
                description: `Enterprise-grade ${selectedToolName} platform delivering real-time telemetry, automated analytics, and seamless system integrations.`,
                capabilitiesHeader: 'CORE INDUSTRIAL CAPABILITIES',
                capabilities: [
                  `Real-time telemetry synchronization across enterprise operational nodes`,
                  `Automated ${selectedToolName} optimization with predictive recommendations`,
                  `ISO and global industry compliance automated audit logs`
                ],
                ctaText: `Request ${selectedToolName} Spec Sheet →`,
                image: '/images/ESG.jpg'
              };

              return (
                <div className={`${prefix}-tools-panel`}>
                  <div className={`${prefix}-tools-panel-image-col`}>
                    <img src={panelData.image} alt={panelData.title} className={`${prefix}-tools-panel-img`} />
                    {panelData.badge && (
                      <div className={`${prefix}-tools-panel-badge`}>
                        {panelData.badge}
                      </div>
                    )}
                  </div>
                  <div className={`${prefix}-tools-panel-content-col`}>
                    <h3 className={`${prefix}-tools-panel-title`}>{panelData.title}</h3>
                    <p className={`${prefix}-tools-panel-desc`}>{panelData.description}</p>
                    <div className={`${prefix}-tools-panel-caps-header`}>{panelData.capabilitiesHeader}</div>
                    <ul className={`${prefix}-tools-panel-caps-list`}>
                      {panelData.capabilities.map((cap, idx) => (
                        <li key={idx}>
                          <i className="fas fa-check-circle"></i>
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`${prefix}-tools-panel-cta`}
                      onClick={() => window.location.href = '/contact'}
                    >
                      {panelData.ctaText}
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {(prefix === 'esg' || prefix === 'cloud' || prefix === 'iatf') ? (
        <FaqV2
          content={{
            badge: 'FREQUENTLY ASKED QUESTIONS',
            title: prefix === 'cloud' 
              ? 'Answers to Your Questions About Cloud Services' 
              : prefix === 'iatf'
              ? 'Answers to Your Questions About IATF Auditing'
              : (faq?.title || 'Answers to Your Questions About ESG Solutions'),
            description: prefix === 'cloud'
              ? 'Explore how our enterprise cloud infrastructure services enable seamless migration, scalable architecture, automated security, and 24/7 high availability across your business operations.'
              : prefix === 'iatf'
              ? 'Explore how our automotive quality auditing services help you achieve IATF 16949 compliance, maintain high standards, and optimize process efficiency.'
              : 'Explore how our intelligent ESG platform drives sustainable operations, transparent reporting, responsible governance, and measurable impact across your enterprise.',
            ctaButton: 'Schedule a Consultation',
            items: faq?.items || []
          }}
        />
      ) : prefix !== 'agentic' && (
        <section className={`${prefix}-faq`}>
          <div className={`${prefix}-faq-container`}>
            <div className={`${prefix}-faq-header`}>
              <div className={`${prefix}-faq-badge`}>
                <i className="fas fa-cube"></i>
                <RichText html={faq.badge} as="span" />
              </div>
              <h2 className={`${prefix}-faq-title`}>{faq.title}</h2>
              {faq.description && (
                <p className={`${prefix}-faq-description`}>
                  {faq.description.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && <br />}
                      {line}
                    </React.Fragment>
                  ))}
                </p>
              )}
            </div>

            <div className={`${prefix}-faq-content`}>
              <div className={`${prefix}-faq-contact`}>
                <div className={`${prefix}-faq-contact-card`}>
                  <h3 className={`${prefix}-faq-contact-title`}>{faq.contactCard?.title}</h3>
                  <div className={`${prefix}-faq-contact-divider`}></div>
                  <RichText html={faq.contactCard?.description} as="p" className={`${prefix}-faq-contact-description`} />
                  <button className={`${prefix}-faq-contact-button`} onClick={() => window.location.href = '/contact'}>{faq.contactCard?.buttonText}</button>
                </div>
              </div>

              <div className={`${prefix}-faq-list`}>
                {faq.items?.map((item, index) => (
                  <div
                    className={`${prefix}-faq-item${openFaqIndex === index ? ' active' : ''}`}
                    key={item.question}
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  >
                    <div className={`${prefix}-faq-question`}>
                      <h4>
                        <RichText html={item.question} as="span" />
                      </h4>
                      <i className="fas fa-plus"></i>
                    </div>
                    <div className={`${prefix}-faq-answer`}>
                      <RichText html={item.answer} as="p" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <UpfooterOfficesV2 offices={home?.offices} />
      <FooterV2 />
    </div>
  );
};

export default ServicePageTemplate;
