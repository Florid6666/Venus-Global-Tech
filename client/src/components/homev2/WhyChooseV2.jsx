import React from 'react';
import WhyChooseUsSection from './WhyChooseUsSection';

const WhyChooseV2 = ({ content }) => {
  return (
    <WhyChooseUsSection
      eyebrow={content?.badge}
      title={content?.title}
      subtitle={content?.description}
    />
  );
};

export default WhyChooseV2;

