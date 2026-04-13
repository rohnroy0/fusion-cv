'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function LandingPage() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="landing-container">
      {/* Navigation */}
      <nav className="fade-in landing-nav">
        <div className="nav-logo">
          <i className="ri-dashboard-fill" style={{ marginRight: '8px' }}></i> Fusion CV
        </div>
        <div className="nav-links">
          {session ? (
            <Link href="/dashboard" className="nav-btn">
              Go to Dashboard <i className="ri-dashboard-line"></i>
            </Link>
          ) : (
            <Link href="/login" className="nav-btn">
              Sign In <i className="ri-arrow-right-line"></i>
            </Link>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="hero fade-in landing-main">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">Fusion CV</span> Where Your <br className="desktop-br"/>
            Career Meets <span className="gradient-text">AI Precision.</span>
          </h1>
          <p className="hero-subtitle">
            Craft a professional, ATS-optimized resume in minutes with Fusion CV. 
            Smart suggestions, premium templates, and instant results.
          </p>

          <div className="trust-badges">
            <div className="badge-item">
               <i className="ri-checkbox-circle-fill"></i> 10,000+ resumes created
            </div>
            <div className="badge-item">
               <i className="ri-checkbox-circle-fill"></i> ATS-friendly templates
            </div>
            <div className="badge-item">
               <i className="ri-checkbox-circle-fill"></i> Used by students & professionals
            </div>
          </div>
          
          <div className="cta-container">
            <Link href={session ? "/dashboard" : "/login"} style={{ textDecoration: 'none' }}>
               <button className="auth-btn landing-cta">
                 {session ? "Enter Dashboard" : "Get Started Now"} 
                 <i className={session ? "ri-arrow-right-line" : "ri-rocket-line"} style={{ marginLeft: '12px' }}></i>
               </button>
            </Link>
          </div>

          {/* Mini Features (Moved inside for better flow) */}
          <div className="features-mini">
            <div className="mini-item">
              <i className="ri-cpu-line"></i> AI Suggestions
            </div>
            <div className="mini-item">
              <i className="ri-shield-check-line"></i> ATS Scanned
            </div>
            <div className="mini-item">
              <i className="ri-layout-grid-line"></i> Premium Templates
            </div>
          </div>
        </div>
      </main>

      {/* Simplified Footer */}
      <footer className="landing-footer">
        <p>&copy; 2026 Fusion CV • AI-Powered Resume Builder • Privacy & Terms</p>
      </footer>

      <style jsx>{`
        .landing-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .landing-nav {
          position: fixed;
          top: 30px;
          width: 90%;
          max-width: 1200px;
          z-index: 1000;
        }

        .landing-main {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 80px 40px;
          min-height: 100vh;
          width: 100%;
        }

        .hero-content {
          text-align: center;
          max-width: 900px;
          margin-top: 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .cta-container {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .hero-title {
          font-size: clamp(48px, 10vh, 84px);
          margin-bottom: 24px;
          line-height: 1.1;
          letter-spacing: -3px;
          font-weight: 900;
          text-align: center;
        }

        .hero-subtitle {
          font-size: clamp(16px, 2.2vh, 21px);
          margin-bottom: 40px;
          margin-inline: auto;
          max-width: 750px;
          color: #a1a1aa;
          line-height: 1.6;
          text-align: center;
        }

        .trust-badges {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 40px;
          margin-bottom: 50px;
          color: #a1a1aa;
          font-size: 16px;
        }

        .badge-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .badge-item i {
          color: #10b981;
          font-size: 20px;
        }

        .landing-cta {
          width: auto;
          padding: 22px 64px;
          font-size: 22px;
          box-shadow: 0 0 50px rgba(124, 92, 255, 0.3);
        }

        .features-mini {
          display: flex;
          gap: 60px;
          margin-top: 30px;
          opacity: 0.6;
        }

        .mini-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #a1a1aa;
          font-weight: 500;
          font-size: 14px;
        }

        .mini-item i {
          color: #7c5cff;
          font-size: 22px;
        }

        .landing-footer {
          width: 100%;
          text-align: center;
          color: #52525b;
          font-size: 13px;
          padding: 60px 20px;
          background: rgba(255, 255, 255, 0.02);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        @media (max-width: 1024px) {
           .hero-title { letter-spacing: -1px; }
           .features-mini { gap: 40px; }
        }

        @media (max-width: 768px) {
          .landing-container {
            min-height: 100vh;
            min-height: 100svh;
            height: auto;
            overflow-y: auto;
            overflow-x: hidden;
            padding: 40px 20px !important;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
          }

          @media (max-height: 700px) {
            .landing-container {
              padding: 20px 20px !important;
              justify-content: flex-start;
            }
            .landing-nav {
              margin-bottom: 20px !important;
            }
            .landing-main {
              margin-bottom: 20px !important;
              gap: 20px !important;
            }
          }

          .landing-nav {
            flex-shrink: 0;
            width: 100%;
            display: flex;
            justify-content: center;
          }

          .landing-main {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 100%;
            gap: 4vh; /* Elastic gap for tall screens */
            padding: 2vh 0;
          }

          .hero-title {
            font-size: clamp(34px, 8vh, 44px);
            line-height: 1.1;
            margin-bottom: 2vh;
          }

          .hero-subtitle {
            font-size: clamp(14px, 2.5vh, 17px);
            margin-bottom: 3vh;
            max-width: 100%;
          }

          .trust-badges {
            flex-direction: column;
            gap: 1.5vh;
            margin-bottom: 4vh;
          }

          .features-mini {
            flex-direction: column;
            gap: 1.5vh;
            margin-top: 2vh;
          }

          .landing-cta {
            padding: 2.5vh 40px;
            font-size: 20px;
            width: 100%;
            max-width: 320px;
          }

          .landing-footer {
            flex-shrink: 0;
            padding: 40px 20px;
            width: 100%;
            background: rgba(255, 255, 255, 0.02);
            border-top: 1px solid rgba(255, 255, 255, 0.05);
          }
        }
      `}</style>
    </div>
  );
}
