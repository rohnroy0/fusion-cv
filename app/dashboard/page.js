'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Resume from '@/components/Resume';

// Dummy data for miniature preview
const dummyData = {
  name: "LORNA ALVARADO",
  role: "Digital Marketing Specialist",
  phone: "+123-456-7890",
  email: "hello@reallygreatsite.com",
  address: "123 Anywhere St",
  image: "https://i.pravatar.cc/150?img=47",
  about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet...",
  skills: ["Web Design", "Branding", "SEO"],
  rewards: ["Oct 2019 | Best Employee"],
  languages: ["English"],
  experience: [{ title: "Manager", company: "Larana Inc", years: "2019-2022", desc: "Lorem dolor sit amet." }],
  education: [{ degree: "Master", college: "Fauget", years: "2011-2014", desc: "Lorem ipsum consectetur." }]
};

export default function Dashboard() {
  const [session, setSession] = useState(null);
  const [atsScore, setAtsScore] = useState(0);
  const [needleRotation, setNeedleRotation] = useState(-90);
  const [activeStep, setActiveStep] = useState(1);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  const allTemplates = [
    { name: 'Classic Split', tag: 'Professional', icon: 'ri-profile-line', route: '/preview' },
    { name: 'Executive Minimal', tag: 'Modern', icon: 'ri-layout-top-line' },
    { name: 'Creative Portfolio', tag: 'Creative', icon: 'ri-artboard-line' },
    { name: 'Professional Corporate', tag: 'Classic', icon: 'ri-briefcase-line' },
    { name: 'Clean Minimalist', tag: 'Clean', icon: 'ri-checkbox-blank-line' },
    { name: 'Chic Dynamic', tag: 'Dynamic', icon: 'ri-flashlight-line' },
    { name: 'Sleek Modern', tag: 'High-Tech', icon: 'ri-cpu-line' },
    { name: 'Impactful Slate', tag: 'Modern', icon: 'ri-dashboard-line' },
    { name: 'Minimalist Grid', tag: 'Classic', icon: 'ri-grid-line' },
    { name: 'Design Slate', tag: 'Creative', icon: 'ri-pencil-ruler-line' },
    { name: 'Vibrant Pulse', tag: 'Dynamic', icon: 'ri-pulse-line' },
    { name: 'Corporate Grid', tag: 'Classic', icon: 'ri-building-line' }
  ];

  const workflowSteps = [
    { id: 1, icon: 'ri-edit-box-line', title: 'Input Details', short: 'Fill out a guided step-by-step form or upload resume.', long: 'Fill out a guided step-by-step form or upload resume.' },
    { id: 2, icon: 'ri-magic-line', title: 'AI Optimize', short: 'AI engine transforms input into keyword-rich content.', long: 'Our powerful AI engine analyzes your input and transforms it into professionally written, keyword-rich content optimized for ATS.' },
    { id: 3, icon: 'ri-file-download-line', title: 'Get PDF', short: 'Download print-ready, ATS-friendly PDFs instantly.', long: 'Once satisfied, download your resume as a clean, print-ready PDF instantly. Your career upgrade is just one click away!' }
  ];

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.replace('/');
      setSession(session);
    });

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // ATS Meter Animation
    let forward = true;
    let val = 0;
    const interval = setInterval(() => {
      if (forward) {
        val += 0.8;
        if (val >= 85) forward = false;
      } else {
        val -= 0.3;
        if (val <= 70) forward = true;
      }
      setAtsScore(Math.floor(val));
      setNeedleRotation((val * 1.8) - 90);
    }, 40);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [router]);

  const itemsPerPage = isMobile ? 1 : 3;
  const templates = isMobile ? allTemplates.slice(0, 4) : allTemplates;
  const totalPages = Math.ceil(templates.length / itemsPerPage);

  const slideTemplates = (direction) => {
    if (direction === 'next') {
      setCarouselIndex(prev => (prev + 1) % totalPages);
    } else {
      setCarouselIndex(prev => (prev - 1 + totalPages) % totalPages);
    }
  };

  if (!session) return null;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="hero" id="hero">
          <h1>
            Craft Your Career with <br />
            <span className="gradient-text">Fusion CV</span>
          </h1>

          <div className="workflow">
            <div className="workflow-icons-mobile">
               {workflowSteps.map((step) => (
                 <div 
                   key={step.id} 
                   className={`workflow-icon-circle ${activeStep === step.id ? 'active' : ''}`}
                   onClick={() => setActiveStep(step.id)}
                 >
                   <i className={step.icon}></i>
                 </div>
               ))}
            </div>

            <div className="workflow-content-card">
               <h3>{workflowSteps.find(s => s.id === activeStep)?.title}</h3>
               <p>{workflowSteps.find(s => s.id === activeStep)?.long}</p>
            </div>

            {/* Desktop View remains the same through CSS hiding */}
            <div className="workflow-desktop-track">
              {workflowSteps.map((step, index) => (
                <div key={step.id} style={{ display: 'contents' }}>
                  <div 
                    className={`flow-step ${activeStep === step.id ? 'active' : ''}`}
                    onClick={() => setActiveStep(step.id)}
                  >
                    <i className={step.icon} style={{ fontSize: '30px', marginBottom: '20px' }}></i>
                    <h3>{step.title}</h3>
                    <p style={{ color: '#a1a1aa', fontSize: '12px', marginTop: '10px', lineHeight: '1.5' }}>{step.long}</p>
                  </div>
                  {index < 2 && <div className="flow-line"></div>}
                </div>
              ))}
            </div>
          </div>

          <p className="hero-subtitle" style={{ marginTop: '40px', maxWidth: '600px', fontSize: '15px' }}>
            Our platform is an intelligent AI-powered resume builder designed to help job
            seekers create professional, ATS-optimized resumes with ease.
          </p>
        </section>

        {/* ATS Checker Section */}
        <section className="section" id="ats">
          <div className="feature-card">
            <div className="mobile-header">
              <div className="feature-tag ats">VALIDATE EXCELLENCE</div>
              <h2 className="feature-title">ATS Resume Checker</h2>
            </div>
            <div className="feature-content">
              <div className="feature-tag ats desktop-only">VALIDATE EXCELLENCE</div>
              <h2 className="feature-title desktop-only">ATS Resume Checker</h2>
              <p style={{ color: '#d1d5db', lineHeight: 1.6, marginBottom: '25px', fontSize: '15px' }}>
                Upload an existing resume to receive an instant ATS score along with actionable suggestions for improvement. 
                Our system ensures your resume aligns with modern industry standards and hiring systems.
              </p>
              <button className="btn feature-btn">
                Analyze Resume <i className="ri-shield-check-line"></i>
              </button>
            </div>
            <div className="feature-image">
              <div className="ats-visual">
                <div className="meter-mark mark-0"><span>0</span></div>
                <div className="meter-mark mark-20"><span>20</span></div>
                <div className="meter-mark mark-40"><span>40</span></div>
                <div className="meter-mark mark-60"><span>60</span></div>
                <div className="meter-mark mark-80"><span>80</span></div>
                <div className="meter-mark mark-100"><span>100</span></div>
                <div className="meter-needle" style={{ transform: `rotate(${needleRotation}deg)` }}></div>
                <div className="meter-center"></div>
                <div className="meter-value">{atsScore}%</div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Builder Section */}
        <section className="section" id="builder">
          <div className="feature-card" style={{ flexDirection: 'row-reverse' }}>
            <div className="mobile-header">
              <div className="feature-tag ai">CREATIVE PRECISION</div>
              <h2 className="feature-title">AI Resume Builder</h2>
            </div>
            <div className="feature-content">
              <div className="feature-tag ai desktop-only">CREATIVE PRECISION</div>
              <h2 className="feature-title desktop-only">AI Resume Builder</h2>
              <p style={{ color: '#d1d5db', lineHeight: 1.6, marginBottom: '25px', fontSize: '15px' }}>
                Transform raw user input into well-structured, keyword-rich, and professionally written content. 
                Additionally, users have full control to edit and refine the generated content, ensuring personalization and accuracy.
              </p>
              <button className="btn feature-btn" style={{ background: 'linear-gradient(135deg, #c084fc, #8b5cf6)' }}>
                Create Your CV <i className="ri-magic-line"></i>
              </button>
            </div>
            <div className="feature-image">
              <div className="ai-visual">
                <i className="ri-magic-line"></i>
                <span className="sparkle" style={{ '--x': '-40px', '--y': '-40px', animationDelay: '0s' }}></span>
                <span className="sparkle" style={{ '--x': '40px', '--y': '-30px', animationDelay: '0.5s' }}></span>
                <span className="sparkle" style={{ '--x': '-30px', '--y': '40px', animationDelay: '1s' }}></span>
                <span className="sparkle" style={{ '--x': '40px', '--y': '35px', animationDelay: '1.5s' }}></span>
              </div>
            </div>
          </div>
        </section>

        {/* Templates Section */}
        <section className="section" id="templates">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 700 }}>Choose Your Template</h2>
            <p style={{ color: '#d1d5db', marginTop: '10px' }}>Select a professional layout to start building your AI-enhanced resume.</p>
          </div>

          <div className="templates-paginated-container">
            <div className="templates-grid">
              {templates.slice(carouselIndex * itemsPerPage, (carouselIndex + 1) * itemsPerPage).map((t, i) => (
                <div key={i} className="template-card">
                  <div className="template-preview" style={{ overflow: 'hidden', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                    {t.route === '/preview' ? (
                      <div style={{ transform: 'scale(0.38)', transformOrigin: 'top center', width: '1000px', pointerEvents: 'none', marginTop: '-15px' }}>
                        <Resume data={dummyData} />
                      </div>
                    ) : (
                      <i className={t.icon} style={{ opacity: 0.1, fontSize: '80px' }}></i>
                    )}
                    <div className="template-overlay">
                      <div className="overlay-btn-group">
                        <button 
                          className="overlay-btn overlay-btn-preview"
                          onClick={(e) => { e.stopPropagation(); router.push('/preview'); }}
                        >
                          <i className="ri-eye-line"></i> Preview Design
                        </button>
                        <button 
                          className="overlay-btn overlay-btn-use"
                          onClick={(e) => { e.stopPropagation(); router.push('/builder'); }}
                        >
                          <i className="ri-magic-line"></i> Use Template
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="template-info">
                    <span className="template-tag">{t.tag}</span>
                    <h4>{t.name}</h4>
                  </div>
                </div>
              ))}
            </div>

            <div className="pagination-controls">
              <button className="pagination-arrow" onClick={() => slideTemplates('prev')}>
                <i className="ri-arrow-left-s-line"></i>
              </button>
              
              <div className="pagination-dots">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <div key={i} className={`pagination-dot ${carouselIndex === i ? 'active' : ''}`} onClick={() => setCarouselIndex(i)}></div>
                ))}
              </div>

              <button className="pagination-arrow" onClick={() => slideTemplates('next')}>
                <i className="ri-arrow-right-s-line"></i>
              </button>
            </div>
          </div>
        </section>

        <section className="section" id="mission">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div className="feature-tag" style={{ margin: '0 auto 10px' }}>OUR PHILOSOPHY</div>
            <h2 style={{ fontSize: '42px', fontWeight: 800 }}>The Fusion Mission</h2>
            <p style={{ color: '#a1a1aa', marginTop: '10px', maxWidth: '600px', margin: '10px auto' }}>
              Empowering global talent by bridging the gap between professional potential and technical evaluation.
            </p>
          </div>

          <div className="mission-grid">
            <div className="mission-pillar">
              <div className="pillar-icon"><i className="ri-shield-flash-line"></i></div>
              <h3>Unified Solution</h3>
              <p>
                We solve the filtration problem by integrating our <span className="highlight-text">AI Resume Builder</span> and <span className="highlight-text">ATS Resume Checker</span> into a single, high-performance ecosystem.
              </p>
            </div>
            <div className="mission-pillar">
              <div className="pillar-icon"><i className="ri-layout-6-line"></i></div>
              <h3>Design Excellence</h3>
              <p>
                Access a library of <span className="highlight-text">ATS-Friendly Templates</span> that allow for deep visual customization without ever compromising on data accessibility or content quality.
              </p>
            </div>
            <div className="mission-pillar">
              <div className="pillar-icon"><i className="ri-rocket-line"></i></div>
              <h3>Modern Reliability</h3>
              <p>
                Built with a <span className="highlight-text">State-of-the-Art Tech Stack</span>, Fusion CV ensures an ultra-fast, responsive, and secure experience for students and professionals alike.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section" id="contact" style={{ textAlign: 'center' }}>
          <div className="section-header" style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 700 }}>Get In Touch</h2>
            <p style={{ color: '#a1a1aa', marginTop: '10px' }}>Have questions? We're here to help you advance your career.</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '50px 30px', borderRadius: '30px', width: '300px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <i className="ri-mail-send-line" style={{ fontSize: '40px', color: '#818cf8', marginBottom: '20px', display: 'block' }}></i>
              <h4 style={{ fontSize: '20px', marginBottom: '10px' }}>Email Us</h4>
              <p style={{ fontSize: '14px', color: '#71717a' }}>support@fusioncv.com</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '50px 30px', borderRadius: '30px', width: '300px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <i className="ri-message-3-line" style={{ fontSize: '40px', color: '#c084fc', marginBottom: '20px', display: 'block' }}></i>
              <h4 style={{ fontSize: '20px', marginBottom: '10px' }}>Live Chat</h4>
              <p style={{ fontSize: '14px', color: '#71717a' }}>Available 24/7</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ padding: '60px 20px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', color: '#71717a', fontSize: '14px' }}>
          <p>&copy; 2026 Fusion CV. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}
