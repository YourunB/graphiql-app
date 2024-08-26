import s from './page.module.css';
import checkAuth from '@/app/utils/checkAuth';

export default function GraphPage() {
  checkAuth();

  return (
    <main className={s.page}>
      Graph page...
    </main>
  );
}
