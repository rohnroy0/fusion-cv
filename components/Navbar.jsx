'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/');
  };

  return (
    <nav className={mobileMenuOpen ? 'mobile-nav-open' : ''}>
      <a href="/dashboard" className="nav-logo">
        <i className="ri-pages-line"></i> Fusion CV
      </a>
      
      <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
        <a href="#ats" onClick={() => setMobileMenuOpen(false)}>ATS Checker</a>
        <a href="#builder" onClick={() => setMobileMenuOpen(false)}>AI Builder</a>
        <a href="#templates" onClick={() => setMobileMenuOpen(false)}>Templates</a>
        <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact Us</a>
        
        {user ? (
          <div className="account-container">
            <button className="nav-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <i className="ri-user-smile-line"></i> My Account
            </button>
            <div className={`account-dropdown ${dropdownOpen ? 'open' : ''}`}>
              <div className="dropdown-header">
                <span style={{ fontWeight: 600, fontSize: '14px', color: '#fff' }}>User Account</span>
                <span className="user-email">{user.email}</span>
              </div>
              <div className="dropdown-item logout" onClick={handleLogout}>
                <i className="ri-logout-box-line"></i> Sign Out
              </div>
            </div>
          </div>
        ) : (
          <a href="/" className="nav-btn">Sign In</a>
        )}
      </div>

      <button className="mobile-toggle-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        <i className={mobileMenuOpen ? 'ri-close-line' : 'ri-menu-3-line'}></i>
      </button>
    </nav>
  );
}
