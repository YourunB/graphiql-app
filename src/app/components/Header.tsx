'use client';
import styles from './Header.module.css';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image, { StaticImageData } from 'next/image';
import GraphQL from '../../../public/icons/logo-graphql.png';
import flagUS from '../../../public/icons/flag-us.png';
import flagRU from '../../../public/icons/flag-ru.png';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';
import { signOut } from 'firebase/auth';

type Language = 'en' | 'ru';

const languageOptions: { code: Language; label: string; flag: StaticImageData }[] = [
  { code: 'en', label: 'English', flag: flagUS },
  { code: 'ru', label: 'Русский', flag: flagRU },
];

const Header = () => {
  const { t } = useTranslation();

  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [background, setBackground] = useState('transparent');

  const router = useRouter();

  const currentLanguage = i18n.language as Language;

  // as token
  const [user] = useAuthState(auth);

  const handleLanguageChange = useCallback(
    (lang: Language) => {
      if (lang !== currentLanguage) {
        i18n.changeLanguage(lang);
        localStorage.setItem('appLanguage', lang);

        const currentPath = window.location.pathname.replace(/^\/(en|ru)/, '');
        router.push(`/${lang}${currentPath}`);
      }
      setLanguageMenuOpen(false);
    },
    [router, currentLanguage]
  );

  const handleResize = () => setIsMobile(window.innerWidth <= 768);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const toggleLanguageMenu = () => setLanguageMenuOpen(!languageMenuOpen);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setBackground('#ebd0f6');
    } else {
      setBackground('transparent');
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('appLanguage') as Language;
    if (savedLanguage && savedLanguage !== currentLanguage) {
      handleLanguageChange(savedLanguage);
    }
  }, [handleLanguageChange, currentLanguage]);

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

  const handleLinkClick = (href: string) => {
    setDrawerOpen(false);
    router.push(href);
  };

  const onLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Logout failed: ', error);
    }
  };

  const currentLangOption = languageOptions.find((option) => option.code === currentLanguage);

  return (
    <header className={styles.header} style={{ background }}>
      <div className={styles.toolbar}>
        <div className={styles.logoSection}>
          <Link href="/" className={styles.homeLink}>
            <Image src={GraphQL} alt="GraphQL logo" className={styles.logo} width={20} height={20} />
            {t('home')}
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
                  {!user ? (
                    <>
                      <button onClick={() => handleLinkClick('/login')} className={styles.link}>
                        {t('login')}
                      </button>
                      <button onClick={() => handleLinkClick('/register')} className={styles.link}>
                        {t('register')}
                      </button>
                    </>
                  ) : (
                    <>
                      <span className={styles.userName}>{user.email || user.displayName || 'User'}</span>
                      <button onClick={onLogout} className={styles.logout}>
                        {t('logout')}
                      </button>
                    </>
                  )}
                  <div className={styles.languageSwitcher}>
                    {languageOptions.map((option) => (
                      <button
                        key={option.code}
                        onClick={() => handleLanguageChange(option.code)}
                        className={`${styles.languageOption} ${
                          option.code === currentLanguage ? styles.selectedLanguage : ''
                        }`}
                        disabled={option.code === currentLanguage}
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
            {!user ? (
              <>
                <Link href="/login" className={styles.button}>
                  {t('login')}
                </Link>
                <Link href="/register" className={styles.button}>
                  {t('register')}
                </Link>
              </>
            ) : (
              <>
                <span className={styles.userNameDesktop}>{user.email || user.displayName || 'User'}</span>
                <button onClick={onLogout} className={styles.logoutDesktop}>
                  {t('logout')}
                </button>
              </>
            )}
            <div className={styles.languageDropdown}>
              <button className={styles.languageButton} onClick={toggleLanguageMenu}>
                {currentLangOption && (
                  <Image
                    src={currentLangOption.flag}
                    alt={currentLangOption.label}
                    className={styles.flagIcon}
                    width={20}
                    height={20}
                  />
                )}
                {currentLangOption?.label}
              </button>
              {languageMenuOpen && (
                <div className={styles.languageMenu}>
                  {languageOptions.map((option) => (
                    <button
                      key={option.code}
                      onClick={() => handleLanguageChange(option.code)}
                      className={`${styles.languageOption} ${option.code === currentLanguage ? styles.selectedLanguage : ''}`}
                      disabled={option.code === currentLanguage}
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
