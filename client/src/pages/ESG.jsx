import React from 'react';
import '../components/esg.css';
import ServicePageTemplate from '../components/ServicePageTemplate';
import EsgHero from '../components/EsgHero';
import { useContent } from '../hooks/useContent';
import defaultContent from '../data/defaultContent.json';

const ESG = () => {
  const { content } = useContent('services');
  const esgContent = content?.esg || content?.services?.esg || defaultContent.services?.esg;

  if (!esgContent) {
    return <div className="esg-page" />;
  }

  return (
    <ServicePageTemplate
      pageClass="esg-page"
      prefix="esg"
      content={esgContent}
      customHero={<EsgHero />}
      hideTools={false}
    />
  );
};

export default ESG;
