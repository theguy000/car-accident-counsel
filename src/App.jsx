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
              <h1>AccidentCounsel<span className="pro">Pro</span></h1>
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

              <h2 className="hero-title">Award-Winning Car Accident Attorneys Fighting for Your Rights</h2>

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
              slidesToShow={4}
              slidesToScroll={1}
              autoplay={false}
              cssEase="ease-in-out"
              rows={1}
              slidesPerRow={1}
              responsive={[
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    rows: 1,
                    slidesPerRow: 1,
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 2,
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
                  <div className="result-amount">$30 Million</div>
                  <div className="result-divider"></div>
                  <p className="result-case">Premise Liability Settlement</p>
                </div>
              </div>
              <div>
                <div className="result-card">
                  <div className="result-amount">$20 Million</div>
                  <div className="result-divider"></div>
                  <p className="result-case">Slip & Fall Verdict</p>
                </div>
              </div>
              <div>
                <div className="result-card">
                  <div className="result-amount">$14.1 Million</div>
                  <div className="result-divider"></div>
                  <p className="result-case">Commercial Vehicle Collision</p>
                </div>
              </div>
              <div>
                <div className="result-card">
                  <div className="result-amount">$4.25 Million</div>
                  <div className="result-divider"></div>
                  <p className="result-case">Multi-Vehicle Accident</p>
                </div>
              </div>
              <div>
                <div className="result-card">
                  <div className="result-amount">$3 Million</div>
                  <div className="result-divider"></div>
                  <p className="result-case">Rear-End Collision</p>
                </div>
              </div>
              <div>
                <div className="result-card">
                  <div className="result-amount">$2.5 Million</div>
                  <div className="result-divider"></div>
                  <p className="result-case">Motorcycle Accident</p>
                </div>
              </div>
              <div>
                <div className="result-card">
                  <div className="result-amount">$990,000</div>
                  <div className="result-divider"></div>
                  <p className="result-case">Semi-Truck Collision</p>
                </div>
              </div>
              <div>
                <div className="result-card">
                  <div className="result-amount">$650,000</div>
                  <div className="result-divider"></div>
                  <p className="result-case">Motor Vehicle Accident</p>
                </div>
              </div>
              <div>
                <div className="result-card">
                  <div className="result-amount">$500,000</div>
                  <div className="result-divider"></div>
                  <p className="result-case">Car Accident Settlement</p>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="trust-section">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                </svg>
              </div>
              <h3>Proven Track Record</h3>
              <p>Successfully represented thousands of accident victims</p>
            </div>
            <div className="trust-item">
              <div className="trust-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3>100% Satisfaction Guarantee</h3>
              <p>We're committed to getting you the best outcome</p>
            </div>
            <div className="trust-item">
              <div className="trust-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3>Expert Legal Team</h3>
              <p>Experienced attorneys specializing in accident law</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Benefits */}
      <section className="benefits-section">
        <div className="container">
          <h2 className="section-title">Why Choose AccidentCounsel Pro?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-number">01</div>
              <div className="benefit-corner-accent"></div>
              <h3>No Upfront Costs</h3>
              <p>
                We work on a contingency basis - you don't pay unless we win your case.
                Our fee comes from your settlement, so there's no financial risk to you.
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-number">02</div>
              <div className="benefit-corner-accent"></div>
              <h3>Maximum Compensation</h3>
              <p>
                Our experienced attorneys know how to negotiate with insurance companies
                to ensure you receive the full compensation you deserve for medical bills,
                lost wages, and pain and suffering.
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-number">03</div>
              <div className="benefit-corner-accent"></div>
              <h3>Hassle-Free Process</h3>
              <p>
                We handle all the paperwork, negotiations, and legal complexities.
                You focus on recovery while we fight for your rights and handle everything else.
              </p>
            </div>
          </div>

          {/* Floating decorative elements */}
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>
      </section>

      {/* Process Steps - Vertical Interactive Timeline */}
      <section className="process-section">
        <div className="container">
          <h2 className="section-title">Our Simple 3-Step Process</h2>
          <div className="timeline-container">
            <div className="timeline-line"></div>

            {/* Step 1 - Left Side */}
            <div className="timeline-item timeline-left timeline-first">
              <div className="timeline-content">
                <h3>Free Consultation</h3>
                <p>
                  Contact us for a free, no-obligation consultation. We'll review your case
                  and explain your legal options in plain language.
                </p>
                <button className="btn-cta">Get Started</button>
              </div>
              <div className="timeline-marker">
                <div className="marker-dot">1</div>
              </div>
              <div className="timeline-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  <line x1="9" y1="10" x2="15" y2="10"></line>
                  <line x1="9" y1="14" x2="15" y2="14"></line>
                </svg>
              </div>
            </div>

            {/* Step 2 - Right Side */}
            <div className="timeline-item timeline-right">
              <div className="timeline-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <div className="timeline-marker">
                <div className="marker-dot">2</div>
              </div>
              <div className="timeline-content">
                <h3>Case Evaluation</h3>
                <p>
                  Our legal team will thoroughly investigate your accident, gather evidence,
                  and build a strong case on your behalf.
                </p>
                <button className="btn-cta">Get Started</button>
              </div>
            </div>

            {/* Step 3 - Left Side */}
            <div className="timeline-item timeline-left timeline-last">
              <div className="timeline-content">
                <h3>Get Compensated</h3>
                <p>
                  We negotiate aggressively with insurance companies or take your case to court
                  to secure the maximum compensation you deserve.
                </p>
                <button className="btn-cta">Get Started</button>
              </div>
              <div className="timeline-marker">
                <div className="marker-dot">3</div>
              </div>
              <div className="timeline-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Don't Wait - Get the Help You Deserve Today!</h2>
          <p>Book your FREE consultation or call us now!</p>
          <div className="cta-buttons">
            <a href="tel:1-866-555-0123" className="btn-cta-large">
              <svg className="cta-phone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              (866) 555-0123
            </a>
            <button className="btn-cta-secondary">Free Consultation</button>
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
