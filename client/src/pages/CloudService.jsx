import React from 'react';
import '../components/cloudservice.css';
import ServicePageTemplate from '../components/ServicePageTemplate';
import CloudHero from '../components/CloudHero';
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
      customHero={<CloudHero />}
      hideTools={false}
      hideWhyChoose={true}
    />
  );
};

export default CloudService;
