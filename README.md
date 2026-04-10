# 🚀 Fusion CV — AI-Powered Career Platform

Fusion CV is a premium, AI-powered resume building and optimization platform designed to give job seekers a competitive edge. It combines a modern, high-end aesthetic with powerful tools to create, validate, and style professional resumes.

## ✨ Core Features

- **Interactive Dashboard**: A high-performance, single-fold mobile-first dashboard with real-time interactive workflows.
- **ATS Resume Checker**: Instant validation of existing resumes with a dynamic score meter and actionable feedback.
- **AI Resume Builder**: Intelligent content generation that transforms raw inputs into keyword-rich, professional summaries.
- **Template Carousel**: A revolving catalog of 15+ high-end, ATS-optimized templates with a smooth, looping infinite-scroll experience.
- **Premium Design System**: 
  - **Glassmorphic UI**: Sophisticated layout with real-time blur and fluid gradients.
  - **Dynamic Aesthetics**: Animated background blobs, sparkle effects, and smooth scroll snapping.
  - **Ultra-Responsive**: Optimized mobile layouts with "first-fold" visibility and custom touch interactions.
- **Advanced Admin Portal**: 
  - Secure role-based management at `admin.html`.
  - Real-time user tracking and database administration.

## 🛠️ Technology Stack

- **Frontend**: HTML5, Vanilla CSS3 (Custom Design System), JavaScript (ES6+).
- **Icons**: [Remix Icon](https://remixicon.com/).
- **Database & Auth**: [Supabase](https://supabase.com/) with Row Level Security (RLS).
- **Typography**: Google Fonts (Inter & Outfit).
- **Architecture**: Mobile-first, performance-optimized, and SEO-enhanced.

## 🚀 Getting Started

1. **Supabase Integration**:
   Update `supabase-config.js` with your specific `SUPABASE_URL` and `SUPABASE_ANON_KEY`.

2. **Schema Configuration**:
   The platform expects a `profiles` table in Supabase:
   - `id`: UUID (Primary Key)
   - `full_name`: Text
   - `email`: Text
   - `phone`: Text
   - `created_at`: Timestamp

3. **Portal Access**:
   Admin features are accessible via `admin-login.html` and restricted to authorized administrative emails.

## 📱 Visual & Mobile Excellence

Fusion CV utilizes **CSS Scroll Snapping** and **Liquid Layouts** to ensure a premium experience on every device. The platform is designed to look "stunning at first glance," with micro-animations and zero content overlaps.

---
*Empowering the next generation of professionals with AI-driven precision.*
