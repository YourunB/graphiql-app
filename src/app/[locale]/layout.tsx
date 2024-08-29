'use client';
import '../globals.css';
import GraphAnimation from '../components/GraphAnimation';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useEffect } from 'react';
import i18n from '@/i18n';
import { ErrorProvider } from '../components/error/ErrorProvider';
import Error from '../components/error/Error';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    i18n.init();
  }, []);

  return (
    <html lang="en">
      <body>
        <ErrorProvider>
          <Error />
          <Header />
          <GraphAnimation />
          {children}
          <Footer />
        </ErrorProvider>
      </body>
    </html>
  );
}
