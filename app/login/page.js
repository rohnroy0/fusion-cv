'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Toast from '@/components/Toast';

export default function LoginPage() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);
  const router = useRouter();

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) router.replace('/dashboard');
    };
    checkUser();
  }, [router]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });

    if (error) {
      addToast(error.message, 'error');
      setLoading(false);
    } else {
      addToast('Welcome back!', 'success');
      router.push('/dashboard');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: signupEmail,
      password: signupPassword,
      options: {
        data: { full_name: signupName }
      }
    });

    if (error) {
      addToast(error.message, 'error');
      setLoading(false);
    } else {
      // Profile creation handled via Supabase trigger in real apps, 
      // but let's mirror vanilla logic for consistency
      if (data.user) {
         await supabase.from('profiles').insert([{ id: data.user.id, full_name: signupName, email: signupEmail }]);
      }
      addToast('Registration successful! Check your email.', 'success');
      setLoading(false);
    }
  };



  const features = [
    { icon: 'ri-checkbox-circle-fill', text: 'AI Resume Builder' },
    { icon: 'ri-checkbox-circle-fill', text: 'ATS Score Check' },
    { icon: 'ri-checkbox-circle-fill', text: 'Instant PDF Download' },
    { icon: 'ri-checkbox-circle-fill', text: 'Refine Your Resume' }
  ];

  const FeatureGrid = () => (
    <div className="features-list">
      <div className="features-grid">
        {features.map((f, i) => (
          <div key={i} className="feature-item">
            <i className={f.icon}></i> {f.text}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="login-wrapper">
      <div className="toast-container">
        {toasts.map(t => (
          <Toast key={t.id} {...t} onClose={() => removeToast(t.id)} />
        ))}
      </div>

      <div className="auth-card">
        <div className="form-content">
          <div className="auth-logo">
            <i className="ri-dashboard-fill"></i> Fusion CV
          </div>

          {isRightPanelActive ? (
            <form onSubmit={handleSignup} className="fade-in">
              <div className="auth-header">
                <h2>Create Account</h2>
                <span className="subtitle">Join to build outstanding resumes</span>
              </div>
              <div className="infield">
                <i className="ri-user-line"></i>
                <input type="text" placeholder="Full Name" required value={signupName} onChange={e => setSignupName(e.target.value)} />
              </div>
              <div className="infield">
                <i className="ri-mail-line"></i>
                <input type="email" placeholder="Email Address" required value={signupEmail} onChange={e => setSignupEmail(e.target.value)} />
              </div>
              <div className="infield">
                <i className="ri-lock-line"></i>
                <input type="password" placeholder="Password" required value={signupPassword} onChange={e => setSignupPassword(e.target.value)} />
              </div>
              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? <i className="ri-loader-4-line ri-spin"></i> : 'Sign Up'} <i className="ri-arrow-right-line"></i>
              </button>
              <p className="auth-toggle">
                Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsRightPanelActive(false); }}>Sign In</a>
              </p>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="fade-in">
              <div className="auth-header">
                <h2>Welcome Back</h2>
                <span className="subtitle">Sign in to continue your journey</span>
              </div>
              <div className="infield">
                <i className="ri-mail-line"></i>
                <input type="email" placeholder="Email Address" required value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
              </div>
              <div className="infield">
                <i className="ri-lock-line"></i>
                <input type="password" placeholder="Password" required value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
              </div>
              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? <i className="ri-loader-4-line ri-spin"></i> : 'Sign In'} <i className="ri-arrow-right-line"></i>
              </button>
              <p className="auth-toggle">
                Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsRightPanelActive(true); }}>Sign Up</a>
              </p>
            </form>
          )}

          <FeatureGrid />
        </div>
      </div>
    </div>
  );
}
