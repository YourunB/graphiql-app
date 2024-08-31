import s from './page.module.css';
import RestForm from '@/app/components/RestForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Restfull',
  description: 'Restfull page',
};

export default function RestPage() {
  return (
    <main className={s.page}>
      <h2 className={s['page__title']}>Restfull</h2>
      <RestForm />
    </main>
  );
}
