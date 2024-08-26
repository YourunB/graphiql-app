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
      Rest page...
      <RestForm />
    </main>
  );
}
