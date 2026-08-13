import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../components/aboutus.css';
import '../components/contact.css';
import FooterV2 from '../components/homev2/FooterV2';
import UpfooterOfficesV2 from '../components/homev2/UpfooterOfficesV2';
import RichText from '../components/RichText';
import { useContent } from '../hooks/useContent';
import { getApiUrl } from '../config/api';

const COUNTRIES_50 = [
  { code: 'us', name: 'United States', prefix: '+1' },
  { code: 'ca', name: 'Canada', prefix: '+1' },
  { code: 'in', name: 'India', prefix: '+91' },
  { code: 'gb', name: 'United Kingdom', prefix: '+44' },
  { code: 'au', name: 'Australia', prefix: '+61' },
  { code: 'ae', name: 'United Arab Emirates', prefix: '+971' },
  { code: 'de', name: 'Germany', prefix: '+49' },
  { code: 'fr', name: 'France', prefix: '+33' },
  { code: 'sg', name: 'Singapore', prefix: '+65' },
  { code: 'jp', name: 'Japan', prefix: '+81' },
  { code: 'cn', name: 'China', prefix: '+86' },
  { code: 'sa', name: 'Saudi Arabia', prefix: '+966' },
  { code: 'nz', name: 'New Zealand', prefix: '+64' },
  { code: 'br', name: 'Brazil', prefix: '+55' },
  { code: 'mx', name: 'Mexico', prefix: '+52' },
  { code: 'it', name: 'Italy', prefix: '+39' },
  { code: 'es', name: 'Spain', prefix: '+34' },
  { code: 'nl', name: 'Netherlands', prefix: '+31' },
  { code: 'se', name: 'Sweden', prefix: '+46' },
  { code: 'no', name: 'Norway', prefix: '+47' },
  { code: 'ch', name: 'Switzerland', prefix: '+41' },
  { code: 'at', name: 'Austria', prefix: '+43' },
  { code: 'be', name: 'Belgium', prefix: '+32' },
  { code: 'dk', name: 'Denmark', prefix: '+45' },
  { code: 'fi', name: 'Finland', prefix: '+358' },
  { code: 'ie', name: 'Ireland', prefix: '+353' },
  { code: 'pt', name: 'Portugal', prefix: '+351' },
  { code: 'pl', name: 'Poland', prefix: '+48' },
  { code: 'za', name: 'South Africa', prefix: '+27' },
  { code: 'kr', name: 'South Korea', prefix: '+82' },
  { code: 'th', name: 'Thailand', prefix: '+66' },
  { code: 'my', name: 'Malaysia', prefix: '+60' },
  { code: 'id', name: 'Indonesia', prefix: '+62' },
  { code: 'ph', name: 'Philippines', prefix: '+63' },
  { code: 'vn', name: 'Vietnam', prefix: '+84' },
  { code: 'tr', name: 'Turkey', prefix: '+90' },
  { code: 'eg', name: 'Egypt', prefix: '+20' },
  { code: 'ng', name: 'Nigeria', prefix: '+234' },
  { code: 'ke', name: 'Kenya', prefix: '+254' },
  { code: 'ar', name: 'Argentina', prefix: '+54' },
  { code: 'cl', name: 'Chile', prefix: '+56' },
  { code: 'co', name: 'Colombia', prefix: '+57' },
  { code: 'pe', name: 'Peru', prefix: '+51' },
  { code: 'il', name: 'Israel', prefix: '+972' },
  { code: 'qa', name: 'Qatar', prefix: '+974' },
  { code: 'kw', name: 'Kuwait', prefix: '+965' },
  { code: 'om', name: 'Oman', prefix: '+968' },
  { code: 'bh', name: 'Bahrain', prefix: '+973' },
  { code: 'jo', name: 'Jordan', prefix: '+962' },
  { code: 'hk', name: 'Hong Kong', prefix: '+852' },
  { code: 'tw', name: 'Taiwan', prefix: '+886' }
];

const PROJECT_OPTIONS = [
  'Software Development',
  'Cloud & DevOps Transformation',
  'AI & Machine Learning',
  'ERP & Enterprise Solutions',
  'QA & Automated Testing',
  'Strategic Technology Consulting',
  'Other Services'
];

const SUBJECT_OPTIONS = [
  'General Inquiry',
  'Project Consultation',
  'Partnership Request',
  'Careers & Hiring',
  'Technical Support & Maintenance',
  'Other'
];

const CustomSelect = ({ placeholder, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="v2-custom-select-container" ref={selectRef}>
      <button
        type="button"
        className={`v2-custom-select-trigger ${!value ? 'is-placeholder' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="v2-custom-select-label">
          {value || placeholder}
        </span>
        <i className={`fas fa-chevron-down v2-custom-select-arrow ${isOpen ? 'open' : ''}`}></i>
      </button>

      {isOpen && (
        <div className="v2-custom-select-popover">
          <div className="v2-custom-select-list">
            {options.map((opt, idx) => (
              <div
                key={idx}
                className={`v2-custom-select-option ${value === opt ? 'selected' : ''}`}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
              >
                <span>{opt}</span>
                {value === opt && <i className="fas fa-check v2-custom-select-check"></i>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Contact = () => {
  const { content: contact } = useContent('contact');
  const { content: home } = useContent('home');

  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES_50[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    otherProjectType: '',
    company: '',
    subjectType: '',
    otherSubjectType: '',
    phone: '',
    inquiry: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const form = contact?.form || {};

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

    const finalProjectType = (formData.projectType === 'Other Services' || formData.projectType === 'Other')
      ? `Other: ${formData.otherProjectType}`
      : formData.projectType;

    const finalSubjectType = (formData.subjectType === 'Other' || formData.subjectType === 'Other Services')
      ? `Other: ${formData.otherSubjectType}`
      : formData.subjectType;

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
          projectType: finalProjectType,
          company: formData.company,
          subjectType: finalSubjectType,
          phone: `${selectedCountry.prefix} ${formData.phone}`.trim(),
          inquiry: formData.inquiry
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          projectType: '',
          otherProjectType: '',
          company: '',
          subjectType: '',
          otherSubjectType: '',
          phone: '',
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

  const filteredCountries = COUNTRIES_50.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.prefix.includes(searchQuery) ||
    c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                
                {/* Row 1: Enter Name & Enter Email (Side-by-Side) */}
                <div className="v2-contact-row-split">
                  <div className="v2-contact-field-wrap">
                    <input
                      type="text"
                      name="name"
                      className="v2-contact-input"
                      placeholder="Enter Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="v2-contact-field-wrap">
                    <input
                      type="email"
                      name="email"
                      className="v2-contact-input"
                      placeholder="Enter Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Row 2: Type of Project Dropdown & Enter Company Name (Side-by-Side) */}
                <div className="v2-contact-row-split">
                  <div className="v2-contact-field-wrap">
                    <CustomSelect
                      placeholder="Type of Project"
                      options={PROJECT_OPTIONS}
                      value={formData.projectType}
                      onChange={(val) => setFormData(prev => ({ ...prev, projectType: val, otherProjectType: '' }))}
                    />
                    {(formData.projectType === 'Other Services' || formData.projectType === 'Other') && (
                      <div className="v2-other-specify-wrap">
                        <input
                          type="text"
                          name="otherProjectType"
                          className="v2-contact-input v2-other-specify-input"
                          placeholder="Please specify your project type..."
                          value={formData.otherProjectType}
                          onChange={handleInputChange}
                          autoFocus
                          required
                        />
                      </div>
                    )}
                  </div>
                  <div className="v2-contact-field-wrap">
                    <input
                      type="text"
                      name="company"
                      className="v2-contact-input"
                      placeholder="Enter Company Name"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Row 3: Type of Subject Dropdown & Enter Phone with Flag Selector (Side-by-Side) */}
                <div className="v2-contact-row-split">
                  <div className="v2-contact-field-wrap">
                    <CustomSelect
                      placeholder="Type of Subject"
                      options={SUBJECT_OPTIONS}
                      value={formData.subjectType}
                      onChange={(val) => setFormData(prev => ({ ...prev, subjectType: val, otherSubjectType: '' }))}
                    />
                    {(formData.subjectType === 'Other' || formData.subjectType === 'Other Services') && (
                      <div className="v2-other-specify-wrap">
                        <input
                          type="text"
                          name="otherSubjectType"
                          className="v2-contact-input v2-other-specify-input"
                          placeholder="Please specify your subject..."
                          value={formData.otherSubjectType}
                          onChange={handleInputChange}
                          autoFocus
                          required
                        />
                      </div>
                    )}
                  </div>
                  <div className="v2-contact-field-wrap v2-phone-field-group">
                    {/* CUSTOM FLAG DROPDOWN SELECTOR */}
                    <div className="v2-custom-country-picker" ref={dropdownRef}>
                      <button
                        type="button"
                        className="v2-country-trigger-btn"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        <img
                          src={`https://flagcdn.com/w40/${selectedCountry.code}.png`}
                          alt={selectedCountry.name}
                          className="v2-country-flag-img"
                        />
                        <span className="v2-country-code-text">{selectedCountry.prefix}</span>
                        <i className={`fas fa-chevron-down v2-country-arrow ${isDropdownOpen ? 'open' : ''}`}></i>
                      </button>

                      {isDropdownOpen && (
                        <div className="v2-country-dropdown-popover">
                          <div className="v2-country-search-wrap">
                            <i className="fas fa-search v2-country-search-icon"></i>
                            <input
                              type="text"
                              className="v2-country-search-input"
                              placeholder="Search country..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              autoFocus
                            />
                          </div>

                          <div className="v2-country-list-scroll">
                            {filteredCountries.length > 0 ? (
                              filteredCountries.map((c) => (
                                <div
                                  key={c.code}
                                  className={`v2-country-option-item ${selectedCountry.code === c.code ? 'selected' : ''}`}
                                  onClick={() => {
                                    setSelectedCountry(c);
                                    setIsDropdownOpen(false);
                                    setSearchQuery('');
                                  }}
                                >
                                  <img
                                    src={`https://flagcdn.com/w40/${c.code}.png`}
                                    alt={c.name}
                                    className="v2-country-flag-img-small"
                                  />
                                  <span className="v2-country-option-name">{c.name}</span>
                                  <span className="v2-country-option-prefix">{c.prefix}</span>
                                </div>
                              ))
                            ) : (
                              <div className="v2-country-no-results">No countries found</div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <input
                      type="tel"
                      name="phone"
                      className="v2-contact-input v2-phone-input-with-prefix"
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
