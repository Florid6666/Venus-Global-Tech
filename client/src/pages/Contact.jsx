import React, { useState } from 'react';
import '../components/contact.css';
import Footer from '../components/Footer';
import GlobalOffices from '../components/GlobalOffices';
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
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-container">
          <h1 className="contact-hero-title">{contact?.hero?.title}</h1>
          <RichText html={contact?.hero?.description} as="p" className="contact-hero-description" />
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="contact-form-container">
          <div className="contact-form-image">
            <img src={contact?.image} alt="Contact Us" />
          </div>
          <div className="contact-form-content">
            <div className="contact-form-header">
              <div className="contact-form-badge">
                <i className="fas fa-cube"></i>
                <RichText html={form.badge} as="span" />
              </div>
              <h2 className="contact-form-title">{form.title}</h2>
              <div className="contact-form-divider"></div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">{form.nameLabel}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder={form.namePlaceholder}
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">{form.emailLabel}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder={form.emailPlaceholder}
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">{form.phoneLabel}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-input"
                    placeholder={form.phonePlaceholder}
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="budget" className="form-label">{form.budgetLabel}</label>
                  <input
                    type="text"
                    id="budget"
                    name="budget"
                    className="form-input"
                    placeholder={form.budgetPlaceholder}
                    value={formData.budget}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="inquiry" className="form-label">{form.inquiryLabel}</label>
                  <textarea
                    id="inquiry"
                    name="inquiry"
                    className="form-textarea"
                    placeholder={form.inquiryPlaceholder}
                    rows="4"
                    value={formData.inquiry}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
              </div>

              {submitStatus === 'success' && (
                <div className="form-success">
                  <i className="fas fa-check-circle"></i>
                  <span>{form.successMessage}</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="form-error">
                  <i className="fas fa-exclamation-circle"></i>
                  <span>{form.errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                className="contact-form-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? form.submittingButton : form.submitButton}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Global Offices Section */}
      <GlobalOffices offices={home?.offices} />

      <Footer />
    </div>
  );
};

export default Contact;
