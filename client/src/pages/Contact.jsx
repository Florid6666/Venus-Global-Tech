import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/aboutus.css';
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
      {/* EXACT ABOUT US HERO BANNER WITH CONTACT US TITLE */}
      <section className="about-hero-section" style={{ backgroundImage: "url('/images/team/software_engineering.jpg')" }}>
        <div className="about-hero-bg-overlay"></div>
        
        <div className="about-hero-container">
          <div className="about-hero-content">
            <h1 className="about-hero-title">Contact Us</h1>
            
            <div className="about-hero-breadcrumb">
              <Link to="/" className="breadcrumb-item breadcrumb-link">Home</Link>
              <span className="breadcrumb-arrow">→</span>
              <span className="breadcrumb-item breadcrumb-current">Contact Us</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2-COLUMN CLEAN WHITE CONTACT SECTION */}
      <section className="v2-contact-section">
        <div className="v2-contact-container">
          <div className="v2-contact-grid">
            
            {/* LEFT COLUMN: EMAIL & MESSAGE FORM */}
            <div className="v2-contact-left">
              <div className="v2-contact-eyebrow-wrap">
                <span className="v2-contact-eyebrow-line"></span>
                <span className="v2-contact-eyebrow-text">SEND US EMAIL</span>
              </div>

              <h2 className="v2-contact-heading">Feel free to write</h2>

              <form className="v2-contact-form" onSubmit={handleSubmit}>
                {/* Row 1: Your Name */}
                <div className="v2-contact-field-wrap">
                  <input
                    type="text"
                    name="name"
                    className="v2-contact-input"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Row 2: Email Address */}
                <div className="v2-contact-field-wrap">
                  <input
                    type="email"
                    name="email"
                    className="v2-contact-input"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Row 3: Enter Subject & Enter Phone */}
                <div className="v2-contact-row-split">
                  <div className="v2-contact-field-wrap">
                    <input
                      type="text"
                      name="budget"
                      className="v2-contact-input"
                      placeholder="Enter Subject"
                      value={formData.budget}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="v2-contact-field-wrap">
                    <input
                      type="tel"
                      name="phone"
                      className="v2-contact-input"
                      placeholder="Enter Phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Row 4: Write a Message */}
                <div className="v2-contact-field-wrap">
                  <textarea
                    name="inquiry"
                    className="v2-contact-textarea"
                    placeholder="Write a Message"
                    rows="5"
                    value={formData.inquiry}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                {submitStatus === 'success' && (
                  <div className="v2-contact-status success">
                    <i className="fas fa-check-circle"></i>
                    <span>Message sent successfully! We will get back to you soon.</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="v2-contact-status error">
                    <i className="fas fa-exclamation-circle"></i>
                    <span>Failed to send message. Please try again.</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="v2-contact-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'SENDING...' : 'SEND A MESSAGE'}
                </button>
              </form>
            </div>

            {/* RIGHT COLUMN: GET IN TOUCH DETAILS */}
            <div className="v2-contact-right">
              <div className="v2-contact-eyebrow-wrap">
                <span className="v2-contact-eyebrow-line"></span>
                <span className="v2-contact-eyebrow-text">NEED ANY HELP?</span>
              </div>

              <h2 className="v2-contact-heading">Get in touch with us</h2>

              <p className="v2-contact-desc">
                Whether you have a question about services, pricing, technical solutions, or enterprise consulting, our team is ready to answer all your questions.
              </p>

              {/* 3 Contact Info Rows */}
              <div className="v2-contact-info-list">
                {/* Info Card 1: Question / Phone */}
                <div className="v2-contact-info-item">
                  <div className="v2-contact-info-icon-box">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div className="v2-contact-info-content">
                    <h3 className="v2-contact-info-title">Have any question?</h3>
                    <p className="v2-contact-info-text">Free +1 (647) 722-0837</p>
                  </div>
                </div>

                {/* Info Card 2: Write email */}
                <div className="v2-contact-info-item">
                  <div className="v2-contact-info-icon-box">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="v2-contact-info-content">
                    <h3 className="v2-contact-info-title">Write email</h3>
                    <p className="v2-contact-info-text">info@venusglobaltech.com</p>
                  </div>
                </div>

                {/* Info Card 3: Visit anytime */}
                <div className="v2-contact-info-item">
                  <div className="v2-contact-info-icon-box">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="v2-contact-info-content">
                    <h3 className="v2-contact-info-title">Visit anytime</h3>
                    <p className="v2-contact-info-text">Toronto, ON, Canada</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Global Offices Section */}
      <UpfooterOfficesV2 offices={home?.offices} />

      <FooterV2 />
    </div>
  );
};

export default Contact;
