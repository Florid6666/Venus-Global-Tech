import React from 'react';
import '../components/digitalreach.css';
import ServicePageTemplate from '../components/ServicePageTemplate';
import { useContent } from '../hooks/useContent';
import defaultContent from '../data/defaultContent.json';

const DigitalReach = () => {
  const { content } = useContent('services');
  const digitalContent = content?.digitalReach || content?.services?.digitalReach || defaultContent.services?.digitalReach;

  if (!digitalContent) {
    return <div className="digital-page" />;
  }

  return (
    <ServicePageTemplate
      pageClass="digital-page"
      prefix="digital"
      content={digitalContent}
    />
  );
};

export default DigitalReach;
