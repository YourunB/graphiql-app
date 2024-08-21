'use client';
import styles from './Header.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image, { StaticImageData } from 'next/image';
import GraphQL from '../../../public/icons/logo-graphql.png';
import flagUS from '../../../public/icons/flag-us.png';
import flagRU from '../../../public/icons/flag-ru.png';

type Language = 'en' | 'ru';

const languageOptions: { code: Language; label: string; flag: StaticImageData }[] = [
  { code: 'en', label: 'English', flag: flagUS },
  { code: 'ru', label: 'Русский', flag: flagRU },
];

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [background, setBackground] = useState('transparent');

  const router = useRouter();

  // hardcoded
  const token = false;

  const handleResize = () => setIsMobile(window.innerWidth <= 768);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const toggleLanguageMenu = () => setLanguageMenuOpen(!languageMenuOpen);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setLanguageMenuOpen(false);
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setBackground('#ebd0f6');
    } else {
      setBackground('transparent');
    }
  };

  const handleLinkClick = (href: string) => {
    setDrawerOpen(false);
    router.push(href);
  };

  const onLogout = () => {
    // remove token, redirect to main page
    // router.push('/');
  };

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [drawerOpen]);

  const currentLanguage = languageOptions.find((option) => option.code === language);

  return (
    <header className={styles.header} style={{ background }}>
      <div className={styles.toolbar}>
        <div className={styles.logoSection}>
          <Link href="/" className={styles.homeLink}>
            <Image src={GraphQL} alt="GraphQL logo" className={styles.logo} width={20} height={20} />
            Home
          </Link>
        </div>

        {isMobile ? (
          <>
            <button className={styles.menuButton} onClick={toggleDrawer}>
              ☰
            </button>
            {drawerOpen && (
              <>
                <div className={styles.backdrop} onClick={toggleDrawer}></div>
                <div className={styles.drawer}>
                  {!token ? (
                    <>
                      <button onClick={() => handleLinkClick('/login')} className={styles.link}>
                        Sign in
                      </button>
                      <button onClick={() => handleLinkClick('/register')} className={styles.link}>
                        Register
                      </button>
                    </>
                  ) : (
                    <button onClick={onLogout} className={styles.logout}>
                      Log Out
                    </button>
                  )}
                  <div className={styles.languageSwitcher}>
                    {languageOptions.map((option) => (
                      <button
                        key={option.code}
                        onClick={() => handleLanguageChange(option.code)}
                        className={`${styles.languageOption} ${
                          option.code === language ? styles.selectedLanguage : ''
                        }`}
                      >
                        <Image
                          src={option.flag}
                          alt={option.label}
                          className={styles.flagIcon}
                          width={20}
                          height={20}
                        />
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <div className={styles.navSection}>
            {!token ? (
              <>
                <Link href="/login" className={styles.button}>
                  Sign in
                </Link>
                <Link href="/register" className={styles.button}>
                  Register
                </Link>
              </>
            ) : (
              <button onClick={onLogout} className={styles.logoutDesktop}>
                Log Out
              </button>
            )}
            <div className={styles.languageDropdown}>
              <button className={styles.languageButton} onClick={toggleLanguageMenu}>
                {currentLanguage && (
                  <Image
                    src={currentLanguage.flag}
                    alt={currentLanguage.label}
                    className={styles.flagIcon}
                    width={20}
                    height={20}
                  />
                )}
                {currentLanguage?.label}
              </button>
              {languageMenuOpen && (
                <div className={styles.languageMenu}>
                  {languageOptions.map((option) => (
                    <button
                      key={option.code}
                      onClick={() => handleLanguageChange(option.code)}
                      className={styles.languageOption}
                    >
                      <Image src={option.flag} alt={option.label} className={styles.flagIcon} width={20} height={20} />
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
