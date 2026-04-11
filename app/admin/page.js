'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Toast from '@/components/Toast';

const ADMIN_EMAIL = 'admin@fusioncv.com';

export default function AdminPortal() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const isPersistent = sessionStorage.getItem('fusion_admin_session') === 'true';
      
      if (session && session.user.email === ADMIN_EMAIL && isPersistent) {
        setIsAdmin(true);
        fetchUsers();
      }
    };
    checkSession();
  }, []);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || data.user.email !== ADMIN_EMAIL) {
      if (!error) await supabase.auth.signOut();
      addToast('Invalid Admin Credentials', 'error');
      setAuthLoading(false);
    } else {
      sessionStorage.setItem('fusion_admin_session', 'true');
      setIsAdmin(true);
      addToast('Access Granted', 'success');
      fetchUsers();
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
    if (error) {
      addToast(error.message, 'error');
    } else {
      setUsers(data);
    }
    setLoading(false);
  };

  const logout = async () => {
    sessionStorage.removeItem('fusion_admin_session');
    await supabase.auth.signOut();
    setIsAdmin(false);
    window.location.reload();
  };

  if (!isAdmin) {
    return (
      <div className="login-wrapper">
        <div className="toast-container">
          {toasts.map(t => <Toast key={t.id} {...t} onClose={() => removeToast(t.id)} />)}
        </div>
        <div className="auth-card">
          <div className="form-content">
            <div className="auth-logo">
              <i className="ri-shield-keyhole-fill"></i> Admin Access
            </div>
            <div className="auth-header">
              <h2>Secure Log In</h2>
              <span className="subtitle">Enter your administrative credentials to access the portal</span>
            </div>
            <form onSubmit={handleLogin} style={{ width: '100%' }}>
              <div className="infield">
                <i className="ri-mail-fill"></i>
                <input type="email" placeholder="Admin Email" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="infield">
                <i className="ri-lock-fill"></i>
                <input type="password" placeholder="Admin Password" required value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <button type="submit" className="auth-btn" disabled={authLoading}>
                {authLoading ? <i className="ri-loader-4-line ri-spin"></i> : 'Access Portal'} <i className="ri-arrow-right-line"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
      <div className="toast-container">
        {toasts.map(t => <Toast key={t.id} {...t} onClose={() => removeToast(t.id)} />)}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px' }}>
        <div>
          <span className="feature-tag ats" style={{ marginBottom: '8px', display: 'block' }}>ADMINISTRATION</span>
          <h1 className="gradient-text" style={{ fontSize: '42px', fontWeight: 800, letterSpacing: '-1.5px' }}>Admin Portal</h1>
          <p style={{ color: '#71717a', fontSize: '15px', marginTop: '5px' }}>Manage user profiles and system access levels.</p>
        </div>
        <button className="logout-btn" onClick={logout}>
          <i className="ri-logout-box-r-line"></i> Sign Out
        </button>
      </div>

      <div className="admin-card">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#71717a' }}>
            <i className="ri-loader-4-line ri-spin" style={{ fontSize: '40px', display: 'block', marginBottom: '15px', color: '#7c5cff' }}></i>
            <span style={{ fontWeight: 500 }}>Synchronizing data...</span>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>User Identification</th>
                  <th style={{ textAlign: 'left' }}>Contact Address</th>
                  <th style={{ textAlign: 'left' }}>Registration Date</th>
                  <th style={{ textAlign: 'left' }}>Current Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                         <div style={{ width: '36px', height: '36px', background: 'rgba(124, 92, 255, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c5cff' }}>
                           <i className="ri-user-3-fill"></i>
                         </div>
                         <strong style={{ color: '#fff' }}>{user.full_name || 'Anonymous'}</strong>
                      </div>
                    </td>
                    <td style={{ color: '#a1a1aa' }}>{user.email}</td>
                    <td style={{ color: '#a1a1aa' }}>{new Date(user.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                    <td>
                       <span className="status-badge active">
                         Active
                       </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
