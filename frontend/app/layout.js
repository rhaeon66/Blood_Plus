import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './globals.css';

export const metadata = {
  title: 'BloodPlus - Modern Blood Donation Platform',
  description: 'Save lives through blood donation. BloodPlus is a modern platform connecting donors with those in need.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-bg-primary">
        <Navbar />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
