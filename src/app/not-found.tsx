import s from './not-found.module.css';
import Link from 'next/link';

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
