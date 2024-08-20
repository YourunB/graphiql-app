import s from './not-found.module.css';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404',
  description: 'Not Found Page',
};

export default function PageNotFound() {
  return (
    <main className={s.page}>
      <div className={s['error-box']}>
        <h2 className={s['error-box__title']}>404</h2>
        <p className={s['error-box__description']}>This Page Not Found</p>
        <Link className={s['error-box__link']} href="/">
          HOME
        </Link>
      </div>
    </main>
  );
}
