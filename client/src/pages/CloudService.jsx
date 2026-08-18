import React from 'react';
import '../components/cloudservice.css';
import ServicePageTemplate from '../components/ServicePageTemplate';
import CloudHero from '../components/CloudHero';
import { useContent } from '../hooks/useContent';
import defaultContent from '../data/defaultContent.json';

const CloudService = () => {
  const { content } = useContent('services');
  const cloudContent = content?.cloudService || content?.services?.cloudService || defaultContent.services?.cloudService;

  if (!cloudContent) {
    return <div className="cloud-page" />;
  }

  return (
    <ServicePageTemplate
      pageClass="cloud-page"
      prefix="cloud"
      content={cloudContent}
      customHero={<CloudHero />}
      hideTools={false}
      hideWhyChoose={true}
    />
  );
};

export default CloudService;
