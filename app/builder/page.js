'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';

export default function BuilderPage() {
  const router = useRouter();
  
  // Collecting explicitly what the template needs
  const [formData, setFormData] = useState({
    name: 'John Doe',
    role: 'Software Engineer',
    phone: '555-0192',
    email: 'john@example.com',
    address: 'New York, NY',
    skills: 'React, Node.js, AI, Team Leadership',
    languages: 'English, Spanish',
    experience_title: 'Frontend Developer',
    experience_company: 'Tech Corp',
    experience_years: '2020 - Present',
    experience_desc: 'Worked on the main web app and improved performance.',
    education_degree: 'B.S. Computer Science',
    education_college: 'State University',
    education_years: '2016 - 2020',
  });
  
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Format the payload natively without AI
    const finalData = {
      name: formData.name,
      role: formData.role,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      about: `An experienced ${formData.role} driven by a passion for creating excellent work. ${formData.experience_desc}`,
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      languages: formData.languages.split(',').map(s => s.trim()).filter(Boolean),
      rewards: [],
      experience: [
        {
          title: formData.experience_title,
          company: formData.experience_company,
          years: formData.experience_years,
          desc: formData.experience_desc
        }
      ],
      education: [
        {
          degree: formData.education_degree,
          college: formData.education_college,
          years: formData.education_years,
          desc: "Completed relevant coursework."
        }
      ]
    };
    
    setTimeout(() => {
      sessionStorage.setItem('fusion_cv_ai_data', JSON.stringify(finalData));
      router.push('/result');
    }, 800); // Slight delay for UX
  };

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const inputStyle = { width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', color: 'white', outline: 'none', marginBottom: '15px' };
  const labelStyle = { display: 'block', marginBottom: '6px', color: '#e2e8f0', fontSize: '13px', fontWeight: 500 };

  return (
    <>
      <Navbar />
      <main style={{ padding: '120px 20px', minHeight: '100vh', background: '#121212', display: 'flex', justifyContent: 'center' }}>
        <div style={{ background: '#1e1e24', padding: '40px', borderRadius: '30px', maxWidth: '800px', width: '100%', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 700, color: 'white' }}>Provide Your Details</h2>
            <p style={{ color: '#a1a1aa', marginTop: '5px', fontSize: '14px' }}>We'll send this barebones data to the AI to generate a highly impressive, ATS-optimized version fit for the template.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Full Name</label>
                <input name="name" value={formData.name} onChange={handleChange} style={inputStyle} required />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Target Role</label>
                <input name="role" value={formData.role} onChange={handleChange} style={inputStyle} required />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Phone</label>
                <input name="phone" value={formData.phone} onChange={handleChange} style={inputStyle} required />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Email</label>
                <input name="email" value={formData.email} onChange={handleChange} style={inputStyle} required />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Address (City, State)</label>
                <input name="address" value={formData.address} onChange={handleChange} style={inputStyle} required />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Core Skills (Comma separated)</label>
                <input name="skills" value={formData.skills} onChange={handleChange} style={inputStyle} required />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Languages</label>
                <input name="languages" value={formData.languages} onChange={handleChange} style={inputStyle}  />
              </div>
            </div>

            <h4 style={{ color: '#818cf8', marginTop: '15px', marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>Recent Experience</h4>
            
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Job Title</label>
                <input name="experience_title" value={formData.experience_title} onChange={handleChange} style={inputStyle} required />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Company</label>
                <input name="experience_company" value={formData.experience_company} onChange={handleChange} style={inputStyle} required />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Years</label>
                <input name="experience_years" value={formData.experience_years} onChange={handleChange} style={inputStyle} required />
              </div>
            </div>
            
            <label style={labelStyle}>Briefly describe what you did (AI will expand this into an ATS format)</label>
            <textarea name="experience_desc" value={formData.experience_desc} onChange={handleChange} style={{...inputStyle, height: '80px', resize: 'none'}} required />

            <h4 style={{ color: '#818cf8', marginTop: '10px', marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>Education</h4>
            
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Degree</label>
                <input name="education_degree" value={formData.education_degree} onChange={handleChange} style={inputStyle} required />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>College/University</label>
                <input name="education_college" value={formData.education_college} onChange={handleChange} style={inputStyle} required />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Years</label>
                <input name="education_years" value={formData.education_years} onChange={handleChange} style={inputStyle} required />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isGenerating}
              style={{ padding: '16px', width: '100%', borderRadius: '12px', fontSize: '15px', fontWeight: 600, background: isGenerating ? '#4b5563' : 'linear-gradient(135deg, #7c5cff, #6d4aff)', color: 'white', border: 'none', cursor: isGenerating ? 'not-allowed' : 'pointer', marginTop: '20px', transition: 'all 0.3s' }}
            >
              {isGenerating ? 'Building Resume...' : 'Generate Resume'}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
