'use client';
import { useEffect, useState } from 'react';

export default function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setHidden(true), 800);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <div className={`loader-wrapper ${hidden ? 'hidden' : ''}`} id="loader">
      <div className="loader-content" style={{ textAlign: 'center' }}>
        <div className="loader-logo" style={{ marginBottom: '40px' }}>
          <i className="ri-pages-line"></i> Fusion CV
        </div>
        <div className="loader-spinner-container" style={{ position: 'relative', width: '60px', height: '60px', margin: '0 auto 20px' }}>
          <div className="loader-spinner"></div>
          <div className="loader-spinner-inner" style={{ 
            position: 'absolute', 
            inset: '10px', 
            border: '3px solid rgba(192, 132, 252, 0.05)', 
            borderBottom: '3px solid #c084fc', 
            borderRadius: '50%',
            animation: 'spin 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite reverse'
          }}></div>
        </div>
        <div className="loader-text">Initializing Portal</div>
      </div>
    </div>
  );
}
