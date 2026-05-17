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

  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isOtpView, setIsOtpView] = useState(false);
  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [pendingProfile, setPendingProfile] = useState(null);

  useEffect(() => {
    let timer;
    if (isOtpView && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOtpView, countdown]);

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
        data: { full_name: signupName },
        emailRedirectTo: `${window.location.origin}/dashboard`,
      }
    });

    if (error) {
      addToast(error.message, 'error');
      setLoading(false);
    } else {
      setPendingProfile({ name: signupName, email: signupEmail });
      addToast('OTP sent to your email! Please enter it below.', 'success');
      setRegisteredEmail(signupEmail);
      setIsOtpView(true);
      setIsRightPanelActive(false);
      setCountdown(60);
      setCanResend(false);
      setSignupName('');
      setSignupEmail('');
      setSignupPassword('');
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.verifyOtp({
      email: registeredEmail,
      token: otp,
      type: 'signup'
    });

    if (error) {
      addToast(error.message, 'error');
      setLoading(false);
    } else {
      if (data?.user && pendingProfile) {
         await supabase.from('profiles').insert([{ 
           id: data.user.id, 
           full_name: pendingProfile.name, 
           email: pendingProfile.email 
         }]);
      }
      addToast('Account verified successfully!', 'success');
      router.push('/dashboard');
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: registeredEmail,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`
      }
    });

    if (error) {
      addToast(error.message, 'error');
    } else {
      addToast('New verification code sent to your email!', 'success');
      setCountdown(60);
      setCanResend(false);
    }
    setLoading(false);
  };



  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!resetEmail || !resetEmail.trim()) return;
    
    setLoading(true);
    const emailToReset = resetEmail.trim();

    // 1. Verify email actually exists in the database
    const { data: checkUser, error: checkErr } = await supabase
      .from('profiles')
      .select('email')
      .eq('email', emailToReset)
      .maybeSingle();

    if (!checkUser) {
      addToast('No account found with this email address. Please sign up first.', 'error');
      setLoading(false);
      return;
    }

    // 2. Send the reset link
    const { error } = await supabase.auth.resetPasswordForEmail(emailToReset, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    if (error) {
      addToast(error.message, 'error');
    } else {
      addToast('Password reset link sent to your email!', 'success');
      setIsForgotPassword(false);
      setResetEmail('');
    }
    setLoading(false);
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

          {isOtpView ? (
            <form onSubmit={handleVerifyOtp} className="fade-in">
              <div className="auth-header">
                <h2>Enter Verification Code</h2>
                <span className="subtitle">We sent a verification OTP to {registeredEmail}</span>
              </div>
              <div className="infield">
                <i className="ri-shield-keyhole-line"></i>
                <input 
                  type="text" 
                  placeholder="Enter OTP Code" 
                  required 
                  maxLength={10}
                  value={otp} 
                  onChange={e => setOtp(e.target.value.trim())} 
                />
              </div>
              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? <i className="ri-loader-4-line ri-spin"></i> : 'Verify & Continue'} <i className="ri-arrow-right-line"></i>
              </button>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', fontSize: '13px' }}>
                <span style={{ color: '#a1a1aa' }}>
                  {canResend ? (
                    <a href="#" onClick={(e) => { e.preventDefault(); handleResendOtp(); }} style={{ color: '#c084fc', fontWeight: 'bold' }}>Resend Code</a>
                  ) : (
                    `Resend code in ${countdown}s`
                  )}
                </span>
                <a href="#" onClick={(e) => { e.preventDefault(); setIsOtpView(false); setIsRightPanelActive(true); }} style={{ color: '#71717a' }}>Change Email</a>
              </div>
            </form>
          ) : isForgotPassword ? (
            <form onSubmit={handleResetPassword} className="fade-in">
              <div className="auth-header">
                <h2>Reset Password</h2>
                <span className="subtitle">Enter your email to receive a reset link</span>
              </div>
              <div className="infield">
                <i className="ri-mail-line"></i>
                <input type="email" placeholder="Email Address" required value={resetEmail} onChange={e => setResetEmail(e.target.value)} />
              </div>
              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? <i className="ri-loader-4-line ri-spin"></i> : 'Send Reset Link'} <i className="ri-arrow-right-line"></i>
              </button>
              <p className="auth-toggle" style={{ marginTop: '15px' }}>
                Remember your password? <a href="#" onClick={(e) => { e.preventDefault(); setIsForgotPassword(false); setIsRightPanelActive(false); }}>Sign In</a>
              </p>
            </form>
          ) : isRightPanelActive ? (
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
                Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsRightPanelActive(false); setIsForgotPassword(false); }}>Sign In</a>
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
                Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsRightPanelActive(true); setIsForgotPassword(false); }}>Sign Up</a>
              </p>
              <p className="auth-toggle" style={{ marginTop: '10px' }}>
                <a href="#" onClick={(e) => { e.preventDefault(); setIsForgotPassword(true); setIsRightPanelActive(false); }}>Forgot Password?</a>
              </p>
            </form>
          )}

          <FeatureGrid />
        </div>
      </div>
    </div>
  );
}
