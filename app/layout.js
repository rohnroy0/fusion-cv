import './globals.css';
import BackgroundBlobs from '@/components/BackgroundBlobs';
import Loader from '@/components/Loader';

export const metadata = {
  title: 'Fusion CV - AI-Powered Career Platform',
  description: 'Elevate your career with AI-enhanced resumes and ATS optimization.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Loader />
        <BackgroundBlobs />
        {children}
      </body>
    </html>
  );
}
