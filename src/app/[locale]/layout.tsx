import '../globals.css';
import GraphAnimation from '../components/GraphAnimation';
import Footer from '../components/Footer';
import Header from '../components/Header';
import I18nInitializer from '../modules/i18nInitializer';

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body>
        <I18nInitializer />
        <Header />
        <GraphAnimation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
