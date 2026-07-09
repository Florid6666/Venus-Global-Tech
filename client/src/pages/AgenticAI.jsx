import React from 'react';
import '../components/agenticai.css';
import ServicePageTemplate from '../components/ServicePageTemplate';
import { useContent } from '../hooks/useContent';

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
    />
  );
};

export default AgenticAI;
