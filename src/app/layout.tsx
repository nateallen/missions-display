import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import PDFViewer from '@/components/pdf/PDFViewer';
import EmailForm from '@/components/forms/EmailForm';
import SubscribeForm from '@/components/forms/SubscribeForm';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Missions Display - Interactive Missionary Information',
  description:
    'Interactive touch screen display for church missions information, featuring world map navigation, missionary profiles, and newsletters.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}

        {/* Global Modals */}
        <PDFViewer />
        <EmailForm />
        <SubscribeForm />
      </body>
    </html>
  );
}
