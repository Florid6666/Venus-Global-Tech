import React from 'react';
import '../components/iatfauditing.css';
import ServicePageTemplate from '../components/ServicePageTemplate';
import { useContent } from '../hooks/useContent';

const IATFAuditing = () => {
  const { content } = useContent('services');

  if (!content) {
    return <div className="iatf-page" />;
  }

  return (
    <ServicePageTemplate
      pageClass="iatf-page"
      prefix="iatf"
      content={content.iatfAuditing}
    />
  );
};

export default IATFAuditing;
