import React from 'react';
import '../components/softwaredataai.css';
import ServicePageTemplate from '../components/ServicePageTemplate';
import { useContent } from '../hooks/useContent';

const SoftwareDataAI = () => {
  const { content } = useContent('services');

  if (!content) {
    return <div className="software-data-page" />;
  }

  return (
    <ServicePageTemplate
      pageClass="software-data-page"
      prefix="software-data"
      content={content.softwareDataAI}
    />
  );
};

export default SoftwareDataAI;
