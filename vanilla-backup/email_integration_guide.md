# Supabase + SendGrid Integration Guide

This guide ensures that your **Fusion CV** platform sends premium, brand-consistent emails using the SendGrid SMTP service you integrated.

## 1. Supabase Dashboard Configuration
To finalize the connection, ensure these settings are saved in your [Supabase Projects Settings](https://app.supabase.com/project/_/settings/auth):

| Field | Value |
| :--- | :--- |
| **SMTP Enabled** | ON |
| **SMTP Host** | `smtp.sendgrid.net` |
| **SMTP Port** | `587` |
| **SMTP User** | `apikey` (exactly this string) |
| **SMTP Pass** | *Your SendGrid API Key* |
| **Sender Name** | `Fusion CV Support` |
| **Sender Email** | *Your Verified SendGrid Sender Email* |

---

## 2. Premium Email Template (HTML)
Copy and paste this code into the **Email Templates** (Confirmation & Magic Link) section of your Supabase dashboard for a high-end look that matches your site.

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Inter', Helvetica, Arial, sans-serif; background-color: #09090b; color: #f4f4f5; margin: 0; padding: 0; }
        .wrapper { max-width: 600px; margin: 40px auto; background: #18181b; border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 40px; text-align: center; }
        .content { padding: 40px; line-height: 1.6; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #71717a; border-top: 1px solid rgba(255,255,255,0.05); }
        .btn { display: inline-block; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white !important; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: 600; margin-top: 20px; box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.4); }
        h1 { margin: 0; font-size: 24px; font-weight: 700; color: white; }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="header">
            <h1>Fusion CV</h1>
        </div>
        <div class="content">
            <h2 style="color: white;">Verify Your Account</h2>
            <p>Welcome to Fusion CV! To start building your ATS-optimized resume, please confirm your email address by clicking the button below.</p>
            <center><a href="{{ .ConfirmationURL }}" class="btn">Confirm Email Address</a></center>
            <p style="margin-top: 30px; font-size: 13px; color: #a1a1aa;">If you didn't create an account, you can safely ignore this email.</p>
        </div>
        <div class="footer">
            &copy; 2026 Fusion CV. Empowering the next generation of professionals.
        </div>
    </div>
</body>
</html>
```

---

## 3. Implementation Status
- [x] **Forgot Password UI**: Added to `index.html`.
- [x] **Auth Logic**: Integrated `resetPasswordForEmail` in `script.js`.
- [x] **SMTP Ready**: Guided setup for SendGrid in Supabase.
