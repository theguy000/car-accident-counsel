import { useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './App.css'

function App() {
  const [formStep, setFormStep] = useState(1)
  const [formData, setFormData] = useState({
    injuryType: '',
    accidentDate: '',
    name: '',
    email: '',
    phone: ''
  })
  const [dropdownOpen, setDropdownOpen] = useState({
    injuryType: false,
    accidentDate: false
  })
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [validationErrors, setValidationErrors] = useState({
    name: '',
    email: '',
    phone: ''
  })

  // Testimonial slider settings
  const testimonialSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: true,
    pauseOnHover: true
  }

  // Validation functions
  const validateName = (name) => {
    const trimmedName = name.trim()
    if (!trimmedName) {
      return 'Name is required'
    }
    if (trimmedName.length < 2) {
      return 'Name must be at least 2 characters'
    }
    if (!/^[a-zA-Z\s'-]+$/.test(trimmedName)) {
      return 'Name can only contain letters, spaces, hyphens, and apostrophes'
    }
    if (trimmedName.length > 50) {
      return 'Name must be less than 50 characters'
    }
    return ''
  }

  const validateEmail = (email) => {
    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      return 'Email is required'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmedEmail)) {
      return 'Please enter a valid email address'
    }
    return ''
  }

  const validatePhone = (phone) => {
    const trimmedPhone = phone.trim()
    if (!trimmedPhone) {
      return 'Phone number is required'
    }
    // Remove all non-digit characters for validation
    const digitsOnly = trimmedPhone.replace(/\D/g, '')
    // US phone numbers are 10 digits (without country code) or 11 digits (with +1)
    if (digitsOnly.length !== 10 && digitsOnly.length !== 11) {
      return 'US phone number must be 10 or 11 digits'
    }
    // If 11 digits, first digit must be 1 (country code)
    if (digitsOnly.length === 11 && digitsOnly[0] !== '1') {
      return 'Invalid country code for US number'
    }
    // Check if it's a valid phone format (allows various formats)
    const phoneRegex = /^[\d\s\-\(\)\+]+$/
    if (!phoneRegex.test(trimmedPhone)) {
      return 'Please enter a valid phone number'
    }
    return ''
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })

    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: ''
      })
    }
  }

  const toggleDropdown = (name) => {
    setDropdownOpen({
      ...dropdownOpen,
      [name]: !dropdownOpen[name]
    })
  }

  const selectOption = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
    setDropdownOpen({
      ...dropdownOpen,
      [name]: false
    })
  }

  const handleNext = () => {
    // Validate current step before proceeding
    if (formStep === 1 && !formData.injuryType) {
      return // Don't proceed if injury type not selected
    }
    if (formStep === 2 && !formData.accidentDate) {
      return // Don't proceed if accident date not selected
    }
    if (formStep === 3) {
      const nameError = validateName(formData.name)
      if (nameError) {
        setValidationErrors({ ...validationErrors, name: nameError })
        return
      }
    }
    if (formStep === 4) {
      const emailError = validateEmail(formData.email)
      if (emailError) {
        setValidationErrors({ ...validationErrors, email: emailError })
        return
      }
    }

    if (formStep < 5) {
      setFormStep(formStep + 1)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate all fields
    const nameError = validateName(formData.name)
    const emailError = validateEmail(formData.email)
    const phoneError = validatePhone(formData.phone)

    if (nameError || emailError || phoneError) {
      setValidationErrors({
        name: nameError,
        email: emailError,
        phone: phoneError
      })
      return
    }

    // Validate dropdown selections
    if (!formData.injuryType || !formData.accidentDate) {
      return
    }

    // Ensure we're on step 5
    if (formStep !== 5) {
      return
    }

    console.log('Form submitted:', formData)
    setShowSuccessPopup(true)
  }

  const handleKeyDown = (e) => {
    // Prevent Enter key from submitting form unless on step 5 with all fields filled
    if (e.key === 'Enter') {
      e.preventDefault()

      if (formStep < 5) {
        handleNext() // Move to next step instead of submitting
      } else if (formStep === 5 && formData.phone.trim()) {
        handleSubmit(e) // Only submit on step 5 if phone is filled
      }
    }
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <img src="/logo.png" alt="AccidentCounsel Pro" className="logo-img" />
            </div>
            <div className="header-contact">
              <a href="tel:1-866-555-0123" className="phone-link">
                <span className="phone-number">(866) 555-0123</span>
                <span className="phone-cta">GET A FREE CONSULTATION 24/7</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        {/* Animated Background Particles */}
        <div className="hero-particles">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
        </div>

        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-trust-line">
                <span className="trust-badge-inline">25+ Years Experience</span>
                <span className="trust-separator">•</span>
                <span className="trust-badge-inline">5,000+ Cases Won</span>
                <span className="trust-separator">•</span>
                <span className="trust-badge-inline">$67M+ Recovered</span>
              </div>

              <h2 className="hero-title">
                <span className="hero-title-accent">Award-Winning</span> Car Accident Attorneys Fighting for Your Rights
              </h2>

              <p className="hero-subtitle">
                Free consultation. No fees unless we win. Maximum compensation guaranteed.
              </p>

              {/* CTA Phone Button */}
              <div className="hero-cta">
                <a href="tel:1-866-555-0123" className="btn-hero-phone">
                  <svg className="phone-icon-large" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <div className="phone-cta-content">
                    <span className="phone-cta-label">Get Your Free Case Evaluation</span>
                    <span className="phone-cta-number">(866) 555-0123</span>
                  </div>
                </a>
              </div>

              <div className="hero-features">
                <span className="hero-feature-item">
                  <svg className="checkmark-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Free Consultation
                </span>
                <span className="hero-feature-item">
                  <svg className="checkmark-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  No Win, No Fee
                </span>
                <span className="hero-feature-item">
                  <svg className="checkmark-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  24/7 Support
                </span>
              </div>
            </div>

            {/* Qualification Form */}
            <div className="form-wrapper">
              <div className="qualification-form">
                <div className="form-header">
                  <div className="form-header-left">
                    <h3>See If You Qualify for Compensation!</h3>
                    <p className="form-subtitle">Follow the steps below to get started</p>
                  </div>
                  <div className="form-step-indicator-right">
                    Step {formStep} of 5
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="form-progress-container">
                  <div className="form-progress-bar">
                    <div className="form-progress-fill" style={{ width: `${(formStep / 5) * 100}%` }}></div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>

                  {formStep === 1 && (
                    <div className="form-step">
                      <label htmlFor="injuryType">What type of injuries did you sustain?</label>
                      <div className="custom-dropdown">
                        <div
                          className={`dropdown-selected ${dropdownOpen.injuryType ? 'open' : ''}`}
                          onClick={() => toggleDropdown('injuryType')}
                        >
                          {formData.injuryType ?
                            (formData.injuryType === 'minor' ? 'Minor injuries (cuts, bruises)' :
                              formData.injuryType === 'moderate' ? 'Moderate injuries (fractures, sprains)' :
                                formData.injuryType === 'severe' ? 'Severe injuries (head trauma, spinal injury)' :
                                  'Wrongful death')
                            : 'Select injury type'}
                          <svg className="dropdown-icon" viewBox="0 0 20 20" fill="none">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" fill="currentColor" />
                          </svg>
                        </div>
                        {dropdownOpen.injuryType && (
                          <div className="dropdown-options">
                            <div className="dropdown-option" onClick={() => selectOption('injuryType', 'minor')}>
                              <div className="option-icon minor-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                              </div>
                              <div className="option-content">
                                <div className="option-title">Minor injuries</div>
                                <div className="option-desc">Cuts, bruises, minor pain</div>
                              </div>
                            </div>
                            <div className="dropdown-option" onClick={() => selectOption('injuryType', 'moderate')}>
                              <div className="option-icon moderate-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                              </div>
                              <div className="option-content">
                                <div className="option-title">Moderate injuries</div>
                                <div className="option-desc">Fractures, sprains, significant pain</div>
                              </div>
                            </div>
                            <div className="dropdown-option" onClick={() => selectOption('injuryType', 'severe')}>
                              <div className="option-icon severe-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                                  <line x1="12" y1="9" x2="12" y2="13" />
                                  <circle cx="12" cy="17" r="0.5" fill="currentColor" />
                                </svg>
                              </div>
                              <div className="option-content">
                                <div className="option-title">Severe injuries</div>
                                <div className="option-desc">Head trauma, spinal injury, hospitalization</div>
                              </div>
                            </div>
                            <div className="dropdown-option" onClick={() => selectOption('injuryType', 'fatal')}>
                              <div className="option-icon fatal-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                  <circle cx="12" cy="12" r="10" />
                                  <line x1="12" y1="8" x2="12" y2="12" />
                                  <circle cx="12" cy="16" r="0.5" fill="currentColor" />
                                </svg>
                              </div>
                              <div className="option-content">
                                <div className="option-title">Wrongful death</div>
                                <div className="option-desc">Fatal accident, loss of loved one</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <button type="button" onClick={handleNext} className="btn-next">
                        Next
                      </button>
                    </div>
                  )}

                  {formStep === 2 && (
                    <div className="form-step">
                      <label htmlFor="accidentDate">When did the accident occur?</label>
                      <div className="custom-dropdown">
                        <div
                          className={`dropdown-selected ${dropdownOpen.accidentDate ? 'open' : ''}`}
                          onClick={() => toggleDropdown('accidentDate')}
                        >
                          {formData.accidentDate ?
                            (formData.accidentDate === 'last-week' ? 'Within the last week' :
                              formData.accidentDate === 'last-month' ? 'Within the last month' :
                                formData.accidentDate === '1-6-months' ? '1-6 months ago' :
                                  formData.accidentDate === '6-12-months' ? '6-12 months ago' :
                                    'Over a year ago')
                            : 'Select timeframe'}
                          <svg className="dropdown-icon" viewBox="0 0 20 20" fill="none">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" fill="currentColor" />
                          </svg>
                        </div>
                        {dropdownOpen.accidentDate && (
                          <div className="dropdown-options">
                            <div className="dropdown-option" onClick={() => selectOption('accidentDate', 'last-week')}>
                              <div className="option-icon recent-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <circle cx="12" cy="12" r="10" />
                                  <polyline points="12 6 12 12 16 14" />
                                </svg>
                              </div>
                              <div className="option-content">
                                <div className="option-title">Within the last week</div>
                                <div className="option-desc">Very recent accident, fresh evidence</div>
                              </div>
                            </div>
                            <div className="dropdown-option" onClick={() => selectOption('accidentDate', 'last-month')}>
                              <div className="option-icon recent-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                  <line x1="16" y1="2" x2="16" y2="6" />
                                  <line x1="8" y1="2" x2="8" y2="6" />
                                  <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                              </div>
                              <div className="option-content">
                                <div className="option-title">Within the last month</div>
                                <div className="option-desc">Recent accident, good timeframe for claims</div>
                              </div>
                            </div>
                            <div className="dropdown-option" onClick={() => selectOption('accidentDate', '1-6-months')}>
                              <div className="option-icon medium-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                  <line x1="16" y1="2" x2="16" y2="6" />
                                  <line x1="8" y1="2" x2="8" y2="6" />
                                  <line x1="3" y1="10" x2="21" y2="10" />
                                  <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
                                </svg>
                              </div>
                              <div className="option-content">
                                <div className="option-title">1-6 months ago</div>
                                <div className="option-desc">Still within statute of limitations</div>
                              </div>
                            </div>
                            <div className="dropdown-option" onClick={() => selectOption('accidentDate', '6-12-months')}>
                              <div className="option-icon medium-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <circle cx="12" cy="12" r="10" />
                                  <polyline points="12 6 12 12 16 14" />
                                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                                </svg>
                              </div>
                              <div className="option-content">
                                <div className="option-title">6-12 months ago</div>
                                <div className="option-desc">Act soon, time-sensitive claim</div>
                              </div>
                            </div>
                            <div className="dropdown-option" onClick={() => selectOption('accidentDate', 'over-year')}>
                              <div className="option-icon old-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <circle cx="12" cy="12" r="10" />
                                  <polyline points="12 6 12 12 16 14" />
                                </svg>
                              </div>
                              <div className="option-content">
                                <div className="option-title">Over a year ago</div>
                                <div className="option-desc">May have statute limitations, consult immediately</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <button type="button" onClick={handleNext} className="btn-next">
                        Next
                      </button>
                    </div>
                  )}

                  {formStep === 3 && (
                    <div className="form-step">
                      <label htmlFor="name">What is your name?</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        required
                        className={validationErrors.name ? 'input-error' : ''}
                      />
                      {validationErrors.name && (
                        <div className="error-message">{validationErrors.name}</div>
                      )}
                      <button type="button" onClick={handleNext} className="btn-next">
                        Next
                      </button>
                    </div>
                  )}

                  {formStep === 4 && (
                    <div className="form-step">
                      <label htmlFor="email">What is your email?</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        required
                        className={validationErrors.email ? 'input-error' : ''}
                      />
                      {validationErrors.email && (
                        <div className="error-message">{validationErrors.email}</div>
                      )}
                      <button type="button" onClick={handleNext} className="btn-next">
                        Next
                      </button>
                    </div>
                  )}

                  {formStep === 5 && (
                    <div className="form-step">
                      <label htmlFor="phone">What is your phone number?</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(555) 123-4567"
                        required
                        className={validationErrors.phone ? 'input-error' : ''}
                      />
                      {validationErrors.phone && (
                        <div className="error-message">{validationErrors.phone}</div>
                      )}
                      <button type="submit" className="btn-submit">
                        Get My Free Consultation
                      </button>
                    </div>
                  )}
                </form>

                {/* Review Platform Badges */}
                <div className="form-badges">
                  <h4 className="form-badges-title">Trusted By Clients Across All Platforms</h4>
                  <div className="form-badges-grid">
                    <div>
                      <img decoding="async" src="/badges/yelp.svg" alt="Benson and Bingham is 5-Star Rated on Yelp" width="318" height="214" className="form-badge-img" role="img" />
                    </div>
                    <div>
                      <img decoding="async" src="/badges/google.svg" alt="5-Star Google Reviews for Benson and Bingham Car Accident and Personal Injury Lawyers" width="370" height="182" className="form-badge-img" role="img" />
                    </div>
                    <div>
                      <img decoding="async" src="/badges/bbb.svg" alt="Our Personal Injury Law Firm Holds a 5-Star BBB Rating" width="417" height="182" className="form-badge-img" role="img" />
                    </div>
                    <div className="png-fix">
                      <img decoding="async" src="/badges/justia.png" alt="Top-Rated Las Vegas Lawyers on Justia" width="86" height="45" className="form-badge-img" />
                    </div>
                    <div>
                      <img decoding="async" src="/badges/avvo.svg" alt="Highly Rated PI Lawyers on Avvo" width="325" height="173" className="form-badge-img" role="img" />
                    </div>
                    <div>
                      <img decoding="async" src="/badges/facebook.svg" alt="Las Vegas Personal Injury Law Firm with 5-Star Reviews on Facebook" width="445" height="174" className="form-badge-img" role="img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Gallery */}
          <div className="hero-gallery">
            <div className="hero-gallery-inner">
              <span><img loading="lazy" decoding="async" src="/badges-hero/award-1.svg" alt="Award Badge" /></span>
              <span><img loading="lazy" decoding="async" src="/badges-hero/award-2.svg" alt="Award Badge" /></span>
              <span><img loading="lazy" decoding="async" src="/badges-hero/award-3.svg" alt="Award Badge" /></span>
              <span><img loading="lazy" decoding="async" src="/badges-hero/award-4.svg" alt="Award Badge" /></span>
              <span><img loading="lazy" decoding="async" src="/badges-hero/award-5.svg" alt="Award Badge" /></span>
              <span><img loading="lazy" decoding="async" src="/badges-hero/award-6.svg" alt="Award Badge" /></span>
              <span><img loading="lazy" decoding="async" src="/badges-hero/award-7.svg" alt="Award Badge" /></span>
              <span><img loading="lazy" decoding="async" src="/badges-hero/award-8.svg" alt="Award Badge" /></span>
              <span><img loading="lazy" decoding="async" src="/badges-hero/award-9.svg" alt="Award Badge" /></span>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section - Slick Carousel */}
      <section className="results-section">
        <div className="container">
          <div className="results-section-header">
            <h2 className="results-section-title">Verdicts & Settlements</h2>
            <p className="results-section-subtitle">
              Over $67 Million recovered for our clients - Our track record speaks for itself
            </p>
          </div>
          <div className="results-carousel-container">
            <Slider
              className="results-carousel"
              dots={false}
              infinite={true}
              speed={600}
              slidesToShow={3}
              slidesToScroll={1}
              autoplay={false}
              cssEase="ease-in-out"
              rows={1}
              slidesPerRow={1}
              responsive={[
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    rows: 1,
                    slidesPerRow: 1,
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    rows: 1,
                    slidesPerRow: 1,
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    rows: 1,
                    slidesPerRow: 1,
                  }
                }
              ]}
            >
              <div>
                <div className="result-card">
                  <div className="result-amount">$990,000</div>
                  <p className="result-case">Semi-Truck Collision</p>
                </div>
              </div>
              <div>
                <div className="result-card">
                  <div className="result-amount">$650,000</div>
                  <p className="result-case">Motor Vehicle Accident</p>
                </div>
              </div>
              <div>
                <div className="result-card">
                  <div className="result-amount">$500,000</div>
                  <p className="result-case">Car Accident Settlement</p>
                </div>
              </div>
              <div>
                <div className="result-card">
                  <div className="result-amount">$30 Million</div>
                  <p className="result-case">Premise Liability Settlement</p>
                </div>
              </div>
              <div>
                <div className="result-card">
                  <div className="result-amount">$20 Million</div>
                  <p className="result-case">Slip & Fall Verdict</p>
                </div>
              </div>
              <div>
                <div className="result-card">
                  <div className="result-amount">$14.1 Million</div>
                  <p className="result-case">Commercial Vehicle Collision</p>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="trust-section">
        <div className="container">
          <div className="trust-header">
            <h2>Trusted by Accident Victims Nationwide</h2>
            <p>Our commitment to excellence has earned us recognition from clients and industry leaders alike</p>
          </div>

          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-number">$67M+</div>
              <h3>Recovered for Clients</h3>
              <p>We've secured over $67 million in compensation for accident victims and their families</p>
            </div>

            <div className="trust-item">
              <div className="trust-number">5,000+</div>
              <h3>Cases Successfully Resolved</h3>
              <p>Thousands of satisfied clients who received the justice they deserved</p>
            </div>

            <div className="trust-item">
              <div className="trust-number">95%</div>
              <h3>Success Rate</h3>
              <p>Our proven track record speaks for itself - we win the vast majority of cases we take</p>
            </div>

            <div className="trust-item">
              <div className="trust-number">25+</div>
              <h3>Years of Experience</h3>
              <p>Over two decades fighting for accident victims' rights and maximum compensation</p>
            </div>
          </div>

          <div className="trust-testimonial-slider">
            <Slider {...testimonialSettings}>
              <div className="trust-testimonial">
                <div className="testimonial-stars">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                  </svg>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                  </svg>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                  </svg>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                  </svg>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                  </svg>
                </div>
                <blockquote className="testimonial-quote">
                  "I can't express how grateful I am for the outstanding service provided by Chris Burk and his team. They truly went above and beyond, making the entire process as easy as possible for me. From handling all the necessary paperwork to taking care of the details, they did the dirty work, allowing me to focus on my recovery. Thank you for your professionalism, efficiency, and genuine care. I highly recommend their services to anyone in need."
                </blockquote>
                <div className="testimonial-author">
                  <strong>L.T.</strong>
                </div>
              </div>

              <div className="trust-testimonial">
                <div className="testimonial-stars">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                  </svg>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                  </svg>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                  </svg>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                  </svg>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                  </svg>
                </div>
                <blockquote className="testimonial-quote">
                  "Chris works hard to get you the cash and care you deserve. His professional and friendly staff provide excellent support throughout the entire process. Chris supports veterans and made it his personal mission to help me and my family, thank you!"
                </blockquote>
                <div className="testimonial-author">
                  <strong>Michael Tomasello</strong>
                </div>
              </div>

              <div className="trust-testimonial">
                <div className="testimonial-stars">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                  </svg>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                  </svg>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                  </svg>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                  </svg>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                  </svg>
                </div>
                <blockquote className="testimonial-quote">
                  "After my accident, I was overwhelmed and didn't know where to turn. This team fought tirelessly for me and recovered over $380,000. They truly care about their clients and getting justice."
                </blockquote>
                <div className="testimonial-author">
                  <strong>Jennifer M.</strong> <span>Car Accident Victim</span>
                </div>
              </div>

              <div className="trust-testimonial">
                <div className="testimonial-stars">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                  </svg>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                  </svg>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                  </svg>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                  </svg>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                  </svg>
                </div>
                <blockquote className="testimonial-quote">
                  "The team was incredibly responsive and kept me informed every step of the way. They secured a settlement that exceeded my expectations and made sure I received the medical care I needed. Highly professional and compassionate."
                </blockquote>
                <div className="testimonial-author">
                  <strong>Robert K.</strong> <span>Rear-End Collision Victim</span>
                </div>
              </div>

              <div className="trust-testimonial">
                <div className="testimonial-stars">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                  </svg>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                  </svg>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                  </svg>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                  </svg>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                  </svg>
                </div>
                <blockquote className="testimonial-quote">
                  "I was hesitant to hire a lawyer, but I'm so glad I did. They handled everything with the insurance company and got me a fair settlement. No upfront costs and they delivered on every promise. Thank you for fighting for me!"
                </blockquote>
                <div className="testimonial-author">
                  <strong>Sarah P.</strong> <span>T-Bone Accident Survivor</span>
                </div>
              </div>

              <div className="trust-testimonial">
                <div className="testimonial-stars">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                  </svg>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                  </svg>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                  </svg>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                  </svg>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                  </svg>
                </div>
                <blockquote className="testimonial-quote">
                  "From the first consultation to the final settlement, this firm showed nothing but dedication and expertise. They recovered $520,000 for my injuries and lost wages. I couldn't have asked for better representation."
                </blockquote>
                <div className="testimonial-author">
                  <strong>David H.</strong> <span>Head-On Collision Victim</span>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </section>


      {/* Personal Injury Practice Areas */}
      <section className="practice-areas-section">
        <div className="container">
          <div className="practice-areas-header">
            <h2 className="practice-areas-main-title">
              <span className="title-accent">Personal Injury</span>
              <span className="title-main">Practice Areas</span>
            </h2>
            <div className="practice-areas-divider">
              <div className="divider-line"></div>
              <div className="divider-dot"></div>
              <div className="divider-line"></div>
            </div>
            <p className="practice-areas-subtitle">
              We represent victims injured in serious accidents. Whether you were rear-ended in traffic, hit by a distracted driver, or injured in a rideshare or trucking collision, our team of experienced injury lawyers is here to help.
            </p>
          </div>
          <div className="practice-areas-grid">
            {/* Car Accidents */}
            <div className="practice-area-card">
              <div className="practice-area-image-wrapper">
                <img 
                  src="/practice-areas/Car-Accidents.jpg" 
                  alt="Car Accident Scene" 
                  className="practice-area-image"
                  loading="lazy"
                />
              </div>
              <div className="practice-area-content">
                <h3 className="practice-area-title">CAR ACCIDENTS</h3>
                <p className="practice-area-description">
                  When you've been injured in a vehicle accident, we're here to fight for you. 
                  Our experienced car accident attorneys handle insurance negotiations and pursue 
                  maximum compensation for your injuries, lost wages, and damages.
                </p>
                <div className="practice-area-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Motorcycle Accidents */}
            <div className="practice-area-card">
              <div className="practice-area-image-wrapper">
                <img 
                  src="/practice-areas/Motorcycle-Accidents.jpg" 
                  alt="Motorcycle Accident Scene" 
                  className="practice-area-image"
                  loading="lazy"
                />
              </div>
              <div className="practice-area-content">
                <h3 className="practice-area-title">MOTORCYCLE ACCIDENTS</h3>
                <p className="practice-area-description">
                  Motorcycle riders face unique risks on the road. Our motorcycle accident 
                  lawyers understand the complexities of these cases and fight to secure 
                  fair compensation for your injuries and recovery.
                </p>
                <div className="practice-area-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Truck Accidents */}
            <div className="practice-area-card">
              <div className="practice-area-image-wrapper">
                <img 
                  src="/practice-areas/Truck-Accidents.jpg" 
                  alt="Truck Accident Scene" 
                  className="practice-area-image"
                  loading="lazy"
                />
              </div>
              <div className="practice-area-content">
                <h3 className="practice-area-title">TRUCK ACCIDENTS</h3>
                <p className="practice-area-description">
                  Commercial truck accidents often result in severe injuries. Our truck accident 
                  attorneys have the expertise to handle complex liability issues and pursue 
                  full compensation for your recovery.
                </p>
                <div className="practice-area-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Pedestrian Accidents */}
            <div className="practice-area-card">
              <div className="practice-area-image-wrapper">
                <img 
                  src="/practice-areas/Pedestrian-Accidents.jpg" 
                  alt="Pedestrian Accident Scene" 
                  className="practice-area-image"
                  loading="lazy"
                />
              </div>
              <div className="practice-area-content">
                <h3 className="practice-area-title">PEDESTRIAN ACCIDENTS</h3>
                <p className="practice-area-description">
                  Pedestrians are highly vulnerable in road accidents, often suffering serious 
                  injuries. Our pedestrian accident lawyers fight to recover medical costs, 
                  lost wages, and damages for victims hit by negligent drivers.
                </p>
                <div className="practice-area-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Bicycle Accidents */}
            <div className="practice-area-card">
              <div className="practice-area-image-wrapper">
                <img 
                  src="/practice-areas/Bicycle-Accidents.jpg" 
                  alt="Bicycle Accident Scene" 
                  className="practice-area-image"
                  loading="lazy"
                />
              </div>
              <div className="practice-area-content">
                <h3 className="practice-area-title">BICYCLE ACCIDENTS</h3>
                <p className="practice-area-description">
                  A bicycle accident can lead to devastating injuries and long recoveries. Our 
                  skilled bike accident attorneys handle insurance companies and negligent drivers 
                  to secure maximum compensation for your injuries.
                </p>
                <div className="practice-area-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Bus Accidents */}
            <div className="practice-area-card">
              <div className="practice-area-image-wrapper">
                <img 
                  src="/practice-areas/Bus-Accidents.jpg" 
                  alt="Bus Accident Scene" 
                  className="practice-area-image"
                  loading="lazy"
                />
              </div>
              <div className="practice-area-content">
                <h3 className="practice-area-title">BUS ACCIDENTS</h3>
                <p className="practice-area-description">
                  Injured in a bus accident? These cases involve complex liability issues and 
                  powerful companies. Our experienced bus accident lawyers help victims claim 
                  fair compensation for medical bills, lost income, and suffering.
                </p>
                <div className="practice-area-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Slip and Fall Injuries */}
            <div className="practice-area-card">
              <div className="practice-area-image-wrapper">
                <img 
                  src="/practice-areas/Slip-and-Fall-Injuries-.jpg" 
                  alt="Slip and Fall Accident" 
                  className="practice-area-image"
                  loading="lazy"
                />
              </div>
              <div className="practice-area-content">
                <h3 className="practice-area-title">SLIP AND FALL INJURIES</h3>
                <p className="practice-area-description">
                  A slip and fall accident can cause broken bones, head trauma, and lasting pain. 
                  Our skilled premises liability lawyers hold negligent property owners accountable 
                  and fight for your right to fair compensation.
                </p>
                <div className="practice-area-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Uber and Lyft Accidents */}
            <div className="practice-area-card">
              <div className="practice-area-image-wrapper">
                <img 
                  src="/practice-areas/Uber-and-Lyft-Accidents-.jpg" 
                  alt="Uber and Lyft Accident Scene" 
                  className="practice-area-image"
                  loading="lazy"
                />
              </div>
              <div className="practice-area-content">
                <h3 className="practice-area-title">UBER AND LYFT ACCIDENTS</h3>
                <p className="practice-area-description">
                  Rideshare crashes often involve complex insurance disputes. Our experienced Uber 
                  and Lyft accident attorneys know how to handle these claims and ensure victims 
                  get maximum compensation. We stand by you against big insurers.
                </p>
                <div className="practice-area-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Dog Bite Injuries */}
            <div className="practice-area-card">
              <div className="practice-area-image-wrapper">
                <img 
                  src="/practice-areas/Dog-Bite-Injuries.jpg" 
                  alt="Dog Bite Injury" 
                  className="practice-area-image"
                  loading="lazy"
                />
              </div>
              <div className="practice-area-content">
                <h3 className="practice-area-title">DOG BITE INJURIES</h3>
                <p className="practice-area-description">
                  Dog attacks can leave victims with serious injuries, scarring, and emotional trauma. 
                  Our dedicated dog bite lawyers pursue justice and compensation for medical bills, 
                  lost wages, and suffering. We protect your rights every step of the way.
                </p>
                <div className="practice-area-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Wrongful Death Claims */}
            <div className="practice-area-card">
              <div className="practice-area-image-wrapper">
                <img 
                  src="/practice-areas/Wrongful-Death-Claims-.jpg" 
                  alt="Wrongful Death Claim" 
                  className="practice-area-image"
                  loading="lazy"
                />
              </div>
              <div className="practice-area-content">
                <h3 className="practice-area-title">WRONGFUL DEATH CLAIMS</h3>
                <p className="practice-area-description">
                  Losing a loved one due to negligence is devastating. Our experienced wrongful death 
                  attorneys help families pursue justice and secure compensation for funeral costs, 
                  lost income, and emotional suffering. We stand by you in this difficult time.
                </p>
                <div className="practice-area-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <div className="cta-badge">Award-Winning Legal Representation</div>
            <h2 className="cta-heading">Take Action Today - Your Recovery Starts Here</h2>
            <p className="cta-description">Connect with our experienced team for a confidential case evaluation. We're here to help you understand your rights and explore your options.</p>
            
            <div className="cta-features">
              <div className="cta-feature-item">
                <svg className="cta-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Expert Legal Team</span>
              </div>
              <div className="cta-feature-item">
                <svg className="cta-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Maximum Compensation</span>
              </div>
              <div className="cta-feature-item">
                <svg className="cta-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Proven Track Record</span>
              </div>
            </div>

            <div className="cta-buttons">
              <a href="tel:1-866-555-0123" className="btn-cta-large">
                <svg className="cta-phone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <div className="btn-cta-phone-content">
                  <span className="btn-cta-label">Speak With An Attorney</span>
                  <span className="btn-cta-number">(866) 555-0123</span>
                </div>
              </a>
              <button className="btn-cta-secondary">Get Started Online</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 AccidentCounsel Pro. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Custom Success Popup */}
      {showSuccessPopup && (
        <div className="popup-overlay" onClick={() => setShowSuccessPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h2>Thank You!</h2>
            <p>We will contact you shortly to discuss your case.</p>
            <p className="popup-subtext">Our team will reach out within 24 hours.</p>
            <button className="popup-close-btn" onClick={() => setShowSuccessPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
