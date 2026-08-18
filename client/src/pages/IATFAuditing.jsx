import React from 'react';
import '../components/iatfauditing.css';
import ServicePageTemplate from '../components/ServicePageTemplate';
import IatfHero from '../components/IatfHero';
import { useContent } from '../hooks/useContent';
import defaultContent from '../data/defaultContent.json';

const IATFAuditing = () => {
  const { content } = useContent('services');
  const iatfContent = content?.iatfAuditing || content?.services?.iatfAuditing || defaultContent.services?.iatfAuditing;

  if (!iatfContent) {
    return <div className="iatf-page" />;
  }

  return (
    <ServicePageTemplate
      pageClass="iatf-page"
      prefix="iatf"
      content={iatfContent}
      customHero={<IatfHero />}
      hideTools={false}
      hideWhyChoose={true}
    />
  );
};

export default IATFAuditing;
