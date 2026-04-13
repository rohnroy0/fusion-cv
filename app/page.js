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
      {/* Main Content */}
      <main className="hero fade-in landing-main">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">Fusion CV</span> Where Your <br className="desktop-br"/>
            Career Meets <span className="gradient-text">AI Precision.</span>
          </h1>
          <p className="hero-subtitle">
            Craft a professional, ATS-optimized resume & AI-powered cover letter in minutes. 
            Smart suggestions, premium templates, and instant career-ready results.
          </p>

          <div className="trust-badges">
            <div className="badge-item">
               <i className="ri-checkbox-circle-fill"></i> 10,000+ resumes created
            </div>
            <div className="badge-item">
               <i className="ri-checkbox-circle-fill"></i> ATS-friendly templates
            </div>
            <div className="badge-item">
               <i className="ri-checkbox-circle-fill"></i> AI-powered Cover Letters
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
              <i className="ri-file-list-3-line"></i> AI Cover Letters
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
        .landing-main {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 40px 40px;
          min-height: 100vh;
          width: 100%;
        }

        .hero-content {
          text-align: center;
          max-width: 1000px;
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
          font-size: clamp(56px, 12vh, 100px);
          margin-bottom: 30px;
          line-height: 1.1;
          letter-spacing: -4px;
          font-weight: 950;
          text-align: center;
        }

        .hero-subtitle {
          font-size: clamp(18px, 2.5vh, 23px);
          margin-bottom: 50px;
          margin-inline: auto;
          max-width: 850px;
          color: #d1d1d6;
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
            background: radial-gradient(circle at top right, rgba(124, 92, 255, 0.05), transparent),
                        radial-gradient(circle at bottom left, rgba(167, 139, 250, 0.05), transparent);
            padding: 40px 20px !important;
            display: flex;
            flex-direction: column;
            gap: 40px;
          }

          .landing-main {
            padding: 0;
            min-height: auto;
            display: flex;
            flex-direction: column;
            gap: 30px;
          }

          .hero-title {
            font-size: 42px;
            font-weight: 900;
            line-height: 1.1;
            letter-spacing: -2px;
            text-align: center;
          }

          .hero-subtitle {
            font-size: 16px;
            color: #a1a1aa;
            line-height: 1.6;
            margin-bottom: 0;
            text-align: center;
            max-width: 100%;
          }

          .trust-badges {
            display: grid;
            grid-template-columns: 1fr;
            gap: 12px;
            padding: 24px;
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(10px);
            border-radius: 24px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            margin: 10px 0;
            width: 100%;
          }

          .badge-item {
            font-size: 14px;
            color: #f4f4f5;
            font-weight: 500;
            justify-content: center;
          }

          .badge-item i {
            color: #10b981 !important;
            font-size: 18px;
          }

          .cta-container {
             width: 100%;
             margin-top: 10px;
          }

          .landing-cta {
            width: 100%;
            border-radius: 20px;
            padding: 22px;
            font-size: 18px;
            font-weight: 800;
            letter-spacing: 0.5px;
            background: linear-gradient(135deg, #7c5cff 0%, #a78bfa 100%);
            box-shadow: 0 15px 35px rgba(124, 92, 255, 0.4);
            animation: pulse-mobile 3s infinite;
          }

          @keyframes pulse-mobile {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
          }

          .features-mini {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-top: 20px;
            width: 100%;
          }

          .mini-item {
            background: rgba(255, 255, 255, 0.02);
            padding: 16px;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.05);
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 12px;
            font-size: 12px;
            color: #a1a1aa;
            font-weight: 600;
          }

          .mini-item i {
            font-size: 24px;
            color: #7c5cff !important;
          }

          .landing-footer {
            margin-top: auto;
            padding: 40px 0 20px;
            background: none;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            font-size: 11px;
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
