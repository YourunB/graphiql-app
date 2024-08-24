'use client';
import Image from 'next/image';
import s from './page.module.css';
import { useTranslation } from 'react-i18next';
import { Author } from '@/app/type';
import RSImage from '../../../public/images/rs-character.webp';

export default function PageHome() {
  const { t } = useTranslation();

  const authors: Author[] = [
    {
      name: t('authors.liza.name'),
      github: 'https://github.com/Lilo002',
      description: t('authors.liza.description'),
      image: '/images/liza.png',
      location: t('authors.liza.location'),
    },
    {
      name: t('authors.yury.name'),
      github: 'https://github.com/YourunB',
      description: t('authors.yury.description'),
      image: '/images/yury.jpg',
      location: t('authors.yury.location'),
    },
    {
      name: t('authors.valery.name'),
      github: 'https://github.com/valeryaosta',
      description: t('authors.valery.description'),
      image: '/images/valery.jpg',
      location: t('authors.valery.location'),
    },
  ];

  return (
    <main className={s.page}>
      <section className={s.authorsSection}>
        <h2 className={s.sectionTitle}>{t('mainPage.title')}</h2>
        <div className={s.authorsGrid}>
          {authors.map((author) => (
            <div className={s.card} key={author.name}>
              <Image src={author.image} alt={author.name} className={s.cardImage} width={300} height={300} />
              <h3 className={s.cardName}>
                {author.name}
                <span>&mdash; {author.location}</span>
              </h3>
              <p className={s.cardDescription}>{author.description}</p>
              <a href={author.github} className={s.cardLink} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
          ))}
        </div>
      </section>
      <section className={s.aboutSection}>
        <h2 className={s.sectionTitle}>{t('mainPage.about.title')}</h2>
        <p className={s.aboutDescription}>{t('mainPage.about.description')}</p>
      </section>
      <section className={s.rsSection}>
        <div>
          <h2 className={s.sectionTitle}>{t('mainPage.rss.title')}</h2>
          <p className={s.rsDescription}>{t('mainPage.rss.description')}</p>
        </div>
        <Image src={RSImage} alt="RS School character" className={s.rsImage} />
      </section>
    </main>
  );
}
