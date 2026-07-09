import React from 'react';
import '../components/cloudservice.css';
import ServicePageTemplate from '../components/ServicePageTemplate';
import { useContent } from '../hooks/useContent';

const CloudService = () => {
  const { content } = useContent('services');

  if (!content) {
    return <div className="cloud-page" />;
  }

  return (
    <ServicePageTemplate
      pageClass="cloud-page"
      prefix="cloud"
      content={content.cloudService}
    />
  );
};

export default CloudService;
