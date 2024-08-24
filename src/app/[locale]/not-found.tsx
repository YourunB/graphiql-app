'use client';
import s from './not-found.module.css';
import Link from 'next/link';
// import { Metadata } from 'next';
import { useTranslation } from 'react-i18next';

// export const metadata: Metadata = {
//   title: '404',
//   description: 'Not Found Page',
// };

export default function PageNotFound() {
  const { t } = useTranslation();
  return (
    <main className={s.page}>
      <div className={s['error-box']}>
        <h2 className={s['error-box__title']}>404</h2>
        <p className={s['error-box__description']}>{t('notFoundPage')}</p>
        <Link className={s['error-box__link']} href="/">
          {t('home')}
        </Link>
      </div>
    </main>
  );
}
