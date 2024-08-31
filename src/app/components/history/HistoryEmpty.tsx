import { t } from 'i18next';
import Link from 'next/link';
import s from './HistoryEmpty.module.css';

export default function HistoryEmpty() {
  return (
    <>
      <h2>{t('history.empty')}</h2>
      <div className={s.buttons}>
        <Link href="/graph" className={s.homeLink}>
          {t('Graph')}
        </Link>
        <Link href="/rest" className={s.homeLink}>
          {t('Rest')}
        </Link>
      </div>
    </>
  );
}
