/* eslint-disable react-refresh/only-export-components */
import type { Metadata } from 'next';
import './globals.css';
import GraphAnimation from './components/GraphAnimation';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'GraphiQL App',
  description: 'GraphiQL App student project',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GraphAnimation/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
