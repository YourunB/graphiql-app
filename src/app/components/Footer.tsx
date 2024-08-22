'use client';
import styles from './Footer.module.css';
import Image from 'next/image';
import RSLogo from '../../../public/icons/rs-logo.png';

type Author = {
  name: string;
  github: string;
};

const authors: Author[] = [
  {
    name: 'Yury Butskevich',
    github: 'https://github.com/YourunB',
  },
  {
    name: 'Lizaveta Basarab',
    github: 'https://github.com/Lilo002',
  },
  {
    name: 'Valeryia Herasimenka',
    github: 'https://github.com/valeryaosta',
  },
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.authorsSection}>
        <p className={styles.authorsTitle}>Authors:</p>
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
