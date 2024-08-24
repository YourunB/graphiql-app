'use client';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';
import Image from 'next/image';
import RSLogo from '../../../public/icons/rs-logo.png';

type Author = {
  name: string;
  github: string;
};

const Footer = () => {
  const { t } = useTranslation();

  const authors: Author[] = [
    {
      name: t('authorNames.yury'),
      github: 'https://github.com/YourunB',
    },
    {
      name: t('authorNames.lizaveta'),
      github: 'https://github.com/Lilo002',
    },
    {
      name: t('authorNames.valeryia'),
      github: 'https://github.com/valeryaosta',
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.authorsSection}>
        <p className={styles.authorsTitle}>{t('authors')}:</p>
        <div className={styles.authorsList}>
          {authors.map((author) => (
            <p key={author.name} className={styles.authorItem}>
              <a href={author.github} target="_blank" rel="noreferrer" className={styles.authorLink}>
                {author.name}
              </a>
            </p>
          ))}
        </div>
      </div>
      <div className={styles.copyLogo}>
        <div className={styles.copySection}>
          <p>&copy; {new Date().getFullYear()}</p>
        </div>
        <div className={styles.logoSection}>
          <a href="https://rs.school/courses/reactjs" title="RS School React Course">
            <Image src={RSLogo} alt={'RS Logo'} height={45} className={styles.rsLogo} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
