import React from 'react';
import '../components/softwaredataai.css';
import ServicePageTemplate from '../components/ServicePageTemplate';
import { useContent } from '../hooks/useContent';
import defaultContent from '../data/defaultContent.json';

const SoftwareDataAI = () => {
  const { content } = useContent('services');
  const softwareContent = content?.softwareDataAI || content?.services?.softwareDataAI || defaultContent.services?.softwareDataAI;

  if (!softwareContent) {
    return <div className="software-data-page" />;
  }

  return (
    <ServicePageTemplate
      pageClass="software-data-page"
      prefix="software-data"
      content={softwareContent}
    />
  );
};

export default SoftwareDataAI;
