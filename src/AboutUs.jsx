import { Link, useLocation } from 'react-router-dom'
import { Scale, ShieldCheck, Handshake, Trophy, UserCheck, Shield, Clock, Award } from 'lucide-react'
import Slider from 'react-slick'
import SlotNumber from './SlotNumber'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './App.css'

function AboutUs() {
  const location = useLocation()
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

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <Link to="/">
                <img src="/logo.png" alt="AccidentCounsel Pro" className="logo-img" />
              </Link>
            </div>
            <nav className="header-nav">
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
              <Link to="/about-us" className={`nav-link ${location.pathname === '/about-us' ? 'active' : ''}`}>About Us</Link>
            </nav>
            <div className="header-contact">
              <a href="tel:1-866-555-0123" className="phone-link">
                <span className="phone-number">(866) 555-0123</span>
                <span className="phone-cta">GET A FREE CONSULTATION 24/7</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* About Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <div className="about-hero-badge">Our Story</div>
            <h1 className="about-hero-title">
              <span className="about-hero-title-line">Dedicated to</span>
              <span className="about-hero-title-line">Justice & Excellence</span>
            </h1>
            <p className="about-hero-subtitle">
              For over 25 years, we've been fighting for accident victims' rights, securing maximum compensation, and delivering justice when it matters most.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="about-mission-section">
        <div className="container">
          <div className="mission-story-wrapper">
            {/* Main Story Card */}
            <div className="mission-story-hero">
              <div className="mission-story-icon">
                <Scale size={48} strokeWidth={1.5} />
              </div>
              <h2 className="mission-story-title">Our Mission</h2>
              <p className="mission-story-lead">
                Every accident victim deserves a champion. Someone who will fight tirelessly, advocate relentlessly, and never back down because your recovery isn't just a case to us, it's a story that deserves justice.
              </p>
              <div className="mission-story-body">
                <p>
                  We founded this firm on a simple belief: <strong>that exceptional legal representation should be accessible to everyone</strong>, regardless of their circumstances. Over 25 years ago, we began with a commitment to fight for those who couldn't fight for themselves.
                </p>
                <p>
                  Today, that mission remains unchanged. We empower accident victims to recover physically, financially, and emotionally. We don't just handle paperwork, we become your advocates, your strategists, and your partners in securing the maximum compensation you deserve.
                </p>
              </div>
            </div>

            {/* Supporting Values */}
            <div className="mission-values-flow">
              <div className="mission-value-story">
                <div className="mission-value-icon">
                  <ShieldCheck size={32} strokeWidth={1.5} />
                </div>
                <h3>Integrity First</h3>
                <p>
                  We believe in honest communication, transparent processes, and ethical practices. Every promise we make is a promise we keep because trust isn't earned overnight, it's built through consistent action.
                </p>
              </div>

              <div className="mission-value-story">
                <div className="mission-value-icon">
                  <Handshake size={32} strokeWidth={1.5} />
                </div>
                <h3>Your Success is Our Success</h3>
                <p>
                  We work on a contingency basis because we're committed to your recovery. No win, no fee means our success is directly tied to yours. We only succeed when you do.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="about-story-section">
        <div className="container">
          <div className="about-story-content">
            <div className="about-story-text">
              <div className="about-section-badge">25+ Years of Excellence</div>
              <h2 className="about-section-title">Built on Trust & Results</h2>
              <div className="about-story-description">
                <p>
                  Founded on the principle that every accident victim deserves exceptional legal representation, our firm has grown from a small practice into a trusted name in personal injury law. We've built our reputation one successful case at a time, always prioritizing our clients' needs above all else.
                </p>
                <p>
                  Our journey began with a simple belief: that insurance companies and negligent parties should be held accountable. Over the years, we've recovered over $67 million for our clients, proving that dedication, expertise, and unwavering commitment to justice yield real results.
                </p>
                <p>
                  What sets us apart isn't just our track record—it's our approach. We treat every client like family, providing personalized attention, clear communication, and aggressive advocacy when it matters most. From the initial consultation through settlement or trial, we're with you every step of the way.
                </p>
              </div>
            </div>
            <div className="about-story-stats">
              <div className="about-stat-item">
                <SlotNumber value="$67M+" duration={2500} />
                <div className="about-stat-label">Recovered for Clients</div>
              </div>
              <div className="about-stat-item">
                <SlotNumber value="5,000+" duration={2200} />
                <div className="about-stat-label">Cases Won</div>
              </div>
              <div className="about-stat-item">
                <SlotNumber value="95%" duration={1800} />
                <div className="about-stat-label">Success Rate</div>
              </div>
              <div className="about-stat-item">
                <SlotNumber value="25+" duration={2000} />
                <div className="about-stat-label">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="about-team-section">
        <div className="container">
          <div className="about-team-header">
            <div className="about-section-badge">Our Leadership</div>
            <h2 className="about-section-title">Experienced Attorneys You Can Trust</h2>
            <p className="about-section-subtitle">
              Our team combines decades of legal expertise with genuine compassion for our clients' situations.
            </p>
          </div>

          <div className="about-team-grid">
            <div className="about-team-member">
              <div className="team-member-image">
                <div className="team-member-placeholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </div>
              <div className="team-member-info">
                <h3>Christopher Burk</h3>
                <div className="team-member-role">Senior Partner</div>
                <p>
                  With over 20 years of experience in personal injury law, Christopher has dedicated his career to fighting for accident victims. Known for his strategic approach and compassionate client relations, he's secured millions in settlements and verdicts.
                </p>
                <div className="team-member-credentials">
                  <span>J.D., Cum Laude</span>
                  <span>•</span>
                  <span>State Bar Certified</span>
                </div>
              </div>
            </div>

            <div className="about-team-member">
              <div className="team-member-image">
                <div className="team-member-placeholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </div>
              <div className="team-member-info">
                <h3>Sarah Martinez</h3>
                <div className="team-member-role">Senior Associate</div>
                <p>
                  Sarah brings exceptional negotiation skills and trial experience to our team. Her attention to detail and client-focused approach have resulted in numerous successful outcomes for complex personal injury cases.
                </p>
                <div className="team-member-credentials">
                  <span>J.D.</span>
                  <span>•</span>
                  <span>Personal Injury Specialist</span>
                </div>
              </div>
            </div>

            <div className="about-team-member">
              <div className="team-member-image">
                <div className="team-member-placeholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </div>
              <div className="team-member-info">
                <h3>Michael Rodriguez</h3>
                <div className="team-member-role">Associate Attorney</div>
                <p>
                  Michael specializes in truck and commercial vehicle accidents. His expertise in dealing with complex liability issues and insurance companies has been instrumental in securing substantial settlements for our clients.
                </p>
                <div className="team-member-credentials">
                  <span>J.D.</span>
                  <span>•</span>
                  <span>Motor Vehicle Accident Expert</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="about-why-section">
        <div className="container">
          <div className="about-why-header">
            <div className="about-section-badge">Why Choose Us</div>
            <h2 className="about-section-title">Excellence in Every Case</h2>
            <p className="about-section-subtitle">
              Our approach combines legal expertise with genuine care for our clients' wellbeing and recovery.
            </p>
          </div>

          <div className="about-why-grid">
            <div className="about-why-item">
              <div className="about-why-icon">
                <Trophy size={36} strokeWidth={1.5} />
              </div>
              <h3>Proven Track Record</h3>
              <p>
                Over $67 million recovered for clients and a 95% success rate speak to our commitment to achieving maximum compensation.
              </p>
            </div>

            <div className="about-why-item">
              <div className="about-why-icon">
                <UserCheck size={36} strokeWidth={1.5} />
              </div>
              <h3>Personalized Attention</h3>
              <p>
                Every case receives individual attention from our experienced attorneys. We're accessible, responsive, and always available to answer your questions.
              </p>
            </div>

            <div className="about-why-item">
              <div className="about-why-icon">
                <Handshake size={36} strokeWidth={1.5} />
              </div>
              <h3>No Win, No Fee</h3>
              <p>
                We work on a contingency basis—you pay nothing unless we win your case. Our success is directly tied to yours.
              </p>
            </div>

            <div className="about-why-item">
              <div className="about-why-icon">
                <Shield size={36} strokeWidth={1.5} />
              </div>
              <h3>Aggressive Advocacy</h3>
              <p>
                We don't back down from insurance companies or opposing counsel. We fight aggressively to protect your rights and secure the compensation you deserve.
              </p>
            </div>

            <div className="about-why-item">
              <div className="about-why-icon">
                <Clock size={36} strokeWidth={1.5} />
              </div>
              <h3>24/7 Availability</h3>
              <p>
                Accidents don't happen on schedule. Our team is available around the clock to address your urgent legal needs and concerns.
              </p>
            </div>

            <div className="about-why-item">
              <div className="about-why-icon">
                <Award size={36} strokeWidth={1.5} />
              </div>
              <h3>Award-Winning Service</h3>
              <p>
                Recognized by industry leaders and trusted by thousands of clients, our firm has earned numerous awards and accolades for excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="about-testimonials-section">
        <div className="container">
          <div className="about-testimonials-header">
            <div className="about-section-badge">Client Stories</div>
            <h2 className="about-section-title">What Our Clients Say</h2>
            <p className="about-section-subtitle">
              Don't just take our word for it—hear from clients who've experienced our commitment to excellence firsthand.
            </p>
          </div>

          <div className="trust-testimonial-slider">
            <Slider {...testimonialSettings}>
              <div className="trust-testimonial">
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                    </svg>
                  ))}
                </div>
                <blockquote className="testimonial-quote">
                  "I can't express how grateful I am for the outstanding service provided by Chris Burk and his team. They truly went above and beyond, making the entire process as easy as possible for me. From handling all the necessary paperwork to taking care of the details, they did the dirty work, allowing me to focus on my recovery."
                </blockquote>
                <div className="testimonial-author">
                  <strong>L.T.</strong>
                </div>
              </div>

              <div className="trust-testimonial">
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                    </svg>
                  ))}
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
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                    </svg>
                  ))}
                </div>
                <blockquote className="testimonial-quote">
                  "After my accident, I was overwhelmed and didn't know where to turn. This team fought tirelessly for me and recovered over $380,000. They truly care about their clients and getting justice."
                </blockquote>
                <div className="testimonial-author">
                  <strong>Jennifer M.</strong> <span>Car Accident Victim</span>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <div className="cta-badge">Ready to Get Started?</div>
            <h2 className="cta-heading">Let's Discuss Your Case</h2>
            <p className="cta-description">
              Contact our experienced team for a free, confidential consultation. We're here to help you understand your rights and explore your options.
            </p>
            
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
              <Link to="/" className="btn-cta-secondary">Get Started Online</Link>
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
    </div>
  )
}

export default AboutUs

