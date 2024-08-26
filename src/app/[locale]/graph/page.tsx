import s from './page.module.css';
import checkAuth from '@/app/utils/checkAuth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GraphiQL',
  description: 'GraphiQl page',
};

export default function GraphPage() {
  checkAuth();

  return (
    <main className={s.page}>
      Graph page...
    </main>
  );
}
