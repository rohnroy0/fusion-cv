'use client';
import Resume from '@/components/Resume';
import Navbar from '@/components/Navbar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ResultPage() {
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    const saved = sessionStorage.getItem('fusion_cv_ai_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.image) parsed.image = "https://i.pravatar.cc/150?img=11";
        setData(parsed);
      } catch (e) {
        console.error("Invalid session data");
        router.push('/dashboard');
      }
    } else {
      router.push('/dashboard');
    }
  }, [router]);

  if (!data) return <div style={{ background: '#121212', height: '100vh' }}></div>;

  const handleDownload = () => window.print();

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { background: white !important; -webkit-print-color-adjust: exact; margin: 0; }
          .no-print { display: none !important; }
          .print-area { padding: 0 !important; max-width: 100% !important; margin: 0 !important; }
          main { background: white !important; padding: 0 !important; min-height: 0 !important; }
        }
      `}} />
      <div className="no-print">
        <Navbar />
      </div>
      
      <main className="print-area" style={{ padding: '100px 20px 40px', minHeight: '100vh', background: '#121212' }}>
        <div className="no-print" style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'white' }}>Your AI Resume is Ready!</h2>
          <p style={{ color: '#a1a1aa', marginBottom: '20px' }}>Review the generated content. If everything looks good, download it as a PDF.</p>
          <button 
            onClick={handleDownload}
            style={{ padding: '12px 30px', borderRadius: '100px', fontSize: '15px', fontWeight: 600, background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', cursor: 'pointer', boxShadow: '0 10px 20px rgba(16, 185, 129, 0.3)' }}
          >
            <i className="ri-download-2-line" style={{ marginRight: '8px' }}></i> Download as PDF
          </button>
        </div>
        
        <div style={{ background: 'white' }}>
          <Resume data={data} />
        </div>
      </main>
    </>
  );
}
