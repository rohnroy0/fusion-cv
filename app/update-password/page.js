'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Toast from '@/components/Toast';

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is here with a valid recovery session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        addToast('Invalid or expired recovery link. Please try again.', 'error');
        setTimeout(() => router.push('/login'), 3000);
      } else {
        setUserEmail(session.user.email || '');
      }
    };
    checkSession();
  }, [router]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      addToast('Passwords do not match. Please re-enter.', 'error');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    
    if (error) {
      addToast(error.message, 'error');
      setLoading(false);
    } else {
      addToast('Password updated successfully! Redirecting to login...', 'success');
      await supabase.auth.signOut();
      setTimeout(() => router.push('/login'), 2000);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="toast-container">
        {toasts.map(t => (
          <Toast key={t.id} {...t} onClose={() => removeToast(t.id)} />
        ))}
      </div>

      <div className="auth-card">
        <div className="form-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="auth-logo" style={{ marginBottom: '30px' }}>
            <i className="ri-dashboard-fill"></i> Fusion CV
          </div>

          <form onSubmit={handleUpdatePassword} className="fade-in" style={{ width: '100%' }}>
            <div className="auth-header" style={{ marginBottom: '30px', textAlign: 'center' }}>
              <h2>Update Password</h2>
              <span className="subtitle">Enter your new secure password for {userEmail}</span>
            </div>
            
            {/* Hidden email input to inform browser password manager of the correct account */}
            <input type="email" name="email" autoComplete="username" value={userEmail} readOnly style={{ display: 'none' }} />

            <div className="infield" style={{ marginBottom: '15px' }}>
              <i className="ri-lock-line"></i>
              <input 
                type="password" 
                name="new-password"
                autoComplete="new-password"
                placeholder="New Password" 
                required 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                minLength={6}
              />
            </div>

            <div className="infield" style={{ marginBottom: '20px' }}>
              <i className="ri-lock-check-line"></i>
              <input 
                type="password" 
                name="confirm-password"
                autoComplete="new-password"
                placeholder="Confirm New Password" 
                required 
                value={confirmPassword} 
                onChange={e => setConfirmPassword(e.target.value)} 
                minLength={6}
              />
            </div>
            
            <button type="submit" className="auth-btn" disabled={loading} style={{ width: '100%', marginTop: '10px' }}>
              {loading ? <i className="ri-loader-4-line ri-spin"></i> : 'Update Password'} <i className="ri-check-line"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
