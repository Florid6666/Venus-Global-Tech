import React from 'react';
import '../components/esg.css';
import ServicePageTemplate from '../components/ServicePageTemplate';
import { useContent } from '../hooks/useContent';

const ESG = () => {
  const { content } = useContent('services');

  if (!content) {
    return <div className="esg-page" />;
  }

  return (
    <ServicePageTemplate
      pageClass="esg-page"
      prefix="esg"
      content={content.esg}
    />
  );
};

export default ESG;
