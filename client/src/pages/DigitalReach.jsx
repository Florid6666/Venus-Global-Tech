import React from 'react';
import '../components/digitalreach.css';
import ServicePageTemplate from '../components/ServicePageTemplate';
import { useContent } from '../hooks/useContent';

const DigitalReach = () => {
  const { content } = useContent('services');

  if (!content) {
    return <div className="digital-page" />;
  }

  return (
    <ServicePageTemplate
      pageClass="digital-page"
      prefix="digital"
      content={content.digitalReach}
    />
  );
};

export default DigitalReach;
