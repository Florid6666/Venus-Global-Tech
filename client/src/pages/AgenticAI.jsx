import React from 'react';
import '../components/agenticai.css';
import ServicePageTemplate from '../components/ServicePageTemplate';
import AgenticHero from '../components/AgenticHero';
import AppIntegrationsMarquee from '../components/AppIntegrationsMarquee';
import ThreePillarsSection from '../components/ThreePillarsSection';
import NextEvolutionSection from '../components/NextEvolutionSection';
import DeploymentTemplatesSection from '../components/DeploymentTemplatesSection';
import FaqV2 from '../components/homev2/FaqV2';
import { useContent } from '../hooks/useContent';

const AGENTIC_AI_FAQS = {
  badge: 'FREQUENTLY ASKED QUESTIONS',
  title: 'Answers to Your Questions About Agentic AI',
  description: 'Explore how Autonomous AI Agents transform enterprise operations, integrate into existing workflows, ensure data security, and scale your business without added complexity.',
  ctaButton: 'Schedule a Consultation',
  items: [
    {
      id: 'agentic-faq-1',
      question: 'What is Agentic AI and how does it differ from traditional AI?',
      answer: 'Unlike traditional AI which only follows predefined scripts or responds to prompts, Agentic AI features autonomous decision-making capabilities. Agentic AI agents can plan multi-step workflows, execute complex tasks across software systems, handle edge-case exceptions dynamically, and adapt to changing data in real time without continuous human intervention.'
    },
    {
      id: 'agentic-faq-2',
      question: 'How quickly can Agentic AI workflows be deployed in our business?',
      answer: 'With pre-built solution templates and our intuitive visual flow builder, basic workflows can be configured and deployed within minutes. For complex enterprise integrations, full deployment typically takes just a few days to a couple of weeks.'
    },
    {
      id: 'agentic-faq-3',
      question: 'Will Agentic AI integrate with our existing software tools?',
      answer: 'Yes! Agentic AI connects seamlessly with thousands of enterprise tools including Salesforce, HubSpot, Slack, Jira, Asana, Google Workspace, Microsoft Azure, AWS, and custom API endpoints, breaking down data silos instantly.'
    },
    {
      id: 'agentic-faq-4',
      question: 'How does Agentic AI ensure data privacy and enterprise security?',
      answer: 'We prioritize enterprise-grade security with end-to-end encryption, strict role-based access control (RBAC), SOC-2 compliance standards, and local data residency options. Your proprietary business data is never used to train public LLM models.'
    },
    {
      id: 'agentic-faq-5',
      question: 'How does Agentic AI scale as transaction volume grows?',
      answer: 'Our platform features built-in automated scalability. As your transaction volume increases, computing resources auto-scale instantly to handle millions of tasks per day without performance degradation or latency.'
    }
  ]
};

const AgenticAI = () => {
  const { content } = useContent('services');

  if (!content) {
    return <div className="agentic-ai-page" />;
  }

  return (
    <ServicePageTemplate
      pageClass="agentic-ai-page"
      prefix="agentic"
      content={content.agenticAI}
      customHero={<AgenticHero />}
      hideStandardSections={true}
      belowHero={
        <>
          <AppIntegrationsMarquee />
          <ThreePillarsSection />
          <NextEvolutionSection />
          <DeploymentTemplatesSection />
          <FaqV2 content={AGENTIC_AI_FAQS} />
        </>
      }
    />
  );
};

export default AgenticAI;
