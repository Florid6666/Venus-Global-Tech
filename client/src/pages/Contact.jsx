import React, { useState } from 'react';
import '../components/contact.css';
import FooterV2 from '../components/homev2/FooterV2';
import UpfooterOfficesV2 from '../components/homev2/UpfooterOfficesV2';
import RichText from '../components/RichText';
import { useContent } from '../hooks/useContent';
import { getApiUrl } from '../config/api';

const Contact = () => {
  const { content: contact } = useContent('contact');
  const { content: home } = useContent('home');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    inquiry: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const form = contact?.form || {};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const response = await fetch(getApiUrl('api/contact'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          budget: formData.budget,
          inquiry: formData.inquiry
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          budget: '',
          inquiry: ''
        });
      } else {
        let errorMessage = `Server error: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (e) {
          const errorText = await response.text();
          if (errorText) {
            errorMessage = errorText;
          }
        }
        console.error('Form submission error:', errorMessage);
        setSubmitStatus('error');
        alert(`Failed to submit form: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      alert(`Network error: ${error.message}. Please check your connection and try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero + form share one continuous dark background (spotlight glows,
          grid overlay) so there's no seam between them — same technique used
          on the home page's dark cluster and the ERP AI hero. */}
      <div className="contact-dark-cluster">
        <div className="contact-glow glow-indigo"></div>
        <div className="contact-glow glow-cyan"></div>
        <div className="contact-grid-overlay"></div>

        {/* Hero Section */}
        <section className="contact-hero">
          <div className="contact-hero-container">
            <div className="contact-hero-badge">
              <span className="contact-hero-badge-dot"></span>
              <span>Get in Touch</span>
            </div>
            <h1 className="contact-hero-title">{contact?.hero?.title}</h1>
            <RichText html={contact?.hero?.description} as="p" className="contact-hero-description" />
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="contact-form-section">
          <div className="contact-form-container">
            <div className="contact-form-visual">
              <div className="contact-frame">
                <div className="contact-frame-topbar">
                  <div className="contact-frame-dots"><span></span><span></span><span></span></div>
                  <div className="contact-frame-url">
                    <i className="fas fa-lock"></i>
                    <span>venusglobaltech.com/contact</span>
                  </div>
                </div>
                <div className="contact-frame-body">
                  <img src={contact?.image} alt="Get in touch with Venus Global Technology" />
                </div>
              </div>
            </div>

            <div className="contact-form-content">
              <div className="contact-form-header">
                <div className="contact-form-badge">
                  <i className="fas fa-cube"></i>
                  <RichText html={form.badge} as="span" />
                </div>
                <h2 className="contact-form-title">{form.title}</h2>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form-row">
                  <div className="contact-form-group">
                    <label htmlFor="name" className="contact-form-label">{form.nameLabel}</label>
                    <div className="contact-input-wrap">
                      <i className="fas fa-user contact-input-icon"></i>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="contact-form-input"
                        placeholder={form.namePlaceholder}
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="contact-form-group">
                    <label htmlFor="email" className="contact-form-label">{form.emailLabel}</label>
                    <div className="contact-input-wrap">
                      <i className="fas fa-envelope contact-input-icon"></i>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="contact-form-input"
                        placeholder={form.emailPlaceholder}
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="contact-form-row">
                  <div className="contact-form-group">
                    <label htmlFor="phone" className="contact-form-label">{form.phoneLabel}</label>
                    <div className="contact-input-wrap">
                      <i className="fas fa-phone contact-input-icon"></i>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="contact-form-input"
                        placeholder={form.phonePlaceholder}
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="contact-form-group">
                    <label htmlFor="budget" className="contact-form-label">{form.budgetLabel}</label>
                    <div className="contact-input-wrap">
                      <i className="fas fa-sack-dollar contact-input-icon"></i>
                      <input
                        type="text"
                        id="budget"
                        name="budget"
                        className="contact-form-input"
                        placeholder={form.budgetPlaceholder}
                        value={formData.budget}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="contact-form-row">
                  <div className="contact-form-group contact-field-full">
                    <label htmlFor="inquiry" className="contact-form-label">{form.inquiryLabel}</label>
                    <div className="contact-input-wrap contact-input-wrap-textarea">
                      <i className="fas fa-comment-dots contact-input-icon"></i>
                      <textarea
                        id="inquiry"
                        name="inquiry"
                        className="contact-form-textarea"
                        placeholder={form.inquiryPlaceholder}
                        rows="4"
                        value={formData.inquiry}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>

                {submitStatus === 'success' && (
                  <div className="contact-form-success">
                    <i className="fas fa-check-circle"></i>
                    <span>{form.successMessage}</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="contact-form-error">
                    <i className="fas fa-exclamation-circle"></i>
                    <span>{form.errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="contact-form-button"
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? form.submittingButton : form.submitButton}</span>
                  <span className="contact-form-button-arrow">
                    <i className="fas fa-arrow-right"></i>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>

      {/* Global Offices Section */}
      <UpfooterOfficesV2 offices={home?.offices} />

      <FooterV2 />
    </div>
  );
};

export default Contact;
