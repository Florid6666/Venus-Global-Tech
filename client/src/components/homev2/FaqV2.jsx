import React, { useState } from 'react';
import './FaqV2.css';

const DEFAULT_FAQS = [
  {
    id: 'faq-1',
    question: 'What does an AI Development Company do?',
    answer: 'An AI Development Company designs, develops, and deploys intelligent software solutions that leverage artificial intelligence, machine learning, automation, and data analytics to solve complex business challenges. These solutions help organizations streamline operations, improve decision-making, reduce costs, and create more personalized customer experiences.'
  },
  {
    id: 'faq-2',
    question: 'How can AI improve business operations?',
    answer: 'Artificial Intelligence automates repetitive tasks, analyzes large volumes of business data, predicts future trends, enhances customer interactions, optimizes workflows, and supports faster, data-driven decision-making. By integrating AI into everyday processes, businesses can improve productivity, increase operational efficiency, and drive sustainable growth.'
  },
  {
    id: 'faq-3',
    question: 'What industries benefit from AI solutions?',
    answer: 'AI technologies deliver value across a wide range of industries, including healthcare, financial services, manufacturing, retail, logistics, education, government, automotive, real estate, and professional services. Every organization that manages data, processes, or customer interactions can benefit from AI-powered innovation.'
  },
  {
    id: 'faq-4',
    question: 'Why invest in Digital Transformation Services?',
    answer: 'Digital transformation enables organizations to modernize legacy systems, migrate to scalable cloud infrastructure, automate manual processes, improve collaboration, strengthen cybersecurity, and deliver exceptional customer experiences. It helps businesses remain agile, competitive, and prepared for future technological advancements.'
  },
  {
    id: 'faq-5',
    question: 'Why choose Venus Global Technology?',
    answer: 'Venus Global Technology combines expertise in artificial intelligence, enterprise software development, cloud consulting, digital transformation, and business technology strategy to deliver secure, scalable, and future-ready solutions. Our collaborative approach ensures every solution is tailored to your business objectives, enabling long-term innovation, operational excellence, and measurable business outcomes.'
  }
];

const FaqV2 = ({ content }) => {
  // First item open by default
  const [openIndex, setOpenIndex] = useState(0);

  const badgeText = content?.badge || 'FREQUENTLY ASKED QUESTIONS';
  const headingText = content?.title || 'Answers to the Questions That Matter Most';
  const paragraphText = content?.description || 'Whether you\'re exploring AI adoption, digital transformation, enterprise software, or cloud consulting, we\'ve answered some of the most common questions businesses ask before starting their technology journey with Venus Global Technology.';
  
  const faqs = (content?.items && content.items.length > 0 && typeof content.items[0] === 'object') 
    ? content.items 
    : DEFAULT_FAQS;
    
  const buttonText = content?.ctaButton || 'Schedule a Consultation';

  const toggleFaq = (index) => {
    setOpenIndex(prev => (prev === index ? -1 : index));
  };

  return (
    <section className="v2-faq-section" id="frequently-asked-questions">
      <div className="v2-faq-container">
        <div className="v2-faq-grid">
          
          {/* LEFT SIDE (40% Column): Hierarchy, Copy & CTA */}
          <div className="v2-faq-left">
            <div className="v2-faq-badge">
              <span className="v2-faq-badge-icon">❖</span>
              <span className="v2-faq-badge-text">{badgeText}</span>
            </div>

            <h2 className="v2-faq-heading">
              {headingText}
            </h2>

            <p className="v2-faq-paragraph">
              {paragraphText}
            </p>

            <button 
              className="v2-faq-btn"
              onClick={() => window.location.href = '/contact'}
            >
              <span>{buttonText}</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>

          {/* RIGHT SIDE (60% Column): Independent Floating Accordion Cards */}
          <div className="v2-faq-right">
            <div className="v2-faq-accordion">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div 
                    className={`v2-faq-card ${isOpen ? 'is-open' : ''}`}
                    key={faq.id || index}
                    onClick={() => toggleFaq(index)}
                  >
                    <div 
                      className="v2-faq-question-btn"
                      role="button"
                      tabIndex={0}
                      aria-expanded={isOpen}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleFaq(index);
                        }
                      }}
                    >
                      <span className="v2-faq-question-text">{faq.question}</span>
                      <span className="v2-faq-toggle-icon">
                        <i className={`fas ${isOpen ? 'fa-minus' : 'fa-plus'}`}></i>
                      </span>
                    </div>

                    <div className="v2-faq-answer-wrapper">
                      <div className="v2-faq-answer-inner">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FaqV2;
