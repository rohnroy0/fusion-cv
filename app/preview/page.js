'use client';
import Resume from '@/components/Resume';
import Navbar from '@/components/Navbar';
import { useState, useEffect } from 'react';

export default function PreviewPage() {
  const defaultData = {
    name: "LORNA ALVARADO",
    role: "Digital Marketing Specialist",
    phone: "+123-456-7890",
    email: "hello@reallygreatsite.com",
    address: "123 Anywhere St, Any City",
    image: "https://i.pravatar.cc/150?img=47",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet. Donec hendrerit libero eget est tempor...",
    skills: ["Web Design", "Branding", "Graphic Design", "SEO"],
    rewards: ["Oct 2019 | Liceria & Co. Employee of the Year"],
    languages: ["English", "French"],
    experience: [{ title: "Digital Marketing Manager", company: "Shodwe Cosmetics", years: "2017 - 2019", desc: "Managed all social accounts." }],
    education: [{ degree: "Master of Marketing", college: "Fauget University", years: "2011 - 2014", desc: "Graduated with honors." }]
  };

  const [data, setData] = useState(null);

  useEffect(() => {
    const saved = sessionStorage.getItem('fusion_cv_ai_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // AI doesn't always generate an image URL, provide a fallback.
        if (!parsed.image) parsed.image = "https://i.pravatar.cc/150?img=11";
        setData(parsed);
      } catch (e) {
        setData(defaultData);
      }
    } else {
      setData(defaultData);
    }
  }, []);

  if (!data) return <div style={{ background: '#121212', height: '100vh' }}></div>;

  return (
    <>
      <Navbar />
      
      <main style={{ padding: '100px 20px 40px', minHeight: '100vh', background: '#121212' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'white' }}>Template Preview</h2>
          <p style={{ color: '#a1a1aa', marginBottom: '20px' }}>This is how the template handles dynamic data structure.</p>
        </div>
        
        <div style={{ background: 'white' }}>
          <Resume data={data} />
        </div>
      </main>
    </>
  );
}
