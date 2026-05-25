import { useEffect, useRef, useState } from 'react';
import { translations } from './translations';

function App() {
  const carouselRef = useRef(null);
  const teamRef = useRef(null);
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('de');
  const t = translations[language];

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('site-theme');
    const defaultTheme = storedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(defaultTheme);

    const storedLanguage = window.localStorage.getItem('site-language') || 'de';
    setLanguage(storedLanguage);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('light-mode', theme === 'light');
    document.documentElement.classList.toggle('dark-mode', theme === 'dark');
    window.localStorage.setItem('site-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem('site-language', language);
  }, [language]);

  const portfolioImages = [
    { src: 'https://picsum.photos/seed/infokus1/1200/800', label: 'Studio Campaign' },
    { src: 'https://picsum.photos/seed/infokus2/1200/800', label: 'Brand Video' },
    { src: 'https://picsum.photos/seed/infokus3/1200/800', label: 'Social Series' },
    { src: 'https://picsum.photos/seed/infokus4/1200/800', label: 'Event Coverage' },
    { src: 'https://picsum.photos/seed/infokus5/1200/800', label: 'Photography' },
    { src: 'https://picsum.photos/seed/infokus6/1200/800', label: 'Digital Story' },
  ];

  const teamMembers = [
    {
      src: 'https://picsum.photos/seed/team1/600/450',
      name: 'Anna Mayer',
      role: language === 'de' ? t.creativeDirector : t.creativeDirector,
      highlights: language === 'de' ? ['Konzeptentwicklung', 'Visuelle Storytelling', 'Kundenworkshops'] : ['Concept Development', 'Visual Storytelling', 'Client Workshops'],
    },
    {
      src: 'https://picsum.photos/seed/team2/600/450',
      name: 'Ben Fischer',
      role: language === 'de' ? t.leadProducer : t.leadProducer,
      highlights: language === 'de' ? ['Projektplanung', 'Drehleitung', 'Teamkoordination'] : ['Project Planning', 'Shoot Direction', 'Team Coordination'],
    },
    {
      src: 'https://picsum.photos/seed/team3/600/450',
      name: 'Clara Weiss',
      role: language === 'de' ? t.marketingStrategist : t.marketingStrategist,
      highlights: language === 'de' ? ['Markenpositionierung', 'Content-Strategie', 'Kampagnenanalyse'] : ['Brand Positioning', 'Content Strategy', 'Campaign Analytics'],
    },
    {
      src: 'https://picsum.photos/seed/team4/600/450',
      name: 'David Kahn',
      role: language === 'de' ? t.postProductionLead : t.postProductionLead,
      highlights: language === 'de' ? ['Videoschnitt', 'Farbkorrektur', 'Motion Design'] : ['Video Editing', 'Color Correction', 'Motion Design'],
    },
  ];

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;
    const width = carouselRef.current.offsetWidth;
    carouselRef.current.scrollBy({ left: direction * width, behavior: 'smooth' });
  };

  const scrollTeamCarousel = (direction) => {
    if (!teamRef.current) return;
    const width = teamRef.current.offsetWidth;
    teamRef.current.scrollBy({ left: direction * width, behavior: 'smooth' });
  };

  return (
    <div className="page-shell">
      <header className="hero">
        <div className="hero-content">
          <span className="eyebrow">{t.companyName}</span>
          <h1>{t.heroHeading}</h1>
          <p>
            {t.heroDescription}
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#services">{t.servicesBtn}</a>
            <a className="button button-secondary" href="#contact">{t.contactBtn}</a>
          </div>
          <div className="header-controls">
            <button
              type="button"
              className="language-toggle"
              onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
              aria-label="Toggle language"
              title={language === 'en' ? 'English' : 'Deutsch'}
            >
              {language === 'en' ? '🇬🇧' : '🇩🇪'}
            </button>
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section id="about" className="section card">
          <div>
            <h2>{t.aboutHeading}</h2>
            <p>
              {t.aboutDescription}
            </p>
          </div>
          <div className="stats-grid">
            <div className="stat">
              <strong>{t.strategyLabel}</strong>
              <p>{t.strategyDesc}</p>
            </div>
            <div className="stat">
              <strong>{t.fullServiceLabel}</strong>
              <p>{t.fullServiceDesc}</p>
            </div>
            <div className="stat">
              <strong>{t.resultsLabel}</strong>
              <p>{t.resultsDesc}</p>
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <h2>{t.servicesHeading}</h2>
          <div className="services-grid">
            <article className="service-card">
              <h3>{t.videoProduction}</h3>
              <p>
                {t.videoProductionDesc}
              </p>
            </article>
            <article className="service-card">
              <h3>{t.digitalMarketing}</h3>
              <p>
                {t.digitalMarketingDesc}
              </p>
            </article>
            <article className="service-card">
              <h3>{t.creativeStrategy}</h3>
              <p>
                {t.creativeStrategyDesc}
              </p>
            </article>
          </div>
        </section>

        <section id="portfolio" className="section card portfolio-section">
          <div className="portfolio-header">
            <div>
              <h2>{t.portfolioHeading}</h2>
              <p>{t.portfolioDesc}</p>
            </div>
            <div className="carousel-controls">
              <button type="button" className="carousel-button" onClick={() => scrollCarousel(-1)}>
                ←
              </button>
              <button type="button" className="carousel-button" onClick={() => scrollCarousel(1)}>
                →
              </button>
            </div>
          </div>
          <div className="carousel" ref={carouselRef}>
            {portfolioImages.map((item, index) => (
              <article key={index} className="carousel-slide">
                <img src={item.src} alt={item.label} className="carousel-image" />
                <div className="carousel-caption">{item.label}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="video" className="section card video-section">
          <div className="video-header">
            <div>
              <h2>{t.videoHeading}</h2>
              <p>{t.videoDesc}</p>
            </div>
          </div>
          <div className="video-frame">
            <video controls poster="https://picsum.photos/seed/infokus-video/1600/900">
              <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        <section id="team" className="section card team-section">
          <div className="portfolio-header">
            <div>
              <h2>{t.teamHeading}</h2>
              <p>
                {t.teamDescription}
              </p>
            </div>
            <div className="carousel-controls">
              <button type="button" className="carousel-button" onClick={() => scrollTeamCarousel(-1)}>
                ←
              </button>
              <button type="button" className="carousel-button" onClick={() => scrollTeamCarousel(1)}>
                →
              </button>
            </div>
          </div>
          <div className="team-carousel" ref={teamRef}>
            {teamMembers.map((member, index) => (
              <article key={index} className="team-card">
                <img src={member.src} alt={member.name} className="team-image" />
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <ul className="team-highlights">
                    {member.highlights.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section spotlight">
          <div>
            <h2>{t.whyChoose}</h2>
            <p>
              {t.whyChooseDesc1}
            </p>
            <p>
              {t.whyChooseDesc2}
            </p>
          </div>
        </section>

        <section id="contact" className="section card contact-section">
          <div>
            <h2>{t.readyToStart}</h2>
            <p>
              {t.readyToStartDesc}
            </p>
          </div>
          <div className="contact-card">
            <p><strong>{t.email}:</strong> <a href="mailto:info@infokus.productions">info@infokus.productions</a></p>
            <p><strong>{t.phone}:</strong> +1 (555) 123-4567</p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>{t.footerText}</p>
      </footer>
    </div>
  );
}

export default App;
